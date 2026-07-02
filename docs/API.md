# API Documentation

Complete reference for all FastAPI REST endpoints of the Netflix AI Analytics Platform.

---

## Base URL

```
Development:  http://localhost:8000
Production:   https://your-domain.com/api
```

## Authentication

Currently open (JWT authentication planned for v1.3.0). All endpoints are public.

## Interactive Docs

Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc

---

## Endpoints

### Health

#### `GET /`
Returns API status.

**Response:**
```json
{"message": "Netflix Analytics API is running. Access docs at /docs."}
```

---

### Titles

#### `GET /titles`
Paginated, filterable list of titles from the unified catalog.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `limit` | int | 20 | Items per page (max 100) |
| `genre` | string | None | Filter by genre (e.g., "Action") |
| `language` | string | None | Filter by ISO language code |
| `platform` | string | None | Filter by platform: Netflix, Disney+, Amazon Prime |
| `type` | string | None | "Movie" or "TV Show" |
| `sort_by` | string | "popularity" | Sort: popularity, vote_average, release_date |

**Response:**
```json
{
  "total": 20946,
  "page": 1,
  "limit": 20,
  "results": [
    {
      "id": 1,
      "title": "Inception",
      "platform": "Netflix",
      "type": "Movie",
      "genres": "Action, Sci-Fi, Thriller",
      "release_date": "2010-07-16",
      "vote_average": 8.4,
      "popularity": 94.2
    }
  ]
}
```

---

#### `GET /titles/{id}`
Get a single title by ID.

**Path Parameters:** `id` (int)

**Response:** Single title object with all fields.

---

### Search

#### `GET /search`
Full-text search across title and overview fields.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query |
| `limit` | int | Max results (default 20) |

**Response:**
```json
{
  "query": "space adventure",
  "results": [...],
  "total": 47
}
```

---

### Recommendations

#### `GET /recommendations/{title_id}`
Get TF-IDF cosine-similarity recommendations for a title.

**Path Parameters:** `title_id` (int)

**Query Parameters:** `limit` (int, default 10)

**Response:**
```json
{
  "source_title": "Inception",
  "recommendations": [
    {"id": 42, "title": "Interstellar", "similarity_score": 0.87, "platform": "Netflix"},
    {"id": 156, "title": "The Matrix", "similarity_score": 0.82, "platform": "Amazon Prime"}
  ]
}
```

---

### Analytics

#### `GET /analytics/genres`
Genre distribution statistics.

**Response:**
```json
{
  "genres": [
    {"name": "Drama", "count": 4521, "percentage": 21.6},
    {"name": "Comedy", "count": 3102, "percentage": 14.8}
  ]
}
```

#### `GET /analytics/platforms`
Platform-level summary statistics.

#### `GET /analytics/ratings`
Content rating distribution.

#### `GET /analytics/yearly`
Release volume by year.

---

### Statistics

#### `GET /stats`
High-level dashboard KPI statistics.

**Response:**
```json
{
  "total_titles": 20946,
  "total_movies": 14823,
  "total_shows": 6123,
  "avg_vote_average": 6.8,
  "platforms": {"Netflix": 9234, "Disney+": 4102, "Amazon Prime": 7610},
  "ml_results": {
    "best_model": "Random Forest",
    "best_accuracy": 0.9997
  }
}
```

---

### Prediction

#### `POST /predict`
Predict hit probability for a title using the trained Random Forest model.

**Request Body:**
```json
{
  "title": "Inception",
  "genres": "Action, Sci-Fi",
  "vote_average": 8.4,
  "popularity": 94.2,
  "release_year": 2010,
  "runtime": 148
}
```

**Response:**
```json
{
  "title": "Inception",
  "hit_probability": 0.97,
  "prediction": "Hit",
  "confidence": "High",
  "model_used": "Random Forest v1.0"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "detail": "Title with id 9999 not found."
}
```

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad request / invalid parameters |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Internal server error |
