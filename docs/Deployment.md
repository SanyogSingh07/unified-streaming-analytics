# Deployment

Production deployment guide for the Netflix AI Analytics Platform.

---

## Option 1: Docker Compose (Recommended)

The simplest way to deploy both services:

```bash
# Clone
git clone https://github.com/SanyogSingh07/unified-streaming-analytics.git
cd unified-streaming-analytics

# Configure
cp .env.example .env  # Add GEMINI_API_KEY

# Deploy
docker compose up -d --build

# Verify
curl http://localhost:8000/
```

Services:
- Frontend → http://localhost:3000
- Backend → http://localhost:8000

---

## Option 2: Manual Deployment

### Backend

```bash
cd deployment/backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export DATABASE_URL=sqlite:///./netflix_analytics.db
export PORT=8000

# Start production server
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend

```bash
cd deployment/frontend

# Build production bundle
npm ci
npm run build

# Serve with Node.js
node server.js
```

---

## Option 3: GitHub Container Registry

Images are automatically built and pushed to `ghcr.io` on every merge to `main` via the [deploy.yml](.github/workflows/deploy.yml) workflow.

Pull and run:

```bash
docker pull ghcr.io/sanyogsingh07/unified-streaming-analytics/backend:main
docker pull ghcr.io/sanyogsingh07/unified-streaming-analytics/frontend:main

docker compose -f docker-compose.prod.yml up -d
```

---

## Environment Variables for Production

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini AI API key |
| `DATABASE_URL` | ✅ Yes | Database connection string |
| `NODE_ENV` | ✅ Yes | Set to `production` |
| `JWT_SECRET_KEY` | Recommended | For future auth (v1.3.0) |

---

## Health Checks

```bash
# Backend health
curl http://localhost:8000/

# Frontend
curl http://localhost:3000/
```

---

## Cloud Deployment (Roadmap v2.0)

| Platform | Status |
|----------|--------|
| AWS ECS / Fargate | 🔄 Planned |
| Google Cloud Run | 🔄 Planned |
| Azure Container Apps | 🔄 Planned |
| Kubernetes / Helm | 🔄 Planned |

---

## Post-Deployment Production Setup & Git Workflow

This project follows an enterprise-grade deployment and delivery model utilizing Vercel and GitHub Actions.

### 1. Git Branching Strategy

Our release process is designed to isolate unstable work and guarantee production stability:

- **`master` (Production)**: Holds the current stable production-ready release. Direct commits are restricted. All features and fixes are merged here via Pull Requests.
- **`develop` (Development)**: Integration branch for active features.
- **`feature/*`**: Feature development branches.
- **`bugfix/*` / `hotfix/*`**: Target branches for resolving issues.

```text
feature/new-feature ─► Preview Deployment ─► PR ─► Merge to develop ─► PR ─► Merge to master (Prod Deployment)
```

---

### 2. Vercel Preview Deployments

Every push to any non-production branch (such as `feature/*` or `develop`) automatically triggers a Vercel Preview Build.

- **Unique URLs**: Each commit/push produces an isolated URL (e.g. `https://unified-streaming-analytics-git-feature-new-feature.vercel.app`).
- **Visual Review**: Use preview URLs to perform QA, review UI styling, and test client API requests before committing code changes to production.

---

### 3. Production Deployment & Protection

Production deployments occur automatically when code is merged into the `master` branch.

- **Pre-Deployment Checklist**:
  - CI/CD status: Verify all unit tests, linters (Ruff, Black), and type checks pass.
  - Preview reviewed: Visual verification completed on the preview URL.
  - Clean console: No uncaught execution errors or console warnings.

---

### 4. Web Analytics & Performance Budgets

Vercel Web Analytics and Speed Insights are integrated directly into the React client to track visitor engagement and Core Web Vitals.

#### Performance Targets

- **Largest Contentful Paint (LCP)**: `< 2.5 seconds`
- **Interaction to Next Paint (INP)**: `< 200 ms`
- **Cumulative Layout Shift (CLS)**: `< 0.1`
- **Time to First Byte (TTFB)**: `< 800 ms`

---

### 5. Release Management & Versioning

The project adheres to Semantic Versioning (`vMAJOR.MINOR.PATCH`):

- **Minor/Patch Releases**: Tagged commits (e.g., `v1.0.0`) trigger a release archive and GitHub Release notes builder.
- **Major Releases**: Large architectural overhauls (e.g., v2.0.0 transitioning to Kafka/PostgreSQL).
