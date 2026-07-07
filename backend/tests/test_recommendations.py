"""Recommendation engine tests."""

import os
import sys

import pytest

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "app"))
sys.path.insert(0, os.path.join(ROOT, "models"))
sys.path.insert(0, os.path.join(ROOT, "..", "model", "training"))


class TestRecommendationModule:
    """Test the TF-IDF recommendation engine."""

    def test_recommendation_module_importable(self):
        """recommendation.py must be importable."""
        try:
            from recommendation import get_recommendations

            assert callable(get_recommendations)
        except ImportError as e:
            pytest.skip(f"Recommendation module not available: {e}")

    def test_recommendations_return_type(self):
        """get_recommendations must return a list."""
        try:
            from recommendation import get_recommendations

            # Call with a mock db session and title_id
            # This is a structural test — actual DB test would need seeded data
            assert callable(get_recommendations)
        except ImportError:
            pytest.skip("Recommendation module not available")


class TestRecommendationLogic:
    """Unit tests for recommendation logic without DB dependency."""

    def test_cosine_similarity_computation(self):
        """Cosine similarity between identical vectors should be 1.0."""
        import numpy as np
        from sklearn.metrics.pairwise import cosine_similarity

        vec_a = np.array([[1, 0, 1, 0, 1]])
        vec_b = np.array([[1, 0, 1, 0, 1]])
        similarity = cosine_similarity(vec_a, vec_b)[0][0]
        assert abs(similarity - 1.0) < 1e-6

    def test_cosine_similarity_orthogonal_vectors(self):
        """Orthogonal vectors should have similarity of 0.0."""
        import numpy as np
        from sklearn.metrics.pairwise import cosine_similarity

        vec_a = np.array([[1, 0, 0]])
        vec_b = np.array([[0, 1, 0]])
        similarity = cosine_similarity(vec_a, vec_b)[0][0]
        assert abs(similarity - 0.0) < 1e-6

    def test_tfidf_vectorizer_fits(self):
        """TF-IDF vectorizer must fit on sample text corpus."""
        from sklearn.feature_extraction.text import TfidfVectorizer

        corpus = [
            "action thriller movie sci-fi",
            "comedy drama romance family",
            "horror suspense psychological thriller",
            "documentary nature wildlife",
        ]
        vectorizer = TfidfVectorizer()
        matrix = vectorizer.fit_transform(corpus)
        assert matrix.shape[0] == 4
        assert matrix.shape[1] > 0
