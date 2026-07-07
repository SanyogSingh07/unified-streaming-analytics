import os
import sys
from typing import Any

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sqlalchemy.orm import Session

# Ensure models directory is in path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
models_dir = os.path.join(root_dir, "models")
if models_dir not in sys.path:
    sys.path.insert(0, models_dir)

from models import Movie  # noqa: E402

# In-memory cache for TF-IDF results to keep recommendations fast
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix: Any = None
movies_cache: list[Movie] = []
title_to_idx: dict[str, int] = {}


def build_recommendation_matrix(db: Session):
    """
    Load movies from database, fit TF-IDF vectorizer, and cache the matrix.
    """
    global tfidf_matrix, movies_cache, title_to_idx
    print("Building recommendation similarity matrix from database...")

    # Query all movies
    movies = db.query(Movie).all()
    if not movies:
        print("No movies found in database. Matrix not built.")
        return

    movies_cache = movies

    # Prepare texts directly without pandas DataFrame overhead
    texts = []
    title_to_idx.clear()
    for idx, m in enumerate(movies):
        # Build text string safely handling None values
        overview = m.overview or ""
        genres = (m.genres or "").replace(",", " ")
        primary_genre = m.primary_genre or ""
        text = f"{overview} {genres} {primary_genre}"
        texts.append(text)
        # Save title lookup
        title_to_idx[m.title.lower().strip()] = idx

    # Fit TF-IDF Vectorizer
    tfidf_matrix = vectorizer.fit_transform(texts)
    print(f"Matrix built successfully. Shape: {tfidf_matrix.shape}")


def get_recommendations(movie_title: str, db: Session, limit: int = 10):
    """
    Given a movie title, return the top `limit` most similar movies.
    """
    global tfidf_matrix, movies_cache, title_to_idx

    # If cache is empty, build it
    if tfidf_matrix is None or not movies_cache:
        build_recommendation_matrix(db)

    if tfidf_matrix is None or not movies_cache:
        return []

    title_clean = movie_title.lower().strip()

    # Find matching movie index
    if title_clean not in title_to_idx:
        # Fallback: search for subtitle/fuzzy match in titles
        matched_idx = None
        for key, val in title_to_idx.items():
            if title_clean in key or key in title_clean:
                matched_idx = val
                break
        if matched_idx is None:
            return []
    else:
        matched_idx = title_to_idx[title_clean]

    # Calculate similarity scores for this movie index using fast sparse matrix dot product
    sim_scores = (tfidf_matrix * tfidf_matrix[matched_idx].T).toarray().flatten()

    # Retrieve top indices using fast argpartition
    k = min(limit + 1, len(sim_scores))
    if k <= 0:
        return []

    top_k_indices = np.argpartition(sim_scores, -k)[-k:]
    sorted_top_k = top_k_indices[np.argsort(sim_scores[top_k_indices])[::-1]]

    results = []
    for idx in sorted_top_k:
        if idx == matched_idx:
            continue

        m = movies_cache[idx]
        score = float(sim_scores[idx])

        # We only want results with some similarity score
        if score <= 0.0:
            continue

        results.append(
            {
                "id": m.id,
                "title": m.title,
                "overview": m.overview,
                "popularity": m.popularity,
                "vote_average": m.vote_average,
                "vote_count": m.vote_count,
                "genres": m.genres,
                "poster_url": m.poster_url,
                "release_date": m.release_date,
                "similarity_score": round(score, 4),
            }
        )

        if len(results) >= limit:
            break

    return results
