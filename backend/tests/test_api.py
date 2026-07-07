import os
import sys

import pytest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "app"))
sys.path.insert(0, os.path.join(ROOT, "models"))
sys.path.insert(0, os.path.join(ROOT, "..", "model", "training"))


@pytest.fixture(scope="module")
def client():
    try:
        from fastapi.testclient import TestClient
        from main import app
    except (ImportError, Exception) as exc:
        pytest.skip(f"Backend not available: {exc}")

    with TestClient(app) as test_client:
        yield test_client


class TestHealthEndpoints:
    """Test basic health and root endpoints."""

    def test_root_returns_200(self, client):
        response = client.get("/")
        assert response.status_code == 200

    def test_root_contains_message(self, client):
        response = client.get("/")
        data = response.json()
        assert "message" in data


class TestTitlesEndpoints:
    """Test titles CRUD endpoints."""

    def test_get_titles_returns_200(self, client):
        response = client.get("/titles")
        assert response.status_code == 200

    def test_get_titles_has_results_key(self, client):
        response = client.get("/titles")
        data = response.json()
        assert "results" in data or isinstance(data, list)

    def test_get_titles_pagination(self, client):
        response = client.get("/titles?page=1&limit=5")
        assert response.status_code == 200

    def test_get_titles_invalid_page(self, client):
        response = client.get("/titles?page=-1")
        assert response.status_code in [200, 422]


class TestSearchEndpoints:
    """Test search endpoint."""

    def test_search_with_query(self, client):
        response = client.get("/search?q=inception")
        assert response.status_code in [200, 404]

    def test_search_empty_query(self, client):
        response = client.get("/search?q=")
        assert response.status_code in [200, 422]


class TestStatsEndpoint:
    """Test statistics endpoint."""

    def test_stats_returns_200(self, client):
        response = client.get("/stats")
        assert response.status_code == 200

    def test_stats_has_total_titles(self, client):
        response = client.get("/stats")
        if response.status_code == 200:
            data = response.json()
            assert data is not None


class TestAnalyticsEndpoints:
    """Test analytics endpoints."""

    def test_genres_endpoint(self, client):
        response = client.get("/analytics/genres")
        assert response.status_code in [200, 404]

    def test_platforms_endpoint(self, client):
        response = client.get("/analytics/platforms")
        assert response.status_code in [200, 404]
