import datetime
import os


class TrainingLogger:
    def __init__(self, logs_dir):
        self.logs_dir = logs_dir
        os.makedirs(self.logs_dir, exist_ok=True)
        # Log filename based on today's date
        today_str = datetime.date.today().strftime("%Y-%m-%d")
        self.log_path = os.path.join(self.logs_dir, f"{today_str}_train.log")

    def log(self, message):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        formatted_message = f"[{timestamp}] {message}\n"
        with open(self.log_path, "a") as f:
            f.write(formatted_message)

    def log_run_details(
        self,
        dataset_name,
        size,
        features_count,
        hyperparameters,
        metrics,
        training_time,
        model_path,
        error=None,
    ):
        self.log("=========================================")
        self.log("           TRAINING RUN REPORT           ")
        self.log("=========================================")
        self.log(f"Dataset: {dataset_name}")
        self.log(f"Dataset Size: {size} rows")
        self.log(f"Features Mapped: {features_count}")
        self.log(f"Hyperparameters: {hyperparameters}")
        self.log(f"Model Save Path: {model_path}")
        self.log(f"Training Time: {training_time}")

        if error:
            self.log("STATUS: FAILED")
            self.log(f"Error Message: {error}")
        else:
            self.log("STATUS: SUCCESSFUL")
            self.log(f"Final Metrics: {metrics}")
        self.log("=========================================\n")
