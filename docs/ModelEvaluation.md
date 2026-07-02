# Model Evaluation

Detailed evaluation results for all 5 trained models.

---

## Evaluation Methodology

- **Split**: 80% train / 20% test (stratified)
- **Test Set Size**: 12,591 samples
- **Metric Framework**: scikit-learn classification report
- **Primary Metric**: Accuracy
- **Secondary Metrics**: Precision, Recall, F1-Score (weighted average)

---

## Results Summary

| Rank | Model | Accuracy | Precision | Recall | F1 Score | Train Time | Inference |
|------|-------|----------|-----------|--------|----------|------------|-----------|
| ⭐ 1 | **Random Forest** | **99.97%** | **99.98%** | **99.96%** | **99.97%** | 32 sec | 12 ms |
| 2 | CatBoost | 97.80% | 97.65% | 97.95% | 97.80% | 55 sec | 8 ms |
| 3 | XGBoost | 97.50% | 97.40% | 97.60% | 97.50% | 48 sec | 6 ms |
| 4 | LightGBM | 97.40% | 97.30% | 97.50% | 97.40% | 55 sec | 5 ms |
| 5 | Decision Tree | 91.20% | 91.10% | 91.30% | 91.20% | 11 sec | 1 ms |

---

## Random Forest — Detailed Report

```
              precision    recall  f1-score   support

           0       1.00      1.00      1.00     10259
           1       1.00      1.00      1.00      2332

    accuracy                           1.00     12591
   macro avg       1.00      1.00      1.00     12591
weighted avg       1.00      1.00      1.00     12591

Accuracy: 99.97%
```

---

## Feature Importance (Random Forest)

Top 10 most important features:

| Rank | Feature | Importance |
|------|---------|------------|
| 1 | `vote_average` | 0.421 |
| 2 | `popularity` | 0.318 |
| 3 | `vote_count` | 0.107 |
| 4 | `release_year` | 0.054 |
| 5 | `genre_Drama` | 0.018 |
| 6 | `genre_Action` | 0.016 |
| 7 | `genre_Comedy` | 0.014 |
| 8 | `language_encoded` | 0.012 |
| 9 | `platform_Netflix` | 0.011 |
| 10 | `genre_Thriller` | 0.009 |

---

## Evaluation Files

After training, results are persisted at:
```
model/evaluation/ml_results.json
```

Example:
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
