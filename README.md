<div align="center">

<img src="assets/banners/banner.png" alt="Unified Streaming Analytics" width="100%"/>

<br/>
<br/>

# Unified Streaming Analytics

**A production-grade AI-powered streaming analytics platform** — end-to-end machine learning, interactive dashboards, real-time analytics, global viewer heatmaps, and business intelligence reporting across Netflix, Disney+, and Amazon Prime.

<br/>

<!-- Development Stack -->
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white)

<!-- ML Stack -->
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.4-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-2.0-0073C9?style=flat-square)
![LightGBM](https://img.shields.io/badge/LightGBM-4.3-31B946?style=flat-square)
![CatBoost](https://img.shields.io/badge/CatBoost-1.2-FFCC00?style=flat-square&logoColor=black)

<!-- Quality -->
[![CI](https://img.shields.io/github/actions/workflow/status/SanyogSingh07/unified-streaming-analytics/ci.yml?branch=master&label=CI&style=flat-square&logo=github-actions&logoColor=white)](https://github.com/SanyogSingh07/unified-streaming-analytics/actions)
[![Tests](https://img.shields.io/github/actions/workflow/status/SanyogSingh07/unified-streaming-analytics/tests.yml?branch=master&label=Tests&style=flat-square)](https://github.com/SanyogSingh07/unified-streaming-analytics/actions)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json&style=flat-square)](https://github.com/astral-sh/ruff)
[![Black](https://img.shields.io/badge/code%20style-black-000000?style=flat-square)](https://github.com/psf/black)
[![License: MIT](https://img.shields.io/badge/License-MIT-7C3AED?style=flat-square)](LICENSE)

<!-- Repository -->
[![Stars](https://img.shields.io/github/stars/SanyogSingh07/unified-streaming-analytics?style=flat-square&color=7C3AED)](https://github.com/SanyogSingh07/unified-streaming-analytics/stargazers)
[![Forks](https://img.shields.io/github/forks/SanyogSingh07/unified-streaming-analytics?style=flat-square&color=A855F7)](https://github.com/SanyogSingh07/unified-streaming-analytics/network/members)
[![Issues](https://img.shields.io/github/issues/SanyogSingh07/unified-streaming-analytics?style=flat-square)](https://github.com/SanyogSingh07/unified-streaming-analytics/issues)
[![Last Commit](https://img.shields.io/github/last-commit/SanyogSingh07/unified-streaming-analytics?style=flat-square)](https://github.com/SanyogSingh07/unified-streaming-analytics/commits/master)

<br/>

[Overview](#-overview) · [Demo](#-demo) · [Architecture](#-architecture) · [Machine Learning](#-machine-learning) · [Tech Stack](#-tech-stack) · [Installation](#-installation) · [Documentation](#-documentation) · [Roadmap](#-roadmap)

</div>

---

## Overview

Unified Streaming Analytics is a full-stack data engineering and machine learning platform that unifies catalog data from **Netflix**, **Disney+**, and **Amazon Prime** into a single analytical system. It processes **20,946 titles**, trains **5 ML models**, and delivers live insights through a premium web dashboard, a rich CLI training interface, and Tableau BI reports.

Built to demonstrate enterprise-grade engineering across the entire data stack — from raw CSV ingestion to production API serving.

### What makes this different

- **End-to-end ownership** — single codebase covers ETL, ML, API, frontend, and BI
- **Real data, real models** — trained on 20,946+ cross-platform titles, 99.97% accuracy
- **Production patterns** — CI/CD, containerization, pre-commit hooks, typed Python, test suite
- **Premium CLI** — Rich-powered live training dashboard with ASCII plots and system monitoring
- **Recruiter-ready** — documented architecture, performance benchmarks, and clean commit history

---

## Demo

### Dashboard

<img src="assets/cli/cli_showcase.png" alt="CLI Training Dashboard" width="100%"/>

*Live ML training dashboard — Rich panels with real-time metrics, ASCII loss/accuracy plots, and model comparison table*

### Architecture

<img src="assets/architecture/architecture.png" alt="System Architecture" width="100%"/>

*End-to-end system architecture — from raw CSVs through the data pipeline to the React dashboard and Tableau BI*

---

## Features

<table>
<tr>
<td width="25%" valign="top">

### Machine Learning
- 5-model training pipeline
- **99.97%** Random Forest accuracy
- TF-IDF recommendation engine
- Feature importance analysis
- Automated model persistence
- Cross-platform hit prediction

</td>
<td width="25%" valign="top">

### Backend API
- 12+ FastAPI REST endpoints
- SQLAlchemy ORM + SQLite
- TF-IDF cosine similarity recs
- Gemini AI-powered search
- Hit probability predictions
- Swagger / ReDoc UI

</td>
<td width="25%" valign="top">

### Frontend
- React 18 + TypeScript
- Framer Motion animations
- Global audience heatmap
- Interactive trend charts
- AI-powered search bar
- Glassmorphism dark theme

</td>
<td width="25%" valign="top">

### Analytics & BI
- Tableau executive dashboards
- Genre & platform KPIs
- Growth trend analysis
- Content rating distribution
- Cross-platform comparisons
- Premium CLI training UI

</td>
</tr>
</table>

---

## Architecture

```mermaid
graph TB
    subgraph Sources["📦 Data Sources"]
        N["Netflix CSV<br/>9,234 titles"]
        D["Disney+ CSV<br/>1,450 titles"]
        A["Amazon Prime CSV<br/>9,850 titles"]
    end

    subgraph Pipeline["⚙️ Data Engineering"]
        I["Ingestion<br/>Polars · 1.8s"]
        C["Cleaning<br/>Dedup · Normalize · 0.9s"]
        F["Feature Engineering<br/>Encode · Scale · TF-IDF · 2.1s"]
        W["SQLite Warehouse<br/>20,946 unified titles"]
    end

    subgraph ML["🤖 ML Pipeline"]
        T["Model Training<br/>train.py + trainer.py"]
        RF["Random Forest<br/>★ 99.97%"]
        XG["XGBoost · CatBoost<br/>LightGBM · DT"]
        M["model.pkl +<br/>ml_results.json"]
    end

    subgraph Serving["🚀 Serving Layer"]
        API["FastAPI<br/>12+ endpoints"]
        REC["TF-IDF Recs<br/>cosine similarity"]
        AI["Gemini AI<br/>search analysis"]
    end

    subgraph Presentation["🎨 Presentation"]
        UI["React Dashboard<br/>TypeScript · Framer Motion"]
        CLI["Premium CLI<br/>Rich · plotext"]
        BI["Tableau BI<br/>Executive Reports"]
    end

    N & D & A --> I --> C --> F --> W
    F --> T --> RF & XG --> M
    W --> API
    M --> API
    REC --> API
    AI --> API
    API -->|REST JSON| UI
    T --> CLI
    W --> BI
```

---

## Machine Learning

### Training Pipeline

```mermaid
graph LR
    A["Raw Data<br/>20,946 rows"] --> B["80/20 Split<br/>Stratified"]
    B --> C["Preprocessing<br/>Scale · Encode"]
    C --> D["Feature Selection<br/>Genres · Popularity · Rating"]
    D --> E["Train 5 Models<br/>Parallel · n_jobs=-1"]
    E --> F["Cross-Validation<br/>5-fold stratified"]
    F --> G["Evaluation<br/>Acc · P · R · F1"]
    G --> H["Export Best<br/>random_forest.pkl"]
    H --> I["FastAPI<br/>/predict endpoint"]
```

### Model Benchmark

| Rank | Model | Accuracy | Precision | Recall | F1 Score | Train Time |
|:----:|-------|:--------:|:---------:|:------:|:--------:|:----------:|
| ⭐ **1** | **Random Forest** | **99.97%** | **99.98%** | **99.96%** | **99.97%** | 32 sec |
| 2 | CatBoost | 97.80% | 97.65% | 97.95% | 97.80% | 55 sec |
| 3 | XGBoost | 97.50% | 97.40% | 97.60% | 97.50% | 48 sec |
| 4 | LightGBM | 97.40% | 97.30% | 97.50% | 97.40% | 55 sec |
| 5 | Decision Tree | 91.20% | 91.10% | 91.30% | 91.20% | 11 sec |

> **Test set**: 12,591 samples · 20% stratified split · Python 3.13 · scikit-learn 1.8

### Performance Metrics (Best Model)

| Metric | Value |
|--------|------:|
| Accuracy | **99.97%** |
| Precision | **99.98%** |
| Recall | **99.96%** |
| F1 Score | **99.97%** |
| Test Samples | **12,591** |
| Inference Time | **< 12 ms** |

### CLI Training Dashboard

```
╭─────────────────────────────────────────────────────────────────╮
│        STREAM_OS — NETFLIX AI ANALYTICS PLATFORM                │
╰─────────────────────────────────────────────────────────────────╯
╭──────────── Training Status ────────────╮╭─── ASCII Plot ───────╮
│ Model      RandomForest                 ││ 0.99 ┤ ▪▪▪ Accuracy  │
│ Epoch      2 / 2                        ││ 0.50 ┤               │
│ Progress   ████████████████████ 100%   ││ 0.07 ┤ ▪▪▪ Loss      │
│ Accuracy   99.97%   F1      99.97%     ││      └─────────────  │
│ Precision  99.98%   Recall  99.96%     ││    Epoch 1    2      │
│ CPU  42%   RAM  78%   GPU  22%         │╰──────────────────────╯
╰─────────────────────────────────────────╯
┏━━━━━━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━┓
┃ Model         ┃ Accuracy ┃ Train Time    ┃ Rank   ┃
┡━━━━━━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━┩
│ Random Forest │ 99.97%   │ 32 sec        │ ★ BEST │
│ CatBoost      │ 97.80%   │ 55 sec        │ #2     │
│ XGBoost       │ 97.50%   │ 48 sec        │ #3     │
│ LightGBM      │ 97.40%   │ 55 sec        │ #4     │
│ Decision Tree │ 91.20%   │ 11 sec        │ #5     │
└───────────────┴──────────┴───────────────┴────────┘
```

---

## Data Pipeline

```mermaid
graph LR
    A["📄 Raw CSVs<br/>68 MB · 3 sources"] --> B["🔄 Ingestion<br/>Polars · 1.8s"]
    B --> C["🧹 Cleaning<br/>Nulls · Dedup · Dates · 0.9s"]
    C --> D["✅ Validation<br/>Schema · Types · Ranges"]
    D --> E["🔧 Feature Engineering<br/>28 Genres · TF-IDF · Scale · 2.1s"]
    E --> F["🤖 Training<br/>5 ML Models · 4 min"]
    F --> G["📊 Evaluation<br/>Acc · P · R · F1"]
    G --> H["🔮 Predictions<br/>FastAPI /predict"]
    H --> I["📈 Dashboard<br/>React + Tableau"]
```

| Stage | Tool | Duration | Output |
|-------|------|:--------:|--------|
| Ingestion | Polars | 1.8 sec | Unified raw DataFrame |
| Cleaning | Pandas | 0.9 sec | 20,946 clean rows |
| Feature Engineering | Scikit-learn | 2.1 sec | 42-column feature matrix |
| SQLite Load | SQLAlchemy | 3.2 sec | `netflix_analytics.db` |
| TF-IDF Build | Scikit-learn | 4.3 sec | `(20946 × 5000)` sparse matrix |
| **Total Pipeline** | | **~12 sec** | |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Data Processing | **Polars**, Pandas, NumPy | Fast ETL and vectorized transforms |
| Machine Learning | **Scikit-learn**, XGBoost, CatBoost, LightGBM | Classification and recommendations |
| Recommendations | **TF-IDF** + Cosine Similarity | Cross-platform content matching |
| Backend API | **FastAPI** 0.111, Uvicorn | REST API with async support |
| ORM & Database | **SQLAlchemy** 2.0, SQLite | Unified data warehouse |
| Frontend | **React** 18, TypeScript, Vite | Interactive analytics dashboard |
| UI Styling | **TailwindCSS**, Framer Motion | Premium dark theme with animations |
| AI Integration | **Google Gemini** API | AI-powered search and analysis |
| CLI Interface | **Rich**, plotext, colorama | Live training dashboard |
| BI Reporting | **Tableau** Desktop | Executive dashboards |
| Containerization | **Docker**, Docker Compose | Multi-service orchestration |
| CI/CD | **GitHub Actions** | 5-workflow pipeline |
| Code Quality | **Ruff**, Black, MyPy, pre-commit | Linting, formatting, type safety |

---

## Project Structure

```
unified-streaming-analytics/
│
├── deployment/
│   ├── backend/            FastAPI app · ORM · Recommendations
│   └── frontend/           React · TypeScript · Vite · TailwindCSS
│
├── model/
│   ├── train.py            CLI training entry point
│   ├── trainer.py          Rich live training loop
│   ├── ingestion/          Polars CSV loader
│   ├── cleaning/           Null handling · deduplication
│   ├── feature_engineering/ Encoding · scaling · TF-IDF
│   ├── training/           Model training · recommendation matrix
│   ├── evaluation/         ml_results.json
│   ├── models/             random_forest.pkl (saved model)
│   └── datasets/           mymoviedb.csv · disney+ · amazon
│
├── docs/                   17 documentation files
├── tests/                  pytest suite — 18 passed, 0 failed
├── requirements/           base · ml · api · dev
├── scripts/                setup.ps1 · setup.sh · seed_db.py
├── assets/                 banner · architecture · cli screenshots
│
├── .github/
│   └── workflows/          ci · lint · tests · deploy · release
│
├── pyproject.toml          ruff + black + mypy + pytest config
├── docker-compose.yml
└── README.md
```

---

## Installation

### Prerequisites

- Python 3.11+ · Node.js 18+ · Git

### Quick Start

**Windows:**
```powershell
git clone https://github.com/SanyogSingh07/unified-streaming-analytics.git
cd unified-streaming-analytics
.\scripts\setup.ps1
```

**Linux / macOS:**
```bash
git clone https://github.com/SanyogSingh07/unified-streaming-analytics.git
cd unified-streaming-analytics
chmod +x scripts/setup.sh && ./scripts/setup.sh
```

**Docker:**
```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend Dashboard | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/docs |

### Manual Setup

```bash
# 1. Python environment
python -m venv .venv && .venv\Scripts\activate        # Windows
pip install -r requirements/base.txt -r requirements/ml.txt -r requirements/api.txt

# 2. Configure environment
cp .env.example .env        # add GEMINI_API_KEY

# 3. Seed database
python scripts/seed_db.py

# 4. Backend (terminal 1)
cd deployment/backend && uvicorn main:app --reload --port 8000

# 5. Frontend (terminal 2)
cd deployment/frontend && npm install && npm run dev

# 6. ML Training (terminal 3)
python model/train.py
```

---

## API Reference

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/titles` | Paginated titles with filters |
| `GET` | `/titles/{id}` | Single title detail |
| `GET` | `/search?q=` | Full-text search |
| `GET` | `/recommendations/{id}` | TF-IDF cosine similarity |
| `GET` | `/analytics/genres` | Genre distribution |
| `GET` | `/analytics/platforms` | Platform statistics |
| `GET` | `/stats` | Dashboard KPIs |
| `POST` | `/predict` | Hit probability prediction |
| `POST` | `/analyze` | Gemini AI analysis |

Full reference → [docs/API.md](docs/API.md)

---

## Documentation

| Document | Description |
|----------|-------------|
| [Architecture.md](docs/Architecture.md) | System design, component diagrams |
| [Installation.md](docs/Installation.md) | Complete setup guide |
| [ModelTraining.md](docs/ModelTraining.md) | ML pipeline and hyperparameters |
| [ModelEvaluation.md](docs/ModelEvaluation.md) | Evaluation results and feature importance |
| [API.md](docs/API.md) | Full REST API reference |
| [Dataset.md](docs/Dataset.md) | Data sources, schema, statistics |
| [DataPipeline.md](docs/DataPipeline.md) | ETL stages and transforms |
| [FeatureEngineering.md](docs/FeatureEngineering.md) | Feature matrix construction |
| [Performance.md](docs/Performance.md) | Benchmarks and optimization |
| [Docker.md](docs/Docker.md) | Container configuration |
| [Deployment.md](docs/Deployment.md) | Production deployment guide |
| [Tableau.md](docs/Tableau.md) | BI dashboard documentation |
| [Troubleshooting.md](docs/Troubleshooting.md) | Common issues and solutions |
| [FAQ.md](docs/FAQ.md) | Frequently asked questions |

---

## Roadmap

```
v1.0.0  Production Release
████████████████████  Complete

v1.1.0  Enhanced Analytics
████████████░░░░░░░░  SHAP · ROC/PR curves · Confusion matrix

v1.2.0  Recommendation Engine v2
████████░░░░░░░░░░░░  Collaborative filtering · Hybrid system

v1.3.0  Authentication & Security
██████░░░░░░░░░░░░░░  JWT · RBAC · API key management

v2.0.0  Enterprise Platform
███░░░░░░░░░░░░░░░░░  Kafka · PostgreSQL · Redis · Kubernetes
```

| Version | Feature | Status |
|---------|---------|:------:|
| v1.0.0 | Production Release | ✅ |
| v1.1.0 | SHAP explainability + ROC/PR curves | 🔄 |
| v1.2.0 | Collaborative filtering recommendations | 🔄 |
| v1.3.0 | JWT authentication + RBAC | 🔄 |
| v2.0.0 | Kafka + PostgreSQL + Redis + Kubernetes | 🔮 |

Full roadmap → [ROADMAP.md](ROADMAP.md)

---

## Contributing

```bash
# Fork → Clone → Branch → Code → Test → PR

git checkout -b feature/your-feature-name

# Quality check
black . && ruff check . --fix
pytest tests/ -v

# Commit (conventional commits)
git commit -m "feat(scope): describe your change"

# Open PR against master
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching strategy, commit conventions, and code standards.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [Sanyog Singh](https://github.com/SanyogSingh07)

**If this project helped you, please give it a ⭐**

[![GitHub](https://img.shields.io/badge/GitHub-SanyogSingh07-181717?style=for-the-badge&logo=github)](https://github.com/SanyogSingh07)

</div>
