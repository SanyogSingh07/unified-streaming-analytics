# Changelog

All notable changes to the **Netflix AI Analytics Platform** are documented here.

This project follows [Semantic Versioning](https://semver.org/) and [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions.

---

## [Unreleased]

### Planned
- SHAP-based model explainability visualizations
- JWT authentication on FastAPI
- Real-time streaming analytics with Kafka
- Enterprise Power BI embedded integration

---

## [1.0.0] — 2025-07-02

### 🚀 Production Release

#### Added
- Premium CLI training dashboard with Rich panels, live ASCII plots, and system resource monitoring
- Multi-model ML training pipeline: Random Forest (★ Best — 99.97%), CatBoost, XGBoost, LightGBM, Decision Tree
- FastAPI backend with 12+ REST endpoints: titles, search, recommendations, analytics, health
- React + TypeScript premium dark-theme frontend dashboard with Framer Motion animations
- TF-IDF cosine-similarity recommendation engine across 20,946 cross-platform titles
- Interactive world heatmap with city-level intensity visualization
- Docker + Docker Compose multi-service setup
- GitHub Actions CI/CD pipeline
- Comprehensive documentation suite (17 docs files)
- Full test suite: unit, integration, API, and model tests

#### Changed
- Restructured repository to production-grade folder layout
- Upgraded README to production landing page with badges and screenshots

#### Fixed
- UTF-8 encoding on Windows CLI terminal output
- Import path conflicts between `utils.py` and `model/utils` package

---

## [0.9.0] — 2025-06-15

### MLOps & Training Pipeline

#### Added
- Modular training pipeline: `train.py`, `trainer.py`, `logger.py`, `metrics.py`, `graphs.py`, `progress.py`
- Model persistence to `model/models/random_forest.pkl`
- Automatic evaluation report export to `model/evaluation/ml_results.json`
- plotext ASCII training curves in terminal

---

## [0.8.0] — 2025-06-01

### Frontend Dashboard

#### Added
- React 18 + TypeScript + Vite frontend
- Dark-theme UI with glassmorphism effects
- Interactive trend charts, sentiment bars, genre growth panels
- Framer Motion page transitions and micro-animations
- Sidebar navigation, Header with AI search, live data feed
- TailwindCSS utility-first styling

---

## [0.7.0] — 2025-05-20

### Backend APIs

#### Added
- FastAPI application with lifespan context manager
- `/titles`, `/search`, `/recommendations`, `/analytics`, `/stats`, `/predict` endpoints
- SQLAlchemy ORM with SQLite backend
- CORS middleware for frontend integration
- Swagger UI documentation at `/docs`

---

## [0.5.0] — 2025-05-01

### Machine Learning

#### Added
- Naive Bayes hit probability classifier
- K-Means clustering for content segmentation
- TF-IDF + cosine similarity recommendation engine
- Cross-platform catalog forecasting model
- Scikit-learn pipeline with StandardScaler + PCA

---

## [0.3.0] — 2025-04-15

### Data Engineering

#### Added
- ETL ingestion pipeline for Netflix, Disney+, Amazon Prime CSV datasets
- Unified schema mapping across 3 platforms, 20,946 titles
- Polars-accelerated data cleaning and transformation
- Feature engineering: genre encoding, language normalization, popularity scaling
- SQLite data warehouse with SQLAlchemy models

---

## [0.1.0] — 2025-04-01

### Repository Setup

#### Added
- Initial project structure
- Basic README
- Docker Compose configuration
- .gitignore
