import numpy as np
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    roc_curve,
)


def calculate_metrics(y_true, y_pred, y_prob=None):
    metrics = {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "f1_score": float(f1_score(y_true, y_pred, zero_division=0)),
    }

    if y_prob is not None:
        try:
            metrics["roc_auc"] = float(roc_auc_score(y_true, y_prob))
        except Exception:
            metrics["roc_auc"] = 0.0
    else:
        metrics["roc_auc"] = 0.0

    return metrics


def generate_evaluation_report(y_true, y_pred, y_prob=None):
    cm = confusion_matrix(y_true, y_pred)
    report = classification_report(y_true, y_pred, zero_division=0)

    roc_data = None
    if y_prob is not None:
        try:
            fpr, tpr, _ = roc_curve(y_true, y_prob)
            roc_data = {"fpr": fpr.tolist(), "tpr": tpr.tolist()}
        except Exception:
            pass

    return {
        "confusion_matrix": cm.tolist(),
        "classification_report": report,
        "roc_curve": roc_data,
    }


def get_feature_importance(model, feature_names):
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1]
        ranking = []
        for idx in indices:
            ranking.append(
                {"feature": feature_names[idx], "importance": float(importances[idx])}
            )
        return ranking
    return []
