# Contributing to Netflix AI Analytics Platform

Thank you for considering contributing! This project welcomes all contributions — bug fixes, new features, documentation improvements, and tests.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Branching Strategy](#branching-strategy)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Quality Standards](#code-quality-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Netflix-AI-Analytics.git
   cd Netflix-AI-Analytics
   ```
3. **Add upstream** remote:
   ```bash
   git remote add upstream https://github.com/SanyogSingh07/unified-streaming-analytics.git
   ```

---

## Development Setup

### Python Backend & ML

```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Linux/macOS

# Install all dependencies
pip install -r requirements/dev.txt
pip install -r requirements/ml.txt
pip install -r requirements/api.txt

# Install pre-commit hooks
pre-commit install
```

### Frontend

```bash
cd deployment/frontend
npm install
npm run dev
```

---

## Branching Strategy

We follow **GitHub Flow**:

| Branch Pattern        | Purpose                          |
|-----------------------|----------------------------------|
| `main`                | Production-ready code only       |
| `develop`             | Integration branch for features  |
| `feature/<name>`      | New features                     |
| `fix/<name>`          | Bug fixes                        |
| `docs/<name>`         | Documentation changes            |
| `chore/<name>`        | Tooling, CI, dependencies        |
| `release/v<version>`  | Release preparation              |

---

## Commit Conventions

We use **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | When to Use                                    |
|------------|------------------------------------------------|
| `feat`     | New feature                                    |
| `fix`      | Bug fix                                        |
| `docs`     | Documentation only                             |
| `style`    | Formatting, no logic change                    |
| `refactor` | Code restructuring, no feature/fix             |
| `test`     | Adding or updating tests                       |
| `chore`    | Build system, CI, tooling                      |
| `perf`     | Performance improvement                        |
| `ci`       | CI/CD configuration changes                    |

### Examples

```bash
feat(model): add SHAP explainability for Random Forest
fix(api): handle empty recommendation results gracefully
docs(readme): add architecture diagram to README
test(model): add accuracy regression test for Random Forest
chore(deps): upgrade scikit-learn to 1.5.0
```

---

## Pull Request Process

1. Ensure your branch is up to date with `develop`:
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```
2. Run the full quality check:
   ```bash
   ruff check .
   black --check .
   pytest tests/ --cov=. --cov-report=term
   ```
3. Open a PR against `develop` (not `main`)
4. Fill in the PR template completely
5. Request review from at least one maintainer
6. Ensure all CI checks pass

---

## Code Quality Standards

### Python

- **Formatter**: `black` (line-length = 88)
- **Linter**: `ruff` (pyflakes + pycodestyle + isort)
- **Type Checker**: `mypy` (strict mode for new modules)

Run locally:
```bash
black .
ruff check . --fix
mypy deployment/backend/ model/
```

### TypeScript / JavaScript

- **Formatter**: Prettier
- **Linter**: ESLint

```bash
cd deployment/frontend
npm run lint
```

---

## Testing Requirements

- All new features must include tests
- Minimum 80% coverage for new modules
- Run the full test suite before submitting:

```bash
pytest tests/ -v --cov=. --cov-report=html
```

Test categories:
- `tests/test_api.py` — FastAPI endpoint tests
- `tests/test_model.py` — ML model accuracy and output shape
- `tests/test_pipeline.py` — Data pipeline integration
- `tests/test_recommendations.py` — Recommendation engine

---

## Documentation Standards

Every new module or feature must include:

- **Docstrings** for all public functions (Google style)
- **Type annotations** for all function signatures
- **Usage example** in the docstring or a corresponding `docs/` update

```python
def load_raw_data(path: str) -> pd.DataFrame:
    """Load raw CSV dataset from disk.

    Args:
        path: Absolute path to the CSV file.

    Returns:
        DataFrame with raw, unprocessed rows.

    Raises:
        FileNotFoundError: If the path does not exist.

    Example:
        >>> df = load_raw_data("model/datasets/mymoviedb.csv")
        >>> df.shape
        (20946, 15)
    """
```

---

## Questions?

Open a [Discussion](https://github.com/SanyogSingh07/unified-streaming-analytics/discussions) or email sanyogsingh369@gmail.com.
