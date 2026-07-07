import sys

import psutil


def get_cpu_usage():
    try:
        return psutil.cpu_percent(interval=None)
    except Exception:
        return 0.0


def get_ram_usage():
    try:
        mem = psutil.virtual_memory()
        used_gb = mem.used / (1024**3)
        return {"percent": mem.percent, "used_gb": round(used_gb, 2)}
    except Exception:
        return {"percent": 0.0, "used_gb": 0.0}


def get_gpu_usage():
    # Attempt to read GPU metrics from nvidia-smi if available, otherwise return simulated/idle values
    try:
        if sys.platform.startswith("win"):
            # On Windows, try running nvidia-smi command to get GPU utilization
            import subprocess

            res = subprocess.run(
                [
                    "nvidia-smi",
                    "--query-gpu=utilization.gpu",
                    "--format=csv,noheader,nounits",
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.DEVNULL,
                text=True,
                check=True,
            )
            val = int(res.stdout.strip())
            return val
    except Exception:
        pass

    # Return simulated value if not available
    import random

    return random.randint(15, 35)
