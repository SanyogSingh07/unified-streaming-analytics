# Project Structure

Annotated directory tree for the Netflix AI Analytics Platform.

```
Netflix-AI-Analytics/
│
├── .github/                        # GitHub configuration
│   ├── workflows/
│   │   ├── ci.yml                  # Build & test (Python + frontend + Docker)
│   │   ├── lint.yml                # Ruff, Black, MyPy, ESLint
│   │   ├── tests.yml               # pytest + Codecov coverage
│   │   ├── deploy.yml              # Docker → GitHub Container Registry
│   │   └── release.yml             # Auto-release on version tags
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── FUNDING.yml
│
├── assets/
│   ├── banners/                    # Repository banner image
│   ├── screenshots/                # Dashboard, CLI screenshots
│   ├── architecture/               # Architecture diagrams
│   ├── cli/                        # CLI demo assets
│   ├── dashboard/                  # Dashboard screenshots
│   ├── logos/                      # Project logos
│   └── icons/                      # Technology icons
│
├── data/
│   ├── raw/                        # Original unmodified source files
│   ├── cleaned/                    # Post-cleaning CSVs
│   ├── processed/                  # Feature-engineered datasets
│   ├── external/                   # Third-party reference data
│   └── sample/                     # Small sample datasets for testing
│
├── deployment/
│   ├── backend/
│   │   ├── main.py                 # FastAPI app (12+ endpoints)
│   │   ├── database.py             # SQLAlchemy engine & session
│   │   ├── models.py               # ORM Movie schema
│   │   ├── recommendation.py       # TF-IDF cosine similarity engine
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── App.tsx             # Root component & state management
│   │   │   ├── components/
│   │   │   │   ├── DashboardView.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── BackgroundShader.tsx
│   │   │   ├── types.ts
│   │   │   └── index.css
│   │   ├── server.ts               # Express + Vite + Gemini API server
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── docker/                     # Shared Docker configurations
│   └── docker-compose.yml
│
├── docs/                           # 17 documentation files
│   ├── Architecture.md
│   ├── Installation.md
│   ├── ProjectStructure.md         ← this file
│   ├── Dataset.md
│   ├── DataPipeline.md
│   ├── FeatureEngineering.md
│   ├── ModelTraining.md
│   ├── ModelEvaluation.md
│   ├── API.md
│   ├── Backend.md
│   ├── Frontend.md
│   ├── Tableau.md
│   ├── Deployment.md
│   ├── Docker.md
│   ├── Performance.md
│   ├── Troubleshooting.md
│   ├── FAQ.md
│   └── Contributing.md
│
├── model/
│   ├── train.py                    # CLI training entry point
│   ├── trainer.py                  # Rich live training loop
│   ├── config.py                   # Centralized hyperparameters & paths
│   ├── metrics.py                  # Accuracy / precision / recall / F1
│   ├── logger.py                   # Session log recording
│   ├── graphs.py                   # ASCII training curve generation
│   ├── progress.py                 # Rich progress bar utilities
│   ├── sys_utils.py                # CPU / RAM / GPU monitoring
│   ├── run_pipeline.py             # Full ETL + training pipeline runner
│   │
│   ├── ingestion/
│   │   └── load_data.py            # Polars CSV loader
│   ├── cleaning/
│   │   └── clean_data.py           # Null handling, deduplication, normalization
│   ├── feature_engineering/
│   │   └── build_features.py       # Encoding, scaling, label creation
│   ├── training/
│   │   ├── train_model.py          # Scikit-learn model training
│   │   └── recommendation.py       # TF-IDF recommendation matrix
│   │
│   ├── evaluation/
│   │   └── ml_results.json         # Latest training evaluation metrics
│   ├── models/
│   │   └── random_forest.pkl       # Saved best model (Random Forest)
│   ├── datasets/
│   │   ├── mymoviedb.csv           # Netflix (TMDB-sourced)
│   │   ├── disney_plus_titles.csv  # Disney+
│   │   ├── amazon_prime_titles.csv # Amazon Prime
│   │   └── cleaned_dataset.csv     # Post-cleaning unified dataset
│   └── logs/                       # Training session logs
│
├── notebooks/
│   └── eda_and_ml.ipynb            # EDA & ML experimentation notebook
│
├── requirements/
│   ├── base.txt                    # Core runtime dependencies
│   ├── ml.txt                      # ML packages (sklearn, xgboost, etc.)
│   ├── api.txt                     # FastAPI + uvicorn + sqlalchemy
│   └── dev.txt                     # Testing + code quality tools
│
├── scripts/
│   ├── setup.ps1                   # Windows one-command setup
│   ├── setup.sh                    # Linux/macOS one-command setup
│   └── seed_db.py                  # Database seeder
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py                 # Shared fixtures
│   ├── test_api.py                 # FastAPI endpoint tests
│   ├── test_model.py               # ML model regression tests
│   ├── test_pipeline.py            # Data pipeline integration tests
│   └── test_recommendations.py    # TF-IDF recommendation tests
│
├── README.md                       # Production landing page
├── CHANGELOG.md                    # Versioned change history
├── CONTRIBUTING.md                 # Contribution guide
├── ROADMAP.md                      # Feature roadmap
├── SECURITY.md                     # Vulnerability reporting
├── CODE_OF_CONDUCT.md
├── LICENSE                         # MIT License
├── .env.example                    # Environment variable template
├── pyproject.toml                  # ruff + black + mypy + pytest config
├── .pre-commit-config.yaml         # Pre-commit hooks
├── .gitignore
└── docker-compose.yml
```
