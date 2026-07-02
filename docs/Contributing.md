# Contributing

> This document is a quick-reference summary. For the full contributing guide, see [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Quick Start

```bash
# 1. Fork on GitHub, then clone
git clone https://github.com/<your-username>/unified-streaming-analytics.git
cd unified-streaming-analytics

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes, then quality-check
black .
ruff check . --fix
pytest tests/ -v

# 4. Commit using conventional commits
git commit -m "feat(scope): describe your change"

# 5. Push and open a PR against develop
git push origin feature/your-feature-name
```

---

## Commit Convention

```
feat(api): add genre filter to /titles endpoint
fix(model): handle null overview in TF-IDF build
docs(readme): update installation steps
test(pipeline): add cleaning stage integration tests
chore(deps): upgrade scikit-learn to 1.5.0
```

---

## Code Standards

| Tool | Purpose | Run |
|------|---------|-----|
| Black | Python formatter | `black .` |
| Ruff | Python linter | `ruff check . --fix` |
| MyPy | Type checker | `mypy deployment/backend/` |
| ESLint | TypeScript linter | `npm run lint` (in `deployment/frontend/`) |

---

## Running Tests

```bash
pytest tests/ -v --cov=. --cov-report=term-missing
```

---

See [CONTRIBUTING.md](../CONTRIBUTING.md) for branching strategy, PR process, and documentation standards.
