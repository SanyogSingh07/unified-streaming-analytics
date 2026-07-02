import os
import json
import polars as pl
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def train_and_evaluate(df: pl.DataFrame):
    print("Running Random Forest Classifier...")
    
    df = df.with_columns(
        ((pl.col('Vote_Average') >= 7.0) & (pl.col('Vote_Count') >= 100)).cast(pl.Int32).alias('is_hit')
    )
    
    unique_genres = df.select(
        pl.col('clean_genres').str.split(',').list.explode().str.strip_chars().drop_nulls().unique()
    ).to_series().to_list()
    
    genre_exprs = []
    genre_cols = []
    for genre in sorted([g for g in unique_genres if g]):
        col_name = f"genre_{genre}"
        genre_cols.append(col_name)
        genre_exprs.append(
            pl.col('clean_genres').str.contains(genre, literal=True).cast(pl.Int32).fill_null(0).alias(col_name)
        )
        
    df = df.with_columns(genre_exprs)
    
    features = ['Popularity', 'Vote_Average', 'release_year', 'release_month', 'weekend_release', 'genre_count'] + genre_cols
    X = df.select(features).fill_null(0.0).to_pandas()
    y = df.select('is_hit').to_series().to_pandas()
    
    np.random.seed(42)
    mask = np.random.rand(len(X)) < 0.8
    X_train, X_test = X[mask], X[~mask]
    y_train, y_test = y[mask], y[~mask]
    
    # Train Random Forest optimized for maximum accuracy
    model = RandomForestClassifier(n_estimators=150, max_depth=16, min_samples_split=5, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    nb_metrics = {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "precision": float(precision_score(y_test, y_pred, zero_division=0)),
        "recall": float(recall_score(y_test, y_pred, zero_division=0)),
        "f1_score": float(f1_score(y_test, y_pred, zero_division=0)),
        "total_test_samples": len(y_test),
        "hits_in_test": int(y_test.sum()),
        "predicted_hits": int(y_pred.sum())
    }
    
    ml_results = {
        "naive_bayes": nb_metrics,
        "association_rules": []
    }
    
    # Save to model/evaluation/ml_results.json
    results_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "evaluation", "ml_results.json")
    with open(results_path, "w") as f:
        json.dump(ml_results, f, indent=4)
    print(f"ML results saved to {results_path}")
