import os
import sys

import duckdb

# Add model to path for relative imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model.preprocessing.cleaning.clean_data import clean_dataframe
from model.preprocessing.feature_engineering.build_features import build_features
from model.preprocessing.ingestion.load_data import load_raw_data
from model.training.train_model import train_and_evaluate


def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))

    # Fetch/download Kaggle dataset dynamically (works locally and in CI runners)
    import kagglehub

    print("Fetching Kaggle dataset 'raedaddala/imdb-movies-from-1960-to-2023'...")
    csv_dir = kagglehub.dataset_download("raedaddala/imdb-movies-from-1960-to-2023")
    csv_path = os.path.join(csv_dir, "final_dataset.csv")
    if not os.path.exists(csv_path):
        # Fallback to directory search if file is nested differently
        for root, _dirs, files in os.walk(csv_dir):
            if "final_dataset.csv" in files:
                csv_path = os.path.join(root, "final_dataset.csv")
                break

    # Pipeline Execution
    df = load_raw_data(csv_path)
    df = clean_dataframe(df)
    df = build_features(df)

    # Export Parquet to model/datasets/parquet/movies.parquet
    parquet_path = os.path.join(root_dir, "datasets", "parquet", "movies.parquet")
    os.makedirs(os.path.dirname(parquet_path), exist_ok=True)
    df.write_parquet(parquet_path)
    print(f"Saved Parquet file to {parquet_path}")

    # Train Models
    train_and_evaluate(df)

    # Analytics DB
    print("Ingesting into DuckDB Analytics Layer...")
    db_dir = os.path.join(root_dir, "datasets", "processed")
    os.makedirs(db_dir, exist_ok=True)
    db_path = os.path.join(db_dir, "analytics.db")

    try:
        con = duckdb.connect(db_path)
        con.execute(
            f"CREATE OR REPLACE TABLE movies AS SELECT * FROM read_parquet('{parquet_path}')"
        )
        row = con.execute("SELECT COUNT(*) FROM movies").fetchone()
        count = row[0] if row else 0
        print(f"Successfully ingested {count} movies into DuckDB!")

        con.execute(
            """
            CREATE OR REPLACE VIEW v_top_genres AS
            SELECT primary_genre, COUNT(*) as count, AVG(Vote_Average) as avg_rating
            FROM movies GROUP BY primary_genre ORDER BY count DESC LIMIT 10
        """
        )
        con.execute(
            """
            CREATE OR REPLACE VIEW v_decade_stats AS
            SELECT release_decade, COUNT(*) as movies, AVG(Popularity) as avg_popularity
            FROM movies GROUP BY release_decade ORDER BY release_decade DESC
        """
        )
        con.close()
    except Exception as e:
        print(
            f"Warning: DuckDB ingestion skipped due to file lock (the web server is likely running). Details: {e}"
        )


if __name__ == "__main__":
    main()
