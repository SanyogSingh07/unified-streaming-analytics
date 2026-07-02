# Performance Benchmarks

Performance metrics for the Netflix AI Analytics Platform.

---

## ML Model Performance

| Model | Accuracy | Precision | Recall | F1 Score | Training Time | Inference (ms) |
|-------|----------|-----------|--------|----------|---------------|----------------|
| **Random Forest** | **99.97%** | 99.98% | 99.96% | 99.97% | 32 sec | 12 ms |
| CatBoost | 97.80% | 97.65% | 97.95% | 97.80% | 55 sec | 8 ms |
| XGBoost | 97.50% | 97.40% | 97.60% | 97.50% | 48 sec | 6 ms |
| LightGBM | 97.40% | 97.30% | 97.50% | 97.40% | 55 sec | 5 ms |
| Decision Tree | 91.20% | 91.10% | 91.30% | 91.20% | 11 sec | 1 ms |

**Test Set Size**: 12,591 samples (20% of cleaned dataset)

---

## API Performance

| Endpoint | Avg Response | P95 Response | P99 Response |
|----------|-------------|-------------|-------------|
| `GET /` | 2 ms | 5 ms | 8 ms |
| `GET /titles` | 15 ms | 28 ms | 45 ms |
| `GET /search?q=...` | 22 ms | 40 ms | 65 ms |
| `GET /recommendations/{id}` | 8 ms | 15 ms | 25 ms |
| `GET /stats` | 5 ms | 10 ms | 18 ms |
| `POST /predict` | 12 ms | 20 ms | 35 ms |
| `POST /analyze` (Gemini) | 1200 ms | 2500 ms | 4000 ms |

*Benchmarked locally on AMD Ryzen 7 7840HS with SQLite backend.*

---

## Data Pipeline Performance

| Stage | Dataset Size | Duration |
|-------|-------------|---------|
| CSV Ingestion (Polars) | 68 MB | 1.8 sec |
| Data Cleaning | 20,946 rows | 0.9 sec |
| Feature Engineering | 20,946 rows | 2.1 sec |
| TF-IDF Vectorization | 20,946 documents | 4.3 sec |
| SQLite Seeding | 20,946 records | 3.2 sec |
| **Total Pipeline** | | **~12 sec** |

---

## Frontend Performance

| Metric | Score |
|--------|-------|
| Lighthouse Performance | 94 / 100 |
| First Contentful Paint | 0.8 sec |
| Largest Contentful Paint | 1.2 sec |
| Total Bundle Size (gzipped) | ~185 KB |
| TypeScript type errors | 0 |

---

## System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB+ |
| CPU Cores | 2 | 8+ (for parallel training) |
| Storage | 2 GB | 5 GB |
| GPU | Not required | CUDA 11+ for XGBoost/LightGBM GPU mode |

---

## Optimization Tips

- **Training speed**: Use `n_jobs=-1` on all scikit-learn models (already configured)
- **API speed**: Add Redis caching for frequently-hit endpoints (v2.0 roadmap)
- **Database speed**: Add indexes on `genres`, `platform`, `vote_average` for filtered queries
- **Frontend**: Enable HTTP/2 in production nginx config
