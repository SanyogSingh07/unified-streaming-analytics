# Data Pipeline

The ETL (Extract, Transform, Load) pipeline that feeds the Netflix AI Analytics Platform.

---

## Pipeline Overview

```
Extract → Transform → Load → Feature Engineering → ML Ready
```

All pipeline stages are modular Python scripts located in `model/`:

| Stage | Script | Duration |
|-------|--------|---------|
| Ingestion | `ingestion/load_data.py` | 1.8 sec |
| Cleaning | `cleaning/clean_data.py` | 0.9 sec |
| Feature Engineering | `feature_engineering/build_features.py` | 2.1 sec |
| SQLite Load | Backend seeding | 3.2 sec |
| TF-IDF Build | `deployment/backend/recommendation.py` | 4.3 sec |

---

## Stage 1: Ingestion

Uses **Polars** for high-performance CSV loading:

```python
import polars as pl

def load_raw_data(path: str) -> pl.DataFrame:
    return pl.read_csv(path, infer_schema_length=10000)
```

Three source files are loaded independently and merged on a unified schema.

---

## Stage 2: Cleaning

Key transformations:
- Drop rows where `title` is null
- Fill remaining nulls: `"Unknown"` for text, `0.0` for numerics
- Normalize dates: `"January 1, 2020"` → `"2020-01-01"`
- Unify genre delimiters: `"|"` or `"&"` → `","` 
- Strip HTML entities and control characters from `overview`
- Remove cross-platform duplicate titles (case-insensitive match)

---

## Stage 3: Feature Engineering

Creates ML-ready features from cleaned data:

1. **Genre One-Hot Encoding** — 28 binary genre columns
2. **Language Encoding** — ISO code → integer label
3. **Popularity Scaling** — MinMax normalization 0–1
4. **Vote Average Scaling** — Normalize to 0–1
5. **Year Extraction** — `release_date` → `release_year` integer
6. **Hit Label** — Binary target: `1` if `vote_average ≥ median AND popularity ≥ median`

---

## Stage 4: SQLite Load

The cleaned unified DataFrame is written to SQLite via SQLAlchemy:

```python
from sqlalchemy.orm import Session
with Session(engine) as db:
    db.bulk_save_objects(movie_objects)
    db.commit()
```

---

## Running the Pipeline Manually

```bash
# Run full data pipeline (ingestion + cleaning + features + seed)
python model/run_pipeline.py

# Or use the training script which auto-runs all stages:
python model/train.py
```
