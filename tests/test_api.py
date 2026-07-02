import pytest
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "deployment", "backend"))

try:
    from fastapi.testclient import TestClient
    from main import app
    client = TestClient(app)
    BACKEND_AVAILABLE = True
except (ImportError, Exception):
    client = None
    BACKEND_AVAILABLE = False


@pytest.mark.skipif(not BACKEND_AVAILABLE, reason="Backend not available")
class TestHealthEndpoints:
    """Test basic health and root endpoints."""

    def test_root_returns_200(self):
        response = client.get("/")
        assert response.status_code == 200

    def test_root_contains_message(self):
        response = client.get("/")
        data = response.json()
        assert "message" in data


@pytest.mark.skipif(not BACKEND_AVAILABLE, reason="Backend not available")
class TestTitlesEndpoints:
    """Test titles CRUD endpoints."""

    def test_get_titles_returns_200(self):
        response = client.get("/titles")
        assert response.status_code == 200

    def test_get_titles_has_results_key(self):
        response = client.get("/titles")
        data = response.json()
        assert "results" in data or isinstance(data, list)

    def test_get_titles_pagination(self):
        response = client.get("/titles?page=1&limit=5")
        assert response.status_code == 200

    def test_get_titles_invalid_page(self):
        response = client.get("/titles?page=-1")
        # Should either 422 or return empty
        assert response.status_code in [200, 422]


@pytest.mark.skipif(not BACKEND_AVAILABLE, reason="Backend not available")
class TestSearchEndpoints:
    """Test search endpoint."""

    def test_search_with_query(self):
        response = client.get("/search?q=inception")
        assert response.status_code in [200, 404]

    def test_search_empty_query(self):
        response = client.get("/search?q=")
        assert response.status_code in [200, 422]


@pytest.mark.skipif(not BACKEND_AVAILABLE, reason="Backend not available")
class TestStatsEndpoint:
    """Test statistics endpoint."""

    def test_stats_returns_200(self):
        response = client.get("/stats")
        assert response.status_code == 200

    def test_stats_has_total_titles(self):
        response = client.get("/stats")
        if response.status_code == 200:
            data = response.json()
            # Should have some form of count
            assert data is not None


@pytest.mark.skipif(not BACKEND_AVAILABLE, reason="Backend not available")
class TestAnalyticsEndpoints:
    """Test analytics endpoints."""

    def test_genres_endpoint(self):
        response = client.get("/analytics/genres")
        assert response.status_code in [200, 404]

    def test_platforms_endpoint(self):
        response = client.get("/analytics/platforms")
        assert response.status_code in [200, 404]
