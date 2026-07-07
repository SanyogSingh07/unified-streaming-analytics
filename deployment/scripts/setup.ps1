# Setup script for Windows PowerShell
# Run from the project root: .\scripts\setup.ps1

param(
    [switch]$SkipFrontend,
    [switch]$SkipML
)

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Netflix AI Analytics Platform - Setup" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Create and activate virtual environment
Write-Host "[1/6] Creating Python virtual environment..." -ForegroundColor Yellow
python -m venv .venv
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: Failed to create venv. Ensure Python 3.11+ is installed." -ForegroundColor Red; exit 1 }

# 2. Activate venv
Write-Host "[2/6] Activating virtual environment..." -ForegroundColor Yellow
& .\.venv\Scripts\Activate.ps1

# 3. Install Python dependencies
Write-Host "[3/6] Installing Python dependencies..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet
pip install -r requirements/base.txt --quiet
pip install -r requirements/api.txt --quiet

if (-not $SkipML) {
    Write-Host "      Installing ML dependencies (this may take a few minutes)..." -ForegroundColor Gray
    pip install -r requirements/ml.txt --quiet
}

pip install -r requirements/dev.txt --quiet

# 4. Copy .env if not exists
if (-not (Test-Path ".env")) {
    Write-Host "[4/6] Creating .env from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "      ⚠️  Edit .env and set GEMINI_API_KEY before running the app." -ForegroundColor Magenta
} else {
    Write-Host "[4/6] .env already exists, skipping." -ForegroundColor Gray
}

# 5. Seed the database
Write-Host "[5/6] Seeding the database..." -ForegroundColor Yellow
python scripts/seed_db.py
if ($LASTEXITCODE -ne 0) { Write-Host "WARNING: Database seeding failed. Run manually: python scripts/seed_db.py" -ForegroundColor Yellow }

# 6. Install frontend dependencies
if (-not $SkipFrontend) {
    Write-Host "[6/6] Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location deployment/frontend
    npm install --silent
    Set-Location ../..
} else {
    Write-Host "[6/6] Skipping frontend (--SkipFrontend flag set)." -ForegroundColor Gray
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Activate venv:   .\.venv\Scripts\Activate.ps1"
Write-Host "  2. Start backend:   cd deployment/backend && uvicorn main:app --reload"
Write-Host "  3. Start frontend:  cd deployment/frontend && npm run dev"
Write-Host "  4. Train models:    python model/train.py"
Write-Host ""
