#!/usr/bin/env bash
# Setup script for Linux/macOS
# Run from the project root: chmod +x scripts/setup.sh && ./scripts/setup.sh

set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${CYAN}======================================================"
echo "  Netflix AI Analytics Platform - Setup"
echo -e "======================================================${NC}"
echo ""

# 1. Create virtual environment
echo -e "${YELLOW}[1/6] Creating Python virtual environment...${NC}"
python3 -m venv .venv

# 2. Activate virtual environment
echo -e "${YELLOW}[2/6] Activating virtual environment...${NC}"
source .venv/bin/activate

# 3. Install Python dependencies
echo -e "${YELLOW}[3/6] Installing Python dependencies...${NC}"
pip install --upgrade pip -q
pip install -r requirements/base.txt -q
pip install -r requirements/api.txt -q
pip install -r requirements/ml.txt -q
pip install -r requirements/dev.txt -q

# 4. Copy .env if not exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}[4/6] Creating .env from template...${NC}"
    cp .env.example .env
    echo -e "      ⚠️  Edit .env and set GEMINI_API_KEY"
else
    echo "[4/6] .env already exists, skipping."
fi

# 5. Seed database
echo -e "${YELLOW}[5/6] Seeding the database...${NC}"
python scripts/seed_db.py || echo "WARNING: DB seeding failed — run manually"

# 6. Install frontend
echo -e "${YELLOW}[6/6] Installing frontend dependencies...${NC}"
cd deployment/frontend && npm install --silent && cd ../..

echo ""
echo -e "${GREEN}======================================================"
echo "  ✅ Setup Complete!"
echo -e "======================================================${NC}"
echo ""
echo "Next steps:"
echo "  1. source .venv/bin/activate"
echo "  2. cd deployment/backend && uvicorn main:app --reload"
echo "  3. cd deployment/frontend && npm run dev"
echo "  4. python model/train.py"
echo ""
