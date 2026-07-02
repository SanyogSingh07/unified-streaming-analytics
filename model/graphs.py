import plotext as plt
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as mplt

def plot_ascii_loss(epochs, losses):
    plt.clear_data()
    plt.title("Training Loss S-Curve")
    plt.plot(epochs, losses, marker="bullet", color="red")
    plt.xlabel("Epoch")
    plt.ylabel("Loss")
    plt.plotsize(45, 12)
    return plt.build()

def plot_ascii_accuracy(epochs, accuracies):
    plt.clear_data()
    plt.title("Training Accuracy Trend")
    plt.plot(epochs, accuracies, marker="bullet", color="green")
    plt.xlabel("Epoch")
    plt.ylabel("Accuracy")
    plt.plotsize(45, 12)
    return plt.build()

def save_matplotlib_plots(epochs, losses, accuracies, save_dir):
    os.makedirs(save_dir, exist_ok=True)
    
    # 1. Loss Plot
    mplt.figure(figsize=(8, 4))
    mplt.plot(epochs, losses, color='red', marker='o', linewidth=2)
    mplt.title("Model Training Loss Curve")
    mplt.xlabel("Epoch")
    mplt.ylabel("Loss")
    mplt.grid(True, linestyle='--', alpha=0.5)
    loss_path = os.path.join(save_dir, "loss_curve.png")
    mplt.tight_layout()
    mplt.savefig(loss_path)
    mplt.close()
    
    # 2. Accuracy Plot
    mplt.figure(figsize=(8, 4))
    mplt.plot(epochs, accuracies, color='green', marker='o', linewidth=2)
    mplt.title("Model Training Accuracy Trend")
    mplt.xlabel("Epoch")
    mplt.ylabel("Accuracy")
    mplt.grid(True, linestyle='--', alpha=0.5)
    acc_path = os.path.join(save_dir, "accuracy_curve.png")
    mplt.tight_layout()
    mplt.savefig(acc_path)
    mplt.close()
