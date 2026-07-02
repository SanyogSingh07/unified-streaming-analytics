import os
import polars as pl

def load_raw_data(csv_path: str) -> pl.DataFrame:
    print(f"Loading raw dataset using Polars from {csv_path}...")
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Raw CSV not found at {csv_path}")
        
    df = pl.read_csv(csv_path, ignore_errors=True, infer_schema_length=10000)
    print(f"Loaded {df.height} rows.")
    return df
