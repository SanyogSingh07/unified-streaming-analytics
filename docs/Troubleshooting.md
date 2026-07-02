# Troubleshooting

Common issues and their solutions for the Netflix AI Analytics Platform.

---

## Backend Issues

### `uvicorn: command not found`
```bash
pip install uvicorn
# or run as module:
python -m uvicorn main:app --reload
```

### `ModuleNotFoundError: No module named 'fastapi'`
```bash
pip install -r requirements/api.txt
```

### `sqlite3.OperationalError: no such table: movies`
The database hasn't been seeded yet.
```bash
python scripts/seed_db.py
```

### `RecursionError` in recommendation engine on startup
The TF-IDF matrix build is running on empty data. Ensure `seed_db.py` has been run first.

---

## ML Training Issues

### `UnicodeEncodeError` in CLI on Windows
The rich terminal output uses Unicode characters. Fix:
```python
# Already handled in train.py, but if it persists:
set PYTHONUTF8=1
python model/train.py
```

Or run from Windows Terminal instead of the default Command Prompt.

### `ModuleNotFoundError: No module named 'rich'`
```bash
pip install -r requirements/ml.txt
```

### `Cannot import model.ingestion.load_data`
Ensure you run training from the project root:
```bash
# Correct
python model/train.py

# Wrong
cd model && python train.py
```

### Training is very slow
- Reduce `N_ESTIMATORS` in `model/config.py`
- Use `n_jobs=-1` (already set) to use all CPU cores
- Enable GPU for XGBoost/LightGBM if available

---

## Frontend Issues

### `vite: command not found`
```bash
cd deployment/frontend
npm install
npm run dev
```

### `CORS error` when calling the backend
Ensure both services are running:
- Backend on port 8000
- Frontend on port 3000

The backend has CORS configured for all origins (`*`) in development.

### `TypeError: Cannot read properties of null (reading 'feed')`
The backend API returned an error or is unreachable. Check:
1. Is the backend server running? (`uvicorn main:app --port 8000`)
2. Is the database seeded? (`python scripts/seed_db.py`)

---

## Docker Issues

### `Error response from daemon: port is already allocated`
Another process is using port 8000 or 3000.
```bash
# Find and kill the process
netstat -ano | findstr :8000   # Windows
lsof -i :8000                  # Linux/macOS

# Or change the port in docker-compose.yml
```

### `Build failed: requirements not found`
Ensure you're running `docker compose up` from the project root, not from a subdirectory.

---

## Environment Issues

### `GEMINI_API_KEY not set`
The AI search feature requires a Gemini API key. Get one at https://aistudio.google.com.
Set it in your `.env` file:
```
GEMINI_API_KEY=your_key_here
```

### `.env` file not loading
Ensure `.env` is in the project root (same level as `docker-compose.yml`).

---

## Getting Help

If your issue isn't listed here:
1. Check the [GitHub Issues](https://github.com/SanyogSingh07/unified-streaming-analytics/issues)
2. Open a [Bug Report](https://github.com/SanyogSingh07/unified-streaming-analytics/issues/new?template=bug_report.md)
3. Email: sanyogsingh369@gmail.com
