import os

# Root Directory Configuration
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
DATASETS_DIR = os.path.join(os.path.dirname(ROOT_DIR), "datasets")
PARQUET_PATH = os.path.join(DATASETS_DIR, "parquet", "movies.parquet")
RAW_CSV_PATH = r"C:\Users\sanyo\.cache\kagglehub\datasets\raedaddala\imdb-movies-from-1960-to-2023\versions\6\Dataset\final_dataset.csv"
MODEL_SAVE_PATH = os.path.join(ROOT_DIR, "checkpoints", "random_forest.pkl")
LOGS_DIR = os.path.join(ROOT_DIR, "logs")

# Classifier Settings
RANDOM_STATE = 42
EPOCHS = 10
N_ESTIMATORS = 150
MAX_DEPTH = 16

# Ensure directories exist
os.makedirs(os.path.dirname(PARQUET_PATH), exist_ok=True)
os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)
