"""Test configuration and shared fixtures."""

import os
import sys
import pytest

# Ensure both backend and model are on the path
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "deployment", "backend"))
sys.path.insert(0, os.path.join(ROOT, "model"))


@pytest.fixture(scope="session")
def project_root():
    """Return the absolute path to the project root."""
    return ROOT


@pytest.fixture(scope="session")
def model_dir(project_root):
    """Return the model directory path."""
    return os.path.join(project_root, "model")


@pytest.fixture(scope="session")
def results_path(model_dir):
    """Return the path to ml_results.json."""
    return os.path.join(model_dir, "evaluation", "ml_results.json")


@pytest.fixture(scope="session")
def model_path(model_dir):
    """Return the path to the saved best model."""
    return os.path.join(model_dir, "models", "random_forest.pkl")


@pytest.fixture(scope="session")
def datasets_dir(model_dir):
    """Return the datasets directory path."""
    return os.path.join(model_dir, "datasets")
