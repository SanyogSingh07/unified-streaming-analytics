# Model Training

This document covers the complete ML training pipeline for the Netflix AI Analytics Platform.

---

## Overview

The training pipeline trains 5 classification models to predict content "hit" probability (high engagement likelihood) using features derived from the unified streaming catalog dataset.

---

## Training Pipeline Architecture

```
model/train.py          ← Entry point & orchestrator
    ↓
model/trainer.py        ← Rich CLI live training loop
    ↓
┌──────────────────────────────────────┐
│  Ingestion → Cleaning → Features     │
│  ingestion/   cleaning/   feature_engineering/
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  Model Training (5 algorithms)       │
│  RandomForest, XGBoost, CatBoost,   │
│  LightGBM, DecisionTree             │
└──────────────────────────────────────┘
    ↓
model/evaluation/ml_results.json   ← Metrics
model/models/random_forest.pkl     ← Best model
```

---

## Trained Models & Results

| Model | Accuracy | Precision | Recall | F1 Score | Training Time | Rank |
|-------|----------|-----------|--------|----------|---------------|------|
| Random Forest | **99.97%** | 99.98% | 99.96% | 99.97% | 32 sec | ⭐ BEST |
| CatBoost | 97.80% | 97.65% | 97.95% | 97.80% | 55 sec | #2 |
| XGBoost | 97.50% | 97.40% | 97.60% | 97.50% | 48 sec | #3 |
| LightGBM | 97.40% | 97.30% | 97.50% | 97.40% | 55 sec | #4 |
| Decision Tree | 91.20% | 91.10% | 91.30% | 91.20% | 11 sec | #5 |

---

## Running Training

```bash
# Activate virtual environment
.venv\Scripts\activate

# Run the premium CLI training pipeline
python model/train.py
```

### CLI Dashboard Panels

The training dashboard displays 4 simultaneous panels:
1. **Banner** — STREAM_OS platform header
2. **Training Status** — Epoch, progress bar, live accuracy/precision/recall/F1/loss, ETA, CPU/RAM/GPU
3. **Real-time ASCII Plot** — Loss and accuracy curves plotted with plotext
4. **Model Comparison Table** — Benchmark comparison table (ranked) after all models complete

---

## Hyperparameters

### Random Forest (Best Model)
```python
RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1
)
```

### XGBoost
```python
XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    eval_metric='logloss',
    use_label_encoder=False
)
```

---

## Evaluation Output

After training, the pipeline exports:

```json
{
    "random_forest": {
        "accuracy": 0.9997,
        "precision": 0.9998,
        "recall": 0.9996,
        "f1_score": 0.9997,
        "total_test_samples": 12591,
        "hits_in_test": 2332,
        "predicted_hits": 2332
    }
}
```

File path: `model/evaluation/ml_results.json`

---

## Model Export

The best-performing model (Random Forest) is automatically saved:

```
model/models/random_forest.pkl
```

Loading for inference:
```python
import joblib
model = joblib.load("model/models/random_forest.pkl")
prediction = model.predict(feature_array)
```

---

## Extending with New Models

To add a new model, update `model/trainer.py`:

```python
from sklearn.ensemble import GradientBoostingClassifier

models_to_train = [
    ...existing models...,
    {
        "name": "GradientBoosting",
        "model": GradientBoostingClassifier(n_estimators=100, random_state=42),
    }
]
```
