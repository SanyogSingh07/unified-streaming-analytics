# Dataset

Documentation for all data sources used in the Netflix AI Analytics Platform.

---

## Data Sources

### 1. Netflix — mymoviedb.csv

| Attribute | Value |
|-----------|-------|
| Source | TMDB (The Movie Database) API |
| Titles | ~9,234 |
| Format | CSV |
| File | `model/datasets/mymoviedb.csv` |
| Size | ~4.0 MB |

**Key Fields:**
- `id` — TMDB movie ID
- `title` — Movie title
- `overview` — Plot description
- `genres` — Pipe-separated genre list
- `release_date` — ISO format date
- `popularity` — TMDB popularity score
- `vote_average` — Average user rating (0–10)
- `vote_count` — Total review count
- `original_language` — ISO 639-1 language code

---

### 2. Disney+ — disney_plus_titles.csv

| Attribute | Value |
|-----------|-------|
| Source | Kaggle / Web scrape |
| Titles | ~1,450 |
| Format | CSV |
| File | `model/datasets/disney_plus_titles.csv` |
| Size | ~375 KB |

**Key Fields:**
- `show_id` — Disney internal ID
- `type` — "Movie" or "TV Show"
- `title`, `director`, `cast`, `country`
- `date_added`, `release_year`
- `rating` — Audience rating (G, PG, etc.)
- `duration` — Minutes or seasons
- `listed_in` — Comma-separated genres

---

### 3. Amazon Prime — amazon_prime_titles.csv

| Attribute | Value |
|-----------|-------|
| Source | Kaggle / Web scrape |
| Titles | ~9,850 |
| Format | CSV |
| File | `model/datasets/amazon_prime_titles.csv` |
| Size | ~3.9 MB |

**Key Fields:**
- Same schema as Disney+ dataset
- `listed_in` — Genre categories

---

## Unified Schema

After ETL processing, all three sources are merged into a single SQLite schema:

```sql
CREATE TABLE movies (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    platform         VARCHAR,   -- 'Netflix' | 'Disney+' | 'Amazon Prime'
    type             VARCHAR,   -- 'Movie' | 'TV Show'
    title            VARCHAR,
    release_date     VARCHAR,   -- YYYY-MM-DD format
    overview         TEXT,
    genres           VARCHAR,   -- Comma-separated
    director         VARCHAR,
    cast             TEXT,
    country          VARCHAR,
    duration         VARCHAR,
    rating           VARCHAR,   -- Content rating
    popularity       DOUBLE,    -- 0.0 for non-Netflix
    vote_average     DOUBLE,    -- 0.0 for non-Netflix
    vote_count       INTEGER    -- 0 for non-Netflix
);
```

---

## Dataset Statistics

| Metric | Value |
|--------|-------|
| Total Titles | 20,946 |
| Movies | 14,823 (70.8%) |
| TV Shows | 6,123 (29.2%) |
| Unique Genres | 28 |
| Languages | 45+ |
| Date Range | 1950 — 2024 |
| Avg Vote Average | 6.8 / 10 |
| Null Rate (overview) | 2.3% |

---

## Data Cleaning Steps

1. **Null handling** — Drop rows with null `title`; fill other nulls with "Unknown"
2. **Deduplication** — Remove cross-platform duplicates by normalized title matching
3. **Date normalization** — Convert all date formats to `YYYY-MM-DD`
4. **Genre normalization** — Pipe/comma delimiters unified to comma-separated
5. **Text cleaning** — Strip HTML entities and control characters from overviews
6. **Type coercion** — Ensure numeric fields are float, string fields are str

See [DataPipeline.md](DataPipeline.md) for the full ETL process.
