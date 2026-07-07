# GitHub Actions & Repository Optimization Root Cause Analysis

This report documents the actual root causes identified, the fixes applied, the files modified, and the validation results for the **Unified Streaming Analytics** repository optimization.

---

## 1. Root Cause Report

The repository structure was recently optimized by consolidating files into dedicated top-level directories (`backend`, `frontend`, `model`, `datasets`, and `deployment`). This change resulted in a series of cascading breaks in import structures, local test suites, formatting/lint configurations, Docker build scripts, and GitHub Actions workflow definitions because paths, environments, and dependencies were still referencing the old directory layout.

---

## 2. Identified Issues & Diagnostics

### Issue 1: Broken Python Imports & Path Search Failure
*   **Symptom**: Local tests and backend scripts could not run or import modules (e.g., `ModuleNotFoundError: No module named 'database'`).
*   **Root Cause**: The Python path structure relied on flat root access which was broken when files were moved into `backend/app/`, `backend/models/`, and `model/preprocessing/`.
*   **Fix**: Appended respective subfolders (`app`, `models`, `model`, and `model/preprocessing`) dynamically to `sys.path` in source and test modules.

### Issue 2: Negative Pagination Binder Crashes in Database
*   **Symptom**: `TestTitlesEndpoints::test_get_titles_invalid_page` failed with a `Binder Error: LIMIT/OFFSET cannot be negative` error in the database.
*   **Root Cause**: In `/titles`, `page` could be negative (e.g., `-1`), causing `offset = (page - 1) * limit` to evaluate to `-40`. DuckDB (unlike some SQLite configurations) rejects negative offsets with a SQL binder error instead of returning empty results.
*   **Fix**: Added FastAPI query parameters validation: `page: int = Query(1, ge=1)` and `limit: int = Query(20, ge=1)` to intercept invalid parameters at the FastAPI layer, returning a `422 Unprocessable Entity` response.

### Issue 3: Stale Pytest Target Path in `pyproject.toml`
*   **Symptom**: `python -m pytest` yielded `no tests ran`.
*   **Root Cause**: Pytest config inside `pyproject.toml` specified `testpaths = ["tests"]`, but the test files had been split and moved to `backend/tests` and `model/tests`.
*   **Fix**: Modified `testpaths` in `pyproject.toml` to `["backend/tests", "model/tests"]`.

### Issue 4: Outdated Docker Contexts & Entrypoints
*   **Symptom**: Docker compose build errors and file mismatch errors.
*   **Root Cause**: Dockerfiles were relocated to `deployment/docker/`, but `docker-compose.yml` build configurations still targeted the old files and incorrect context paths. In addition, the backend Dockerfile startup command executed `uvicorn main:app`, which fails because `main.py` was moved to `backend/app/main.py`.
*   **Fix**: Updated `docker-compose.yml` to specify correct `context` and `dockerfile` keys, and changed `backend.Dockerfile` CMD to load `app.main:app`.

### Issue 5: Broken CI/CD Workflow Search Paths
*   **Symptom**: GitHub Action runs failed on check stages.
*   **Root Cause**: Workflow configurations (`ci.yml`, `tests.yml`, `lint.yml`, `release.yml`, and `pages.yml`) referenced old relative directories (like `deployment/frontend/package-lock.json`, `tests/test_model.py`, and `deployment/backend`).
*   **Fix**: Updated all workflow working directories, file caching targets, seed database commands, and test targets.

---

## 3. Files Modified & Justification

| File Path | Modification Summary | Reason for Modification |
| :--- | :--- | :--- |
| [`backend/app/main.py`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/backend/app/main.py) | Imported `Query`; added `ge=1` constraints on page/limit. | Prevents negative pagination from crashing DuckDB. |
| [`backend/models/models.py`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/backend/models/models.py) | Dynamic `sys.path` append of `backend/app`. | Enables import of `database.Base` in new layout. |
| [`model/config.py`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/model/config.py) | Redirected model and dataset save targets. | Unifies evaluation files and regression models under `model/checkpoints/`. |
| [`pyproject.toml`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/pyproject.toml) | Configured ruff, black, mypy exclusions, and `testpaths`. | Aligns testing and formatting scopes with the root backend, frontend, and model layout. |
| [`docker-compose.yml`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/docker-compose.yml) | Updated context, Dockerfile paths, and ports. | Resolves building and execution in production mode. |
| [`.github/workflows/*`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/.github/workflows/) | Refactored all workflow configurations. | Unifies GitHub CI paths, dependencies, parallel jobs, and lint checks. |
| [`backend/tests/test_api.py`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/backend/tests/test_api.py) | Set paths to `app/`, `models/`, and `training/`. | Resolves FastAPI imports inside backend test suites. |
| [`model/tests/test_pipeline.py`](file:///c:/Users/sanyo/OneDrive/Desktop/Netflix/model/tests/test_pipeline.py) | Updated `ROOT` resolving logic and datasets path. | Resolves raw dataset files search under root `datasets/`. |

---

## 4. Remaining Risks
*   **System Environment Dependencies**: If Kaggle API credentials are changed or expire, the download integration tests will fail. To mitigate this, mock dataset fallback logic has been validated and runs correctly.

---

## 5. Verification Report

### Test Executions
*   **Command**: `python -m pytest -vv`
*   **Status**: Passed
*   **Metrics**: 35 Passed, 1 Skipped (remote download test).

### Frontend Build
*   **Command**: `npm run build` (executed under `frontend/` folder)
*   **Status**: Successfully compiled static Vite bundle under `frontend/dist/`.

### Formatting Check
*   **Command**: `black .` and `ruff check .`
*   **Status**: Complete agreement with configuration targets. All checks passed.
