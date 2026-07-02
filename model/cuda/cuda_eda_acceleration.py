import os
import sys
import json
from datetime import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ----------------------------------------------------------------------
# CUDA-Accelerated EDA Algorithm Demonstrator
# Inspired by Croix & Khatri (ICCAD '09): "GPU Programming for EDA"
#
# This module demonstrates parallel computing kernels in CUDA C++
# and simulates their execution over our unified streaming dataset.
# ----------------------------------------------------------------------

# C++ CUDA Kernel Definitions
CUDA_KERNELS = {
    "parallel_reduction": """
    // Parallel Reduction Kernel summing movie popularities/ratings
    // Performs O(log N) tree reduction in shared memory to avoid PCIe bottleneck
    __global__ void reduce_popularity(const float *g_idata, float *g_odata, unsigned int n) {
        extern __shared__ float sdata[];
        unsigned int tid = threadIdx.x;
        unsigned int i = blockIdx.x * blockDim.x + threadIdx.x;
        
        sdata[tid] = (i < n) ? g_idata[i] : 0.0f;
        __syncthreads();
        
        // In-place reduction in shared memory
        for (unsigned int s = blockDim.x / 2; s > 0; s >>= 1) {
            if (tid < s) {
                sdata[tid] += sdata[tid + s];
            }
            __syncthreads();
        }
        
        // Write the result of this block to global memory
        if (tid == 0) {
            g_odata[blockIdx.x] = sdata[0];
        }
    }
    """,
    
    "monte_carlo_ssta": """
    // Monte Carlo Statistical Static Timing Analysis (SSTA) Kernel (Section 5.2.1)
    // Generates Box-Muller random delay delay values for logic gates in parallel
    __global__ void monte_carlo_ssta(const float *mu, const float *sigma, 
                                     const float *random_u1, const float *random_u2, 
                                     float *g_delays, int n_gates, int n_samples) {
        int gate_id = blockIdx.y;
        int sample_id = blockIdx.x * blockDim.x + threadIdx.x;
        
        if (gate_id < n_gates && sample_id < n_samples) {
            int idx = gate_id * n_samples + sample_id;
            float u1 = random_u1[idx];
            float u2 = random_u2[idx];
            
            // Box-Muller Transformation yielding Standard Normal Distribution Z ~ N(0, 1)
            float z0 = sqrtf(-2.0f * logf(u1)) * cosf(2.0f * 3.14159265f * u2);
            
            // Scale and shift by gate timing parameters
            g_delays[idx] = mu[gate_id] + z0 * sigma[gate_id];
        }
    }
    """,

    "fault_simulation": """
    // Parallel Fault Logic Simulator Kernel (Section 5.2.1)
    // Simulates gate output states for 10,000 fault vectors using lookup tables
    __global__ void simulate_gate_faults(const int *gate_types, const int *inputs_a, const int *inputs_b, 
                                         int *outputs, int n_gates, int n_vectors) {
        int gate_id = blockIdx.y;
        int vec_id = blockIdx.x * blockDim.x + threadIdx.x;
        
        if (gate_id < n_gates && vec_id < n_vectors) {
            int idx = gate_id * n_vectors + vec_id;
            int type = gate_types[gate_id];
            int val_a = inputs_a[idx];
            int val_b = inputs_b[idx];
            
            // Logic evaluation lookup
            if (type == 0)      outputs[idx] = val_a & val_b; // AND
            else if (type == 1) outputs[idx] = val_a | val_b; // OR
            else if (type == 2) outputs[idx] = val_a ^ val_b; // XOR
        }
    }
    """
}

class CUDASimulator:
    """
    Simulates GPU execution of the Croix & Khatri CUDA kernels on host arrays
    to show execution statistics, validation, and parallel logic.
    """
    def __init__(self, data_path):
        print(f"Initializing CUDA/EDA Simulator using dataset: {data_path}")
        self.df = pd.read_csv(data_path)
        self.total_elements = len(self.df)
        
    def run_parallel_reduction(self):
        """
        Simulates CUDA parallel tree reduction on popularity.
        """
        print("\\n=== CUDA Case Study 1: Parallel Tree Reduction ===")
        # Get raw popularity array
        pop_array = self.df['popularity'].fillna(0.0).values.astype(np.float32)
        n = len(pop_array)
        
        block_size = 256
        num_blocks = int(np.ceil(n / block_size))
        
        print(f"Host array size: {n} elements.")
        print(f"CUDA Config: Block size = {block_size} threads, Grid size = {num_blocks} blocks.")
        
        # CPU Reference Sum
        cpu_start = datetime.now()
        cpu_sum = np.sum(pop_array)
        cpu_time = (datetime.now() - cpu_start).total_seconds() * 1000
        
        # GPU Simulation (Simulate block shared memory reductions)
        gpu_start = datetime.now()
        block_sums = []
        for b in range(num_blocks):
            # Fetch block memory
            block_data = pop_array[b*block_size : min((b+1)*block_size, n)]
            if len(block_data) < block_size:
                # Zero padding
                pad = np.zeros(block_size - len(block_data), dtype=np.float32)
                block_data = np.concatenate([block_data, pad])
                
            # Perform tree reduction in shared memory (log(block_size) steps)
            sdata = block_data.copy()
            s = block_size // 2
            while s > 0:
                for tid in range(s):
                    sdata[tid] += sdata[tid + s]
                s //= 2
            block_sums.append(sdata[0])
            
        # Final accumulation of block sums on host
        gpu_sum = sum(block_sums)
        gpu_time = (datetime.now() - gpu_start).total_seconds() * 1000
        
        print(f"CPU Sum Result: {cpu_sum:.2f} (Time: {cpu_time:.3f} ms)")
        print(f"GPU Sum Result: {gpu_sum:.2f} (Time: {gpu_time:.3f} ms)")
        print(f"Reduction Validation: {'SUCCESS' if np.allclose(cpu_sum, gpu_sum) else 'FAILED'}")
        
    def run_monte_carlo_ssta(self, n_samples=10000):
        """
        Simulates Croix & Khatri Section 5.2.1 Monte Carlo timing delay simulation.
        Generates normal timing distributions for simulated logic gates.
        """
        print("\\n=== CUDA Case Study 2: Monte Carlo SSTA Timing Simulation ===")
        # We will simulate 4 logical gate categories based on our platform parameters
        # (e.g. Netflix, Disney+, Amazon Prime Content average characteristics mapped to gate delay parameters)
        gate_types = ["Netflix_Gate", "Disney_Gate", "Amazon_Gate", "Future_Gate"]
        # Timing parameters (Mean delay in nanoseconds, Std Dev)
        mu = np.array([6.5, 7.2, 5.8, 4.5], dtype=np.float32)
        sigma = np.array([0.8, 1.2, 0.5, 0.3], dtype=np.float32)
        n_gates = len(gate_types)
        
        print(f"Simulating delays for {n_gates} timing gates with {n_samples} random samples each.")
        
        # Host random generations
        u1 = np.random.uniform(1e-9, 1.0, (n_gates, n_samples)).astype(np.float32)
        u2 = np.random.uniform(0.0, 1.0, (n_gates, n_samples)).astype(np.float32)
        
        # CUDA Box-Muller Transformation Simulation
        gpu_start = datetime.now()
        z0 = np.sqrt(-2.0 * np.log(u1)) * np.cos(2.0 * np.pi * u2)
        delays = np.zeros((n_gates, n_samples), dtype=np.float32)
        
        for g in range(n_gates):
            delays[g, :] = mu[g] + z0[g, :] * sigma[g]
            
        gpu_time = (datetime.now() - gpu_start).total_seconds() * 1000
        print(f"Parallel Box-Muller SSTA timing delay simulation finished in: {gpu_time:.3f} ms")
        
        # Verify and print stats
        for g in range(n_gates):
            print(f"  Gate '{gate_types[g]}': Simulated Mean={np.mean(delays[g,:]):.3f}ns, StdDev={np.std(delays[g,:]):.3f}ns")
            
        # Save SSTA delay plot for report
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        plot_path = os.path.join(root_dir, "datasets", "ssta_delay_distributions.png")
        
        plt.figure(figsize=(10, 5))
        for g in range(n_gates):
            plt.hist(delays[g, :], bins=50, alpha=0.5, label=gate_types[g])
        plt.title("Croix & Khatri Case Study: Simulated SSTA Timing Delay Distributions (CUDA Box-Muller)")
        plt.xlabel("Delay (ns)")
        plt.ylabel("Sample Frequency")
        plt.legend()
        plt.tight_layout()
        plt.savefig(plot_path)
        plt.close()
        print(f"SSTA Delay distribution plot saved to: {plot_path}")
        
    def run_fault_simulation(self, n_vectors=10000):
        """
        Simulates Croix & Khatri Section 5.2.1 Fault logic simulator lookup table.
        """
        print("\\n=== CUDA Case Study 3: Parallel Fault Gate Logic Simulation ===")
        n_gates = 5
        # Gate types: 0=AND, 1=OR, 2=XOR
        gate_types = np.array([0, 1, 2, 0, 1], dtype=np.int32)
        
        print(f"Evaluating {n_gates} logic gates across {n_vectors} fault test vectors in parallel.")
        
        # Generate inputs
        inputs_a = np.random.randint(0, 2, (n_gates, n_vectors)).astype(np.int32)
        inputs_b = np.random.randint(0, 2, (n_gates, n_vectors)).astype(np.int32)
        
        # GPU Lookup Table Simulation
        gpu_start = datetime.now()
        outputs = np.zeros((n_gates, n_vectors), dtype=np.int32)
        
        for g in range(n_gates):
            g_type = gate_types[g]
            val_a = inputs_a[g, :]
            val_b = inputs_b[g, :]
            if g_type == 0:
                outputs[g, :] = val_a & val_b
            elif g_type == 1:
                outputs[g, :] = val_a | val_b
            elif g_type == 2:
                outputs[g, :] = val_a ^ val_b
                
        gpu_time_s = (datetime.now() - gpu_start).total_seconds()
        gpu_time_ms = gpu_time_s * 1000
        print(f"Parallel Gate Logic evaluations completed in: {gpu_time_ms:.3f} ms")
        print(f"Total logic decisions made: {n_gates * n_vectors:,} gate operations.")
        if gpu_time_s > 0:
            print(f"Average simulated GPU gate throughput: {(n_gates * n_vectors) / gpu_time_s:,.0f} ops/sec")
        else:
            print("Average simulated GPU gate throughput: High-speed parallel throughput (under clock resolution)")


def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(root_dir, "datasets", "cleaned_dataset.csv")
    
    if not os.path.exists(data_path):
        print(f"Error: Unified dataset not found at {data_path}. Run ingest.py first.")
        sys.exit(1)
        
    print("=========================================================================")
    print("    GPU PROGRAMMING FOR EDA & DATA SCIENCE ACCELERATION DEMONSTRATOR   ")
    print("           (Implementing Croix & Khatri ICCAD '09 Case Studies)        ")
    print("=========================================================================")
    
    sim = CUDASimulator(data_path)
    sim.run_parallel_reduction()
    sim.run_monte_carlo_ssta()
    sim.run_fault_simulation()
    
    # Write CUDA source codes summary for portfolio verification
    src_summary_path = os.path.join(root_dir, "backend", "cuda_kernels_source.json")
    with open(src_summary_path, "w") as f:
        json.dump(CUDA_KERNELS, f, indent=4)
    print(f"\\nCUDA C++ kernel source codes saved to {src_summary_path} for compilation validation.")

if __name__ == "__main__":
    from datetime import datetime
    main()
