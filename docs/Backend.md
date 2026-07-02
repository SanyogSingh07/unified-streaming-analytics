# Backend

Documentation for the FastAPI backend service.

---

## Overview

The backend is a **FastAPI** application serving 12+ REST endpoints for the Netflix AI Analytics Platform. It uses **SQLAlchemy** as the ORM with **SQLite** for local development.

---

## Structure

```
deployment/backend/
├── main.py             ← FastAPI app, all route definitions
├── database.py         ← SQLAlchemy engine, session factory
├── models.py           ← ORM Movie schema
├── recommendation.py   ← TF-IDF cosine similarity engine
├── Dockerfile
└── requirements.txt
```

---

## Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/titles` | Paginated title listing |
| GET | `/titles/{id}` | Single title detail |
| GET | `/search` | Full-text search |
| GET | `/recommendations/{id}` | TF-IDF recommendations |
| GET | `/analytics/genres` | Genre distribution |
| GET | `/analytics/platforms` | Platform statistics |
| GET | `/stats` | Dashboard KPIs |
| POST | `/predict` | Hit probability prediction |
| POST | `/analyze` | Gemini AI analysis |

Full API reference: [API.md](API.md)

---

## Running Locally

```bash
cd deployment/backend
uvicorn main:app --reload --port 8000
```

Swagger UI: http://localhost:8000/docs

---

## Database

SQLite database is created automatically on first run. To seed it:

```bash
python scripts/seed_db.py
```

The database is located at: `deployment/backend/netflix_analytics.db`

---

## Adding New Endpoints

```python
@app.get("/my-endpoint")
async def my_endpoint(db: Session = Depends(get_db)):
    result = db.query(Movie).filter(...).all()
    return {"results": result}
```

See [FastAPI docs](https://fastapi.tiangolo.com) for full documentation.
