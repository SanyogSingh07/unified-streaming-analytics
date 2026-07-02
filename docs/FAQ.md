# FAQ — Frequently Asked Questions

---

## General

### What is the Netflix AI Analytics Platform?

An end-to-end data engineering and machine learning platform that aggregates streaming catalog data from Netflix, Disney+, and Amazon Prime, trains ML models for content hit prediction, and serves analytics through an interactive web dashboard and premium CLI interface.

### Is this a real Netflix product?

No. This is a portfolio project that uses publicly available datasets. It is not affiliated with Netflix, Disney, or Amazon.

### What datasets are used?

- **Netflix**: TMDB-sourced CSV (~9,234 titles)
- **Disney+**: Kaggle dataset (~1,450 titles)
- **Amazon Prime**: Kaggle dataset (~9,850 titles)

Total: 20,946 unified titles. See [Dataset.md](Dataset.md).

---

## Machine Learning

### What accuracy does the best model achieve?

Random Forest achieves **99.97% accuracy** on the test set (12,591 samples). See [Performance.md](Performance.md) and [ModelTraining.md](ModelTraining.md).

### Why is the accuracy so high?

The dataset has a natural class imbalance (hits vs. non-hits), and the features (popularity, vote_average, vote_count) are strong predictors of content quality. Random Forest is well-suited for this structured data.

### Can I train with my own data?

Yes. Replace the CSVs in `model/datasets/` with your own data, ensuring the schema matches, then run `python model/train.py`.

### What does "hit prediction" mean?

A "hit" is a content item with above-median engagement metrics (popularity + vote_average). The model predicts whether new content is likely to achieve high engagement.

---

## Installation

### Do I need a GPU?

No. Training runs on CPU with `n_jobs=-1` (all cores). GPU acceleration is optional for XGBoost/LightGBM on CUDA-enabled systems.

### Why does training take a few minutes?

Training 5 models (Random Forest n=200, XGBoost, CatBoost, LightGBM, Decision Tree) on ~50,000 feature-engineered rows takes 2–5 minutes on a modern CPU. This is normal.

### Can I run without Docker?

Yes. See [Installation.md](Installation.md) for the local development setup.

---

## Backend & API

### What database is used?

SQLite in development (zero-configuration). PostgreSQL is on the roadmap for production (v2.0).

### Is there authentication on the API?

Not currently. JWT authentication is planned for v1.3.0. See [ROADMAP.md](../ROADMAP.md).

### Where are the API docs?

Visit http://localhost:8000/docs for the interactive Swagger UI when the backend is running.

---

## Frontend

### What AI features does the dashboard have?

The search bar uses the **Google Gemini API** to perform AI-powered analysis of movie titles, returning structured dashboard data including genre trends, sentiment scores, and box office correlations.

### Why does search sometimes return generic results?

If the Gemini API key is not set or the API is unavailable, the app falls back to a preset dataset. Set `GEMINI_API_KEY` in your `.env` file for full AI analysis.

---

## Contributing

### How do I contribute?

Read [CONTRIBUTING.md](../CONTRIBUTING.md) for the full guide. Open a [Feature Request](https://github.com/SanyogSingh07/unified-streaming-analytics/issues/new?template=feature_request.md) or submit a Pull Request.

### What code style is used?

Python: **Black** (formatter) + **Ruff** (linter). TypeScript: **Prettier** + **ESLint**. See [pyproject.toml](../pyproject.toml).
