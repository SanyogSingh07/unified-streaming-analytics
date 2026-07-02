# Feature Engineering

All transformations applied to convert raw cleaned data into ML-ready features.

---

## Feature Set

The final feature matrix has the following columns used for ML model training:

| Feature | Type | Description |
|---------|------|-------------|
| `vote_average` | float | Normalized TMDB user rating (0–1) |
| `popularity` | float | MinMax scaled popularity score |
| `vote_count` | float | Log-scaled review count |
| `release_year` | int | Extracted from `release_date` |
| `genre_Action` | binary | Genre one-hot: is Action? |
| `genre_Comedy` | binary | Genre one-hot: is Comedy? |
| `genre_Drama` | binary | Genre one-hot: is Drama? |
| `genre_Thriller` | binary | Genre one-hot: is Thriller? |
| `genre_Horror` | binary | Genre one-hot: is Horror? |
| ... (24 more) | binary | All 28 genre categories |
| `language_encoded` | int | ISO 639-1 language → integer label |
| `platform_Netflix` | binary | Platform one-hot |
| `platform_Disney` | binary | Platform one-hot |
| `platform_Amazon` | binary | Platform one-hot |

---

## Target Variable

```
is_hit = 1  if  vote_average >= median(vote_average)
              AND popularity >= median(popularity)
         0  otherwise
```

This creates a balanced binary classification problem.

---

## TF-IDF Corpus (Recommendation Engine)

A separate TF-IDF feature matrix is built for the recommendation engine:

```python
from sklearn.feature_extraction.text import TfidfVectorizer

# Combine genres + overview into a single feature string per title
corpus = df["genres"].fillna("") + " " + df["overview"].fillna("")

vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
tfidf_matrix = vectorizer.fit_transform(corpus)  # Shape: (20946, 5000)
```

Cosine similarity is computed at query time using:
```python
from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(tfidf_matrix[idx], tfidf_matrix)[0]
```

---

## Code Location

All feature engineering logic lives in:
```
model/feature_engineering/build_features.py
```

To re-run:
```bash
python -c "from model.feature_engineering.build_features import build_features; build_features()"
```
