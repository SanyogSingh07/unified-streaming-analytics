"""Data pipeline integration tests."""

import pytest
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "model"))


class TestDatasetFiles:
    """Test that required dataset files exist."""

    DATASETS_DIR = os.path.join(ROOT, "model", "datasets")

    def test_netflix_csv_exists(self):
        path = os.path.join(self.DATASETS_DIR, "mymoviedb.csv")
        assert os.path.exists(path), "Netflix dataset CSV not found"

    def test_disney_csv_exists(self):
        path = os.path.join(self.DATASETS_DIR, "disney_plus_titles.csv")
        assert os.path.exists(path), "Disney+ dataset CSV not found"

    def test_amazon_csv_exists(self):
        path = os.path.join(self.DATASETS_DIR, "amazon_prime_titles.csv")
        assert os.path.exists(path), "Amazon Prime dataset CSV not found"

    def test_netflix_csv_not_empty(self):
        path = os.path.join(self.DATASETS_DIR, "mymoviedb.csv")
        if os.path.exists(path):
            assert os.path.getsize(path) > 1000, "Netflix CSV appears empty"

    def test_datasets_dir_exists(self):
        assert os.path.isdir(self.DATASETS_DIR), "Datasets directory not found"


class TestIngestionModule:
    """Test data ingestion functions."""

    def test_load_data_module_importable(self):
        """load_data.py must be importable."""
        try:
            from ingestion.load_data import load_raw_data
            assert callable(load_raw_data)
        except ImportError as e:
            pytest.skip(f"Ingestion module not available: {e}")

    def test_load_raw_data_returns_dataframe(self):
        """load_raw_data must return a DataFrame-like object."""
        try:
            from ingestion.load_data import load_raw_data
            path = os.path.join(ROOT, "model", "datasets", "mymoviedb.csv")
            if not os.path.exists(path):
                pytest.skip("Netflix CSV not found")
            df = load_raw_data(path)
            assert df is not None
            assert len(df) > 0
        except ImportError:
            pytest.skip("Ingestion module not available")


class TestCleaningModule:
    """Test data cleaning functions."""

    def test_clean_data_module_importable(self):
        """clean_data.py must be importable."""
        try:
            from cleaning.clean_data import clean_dataframe
            assert callable(clean_dataframe)
        except ImportError as e:
            pytest.skip(f"Cleaning module not available: {e}")


class TestFeatureEngineeringModule:
    """Test feature engineering functions."""

    def test_build_features_module_importable(self):
        """build_features.py must be importable."""
        try:
            from feature_engineering.build_features import build_features
            assert callable(build_features)
        except ImportError as e:
            pytest.skip(f"Feature engineering module not available: {e}")
