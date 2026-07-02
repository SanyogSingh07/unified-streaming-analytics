# Installation Guide

Complete step-by-step installation instructions for the Netflix AI Analytics Platform.

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|-------------|-----------------|-------|
| Python | 3.11+ | Tested on 3.11 and 3.12 |
| Node.js | 18+ | LTS recommended |
| npm | 9+ | Bundled with Node.js |
| Git | 2.40+ | |
| Docker | 24+ | Optional, for containerized setup |

---

## Method 1: Local Development Setup (Recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/SanyogSingh07/unified-streaming-analytics.git
cd Netflix-AI-Analytics
```

### 2. Python Environment Setup

```bash
# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (Linux/macOS)
source .venv/bin/activate

# Upgrade pip
python -m pip install --upgrade pip

# Install all dependencies
pip install -r requirements/base.txt
pip install -r requirements/ml.txt
pip install -r requirements/api.txt
```

### 3. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your values
# At minimum, set GEMINI_API_KEY for AI search features
```

### 4. Database Seeding

```bash
# Download and seed the database (first time only)
python scripts/seed_db.py
```

### 5. Start the Backend

```bash
cd deployment/backend
uvicorn main:app --reload --port 8000
```

Backend available at: http://localhost:8000
Swagger docs at: http://localhost:8000/docs

### 6. Start the Frontend

```bash
cd deployment/frontend
npm install
npm run dev
```

Frontend available at: http://localhost:3000

---

## Method 2: Docker Setup

```bash
# Build and start all services
docker compose up --build

# Run in background
docker compose up -d

# Stop all services
docker compose down
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

## Method 3: Quick Start Script

### Windows (PowerShell)
```powershell
.\scripts\setup.ps1
```

### Linux / macOS
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

---

## Running the ML Training Pipeline

```bash
# Activate virtual environment first
.venv\Scripts\activate   # Windows

# Run the premium CLI training dashboard
python model/train.py
```

This will:
1. Display the STREAM_OS startup banner
2. Load and preprocess 20,946 titles
3. Train 5 ML models with live progress bars
4. Display real-time accuracy/loss plots
5. Show model comparison benchmark table
6. Save the best model to `model/models/random_forest.pkl`
7. Export evaluation report to `model/evaluation/ml_results.json`

---

## Troubleshooting

See [Troubleshooting.md](Troubleshooting.md) for common issues and solutions.
