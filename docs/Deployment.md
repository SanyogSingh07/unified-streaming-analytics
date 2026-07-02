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
