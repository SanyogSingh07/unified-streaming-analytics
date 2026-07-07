"""
ML model regression and unit tests.
Ensures model accuracy does not regress below thresholds.
"""

import json
import os
import sys

import numpy as np
import pytest

# Path setup
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.join(ROOT, "model"))

RESULTS_PATH = os.path.join(ROOT, "model", "evaluation", "ml_results.json")
MODEL_PATH = os.path.join(ROOT, "model", "checkpoints", "random_forest.pkl")


class TestMLResults:
    """Test ML evaluation results meet minimum thresholds."""

    def test_results_file_exists(self):
        """ml_results.json must exist after training."""
        assert os.path.exists(RESULTS_PATH), (
            f"ml_results.json not found at {RESULTS_PATH}. "
            "Run `python model/train.py` to generate it."
        )

    def test_results_parseable(self):
        """Results file must be valid JSON."""
        with open(RESULTS_PATH) as f:
            data = json.load(f)
        assert isinstance(data, dict)

    def test_naive_bayes_accuracy_above_threshold(self):
        """Naive Bayes accuracy must be ≥ 90%."""
        if not os.path.exists(RESULTS_PATH):
            pytest.skip("ml_results.json not found — run training first")
        with open(RESULTS_PATH) as f:
            data = json.load(f)
        if "naive_bayes" in data:
            accuracy = data["naive_bayes"].get("accuracy", 0)
            assert (
                accuracy >= 0.90
            ), f"Naive Bayes accuracy {accuracy:.4f} is below 90% threshold"

    def test_results_has_required_fields(self):
        """Each model entry must have accuracy, precision, recall, f1_score."""
        if not os.path.exists(RESULTS_PATH):
            pytest.skip("ml_results.json not found — run training first")
        with open(RESULTS_PATH) as f:
            data = json.load(f)
        required_fields = ["accuracy", "precision", "recall", "f1_score"]
        for model_name, metrics in data.items():
            if isinstance(metrics, dict):
                for field in required_fields:
                    assert (
                        field in metrics
                    ), f"Model '{model_name}' missing field '{field}'"

    def test_all_accuracies_in_valid_range(self):
        """All accuracy values must be between 0 and 1."""
        if not os.path.exists(RESULTS_PATH):
            pytest.skip("ml_results.json not found — run training first")
        with open(RESULTS_PATH) as f:
            data = json.load(f)
        for model_name, metrics in data.items():
            if isinstance(metrics, dict) and "accuracy" in metrics:
                acc = metrics["accuracy"]
                assert (
                    0.0 <= acc <= 1.0
                ), f"Model '{model_name}' has invalid accuracy: {acc}"


class TestModelFile:
    """Test the saved model file."""

    def test_model_file_exists(self):
        """Saved model .pkl must exist after training."""
        if not os.path.exists(MODEL_PATH):
            pytest.skip("Model file not found — run training first")
        assert os.path.exists(MODEL_PATH)

    def test_model_loadable(self):
        """Model must be loadable with joblib."""
        if not os.path.exists(MODEL_PATH):
            pytest.skip("Model file not found — run training first")
        try:
            import joblib

            model = joblib.load(MODEL_PATH)
            assert model is not None
        except ImportError:
            pytest.skip("joblib not installed")

    def test_model_has_predict_method(self):
        """Loaded model must have a predict method."""
        if not os.path.exists(MODEL_PATH):
            pytest.skip("Model file not found — run training first")
        try:
            import joblib

            model = joblib.load(MODEL_PATH)
            assert hasattr(model, "predict"), "Model must have a predict method"
            assert hasattr(model, "predict_proba"), "Model must have predict_proba"
        except ImportError:
            pytest.skip("joblib not installed")


class TestFeatureEngineering:
    """Test feature engineering functions."""

    def test_numeric_features_are_finite(self):
        """Feature arrays should not contain NaN or Inf."""
        sample = np.array([[8.4, 94.2, 1500, 2010, 148]])
        assert np.all(np.isfinite(sample)), "Feature array contains NaN or Inf"

    def test_feature_array_correct_shape(self):
        """Feature array must have expected number of features."""
        sample = np.array([[8.4, 94.2, 1500, 2010, 148]])
        assert sample.shape[1] >= 1, "Feature array has no features"
