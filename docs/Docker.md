# Docker

Container configuration for the Netflix AI Analytics Platform.

---

## Services

The project uses Docker Compose to orchestrate 2 services:

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `backend` | `netflix-analytics-backend` | 8000 | FastAPI + SQLite |
| `frontend` | `netflix-analytics-frontend` | 3000 | React + Express |

---

## Quick Start

```bash
# Build and start all services
docker compose up --build

# Run in detached mode
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

---

## Backend Dockerfile

```dockerfile
# deployment/backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Frontend Dockerfile

```dockerfile
# deployment/frontend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## docker-compose.yml

```yaml
version: "3.9"
services:
  backend:
    build:
      context: ./deployment/backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=sqlite:///./netflix_analytics.db
    volumes:
      - ./model/evaluation:/app/evaluation:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build:
      context: ./deployment/frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
```

---

## Environment Variables in Docker

Secrets are injected via environment variables. For production, use Docker secrets or a secrets manager.

Create a `.env` file at the project root:
```bash
cp .env.example .env
# Edit .env with your values
```

Docker Compose automatically reads `.env`.

---

## Building Individual Images

```bash
# Backend only
docker build -t netflix-analytics-backend deployment/backend/

# Frontend only
docker build -t netflix-analytics-frontend deployment/frontend/

# Test the backend
docker run -p 8000:8000 netflix-analytics-backend
```

---

## Production Considerations

- Replace SQLite with PostgreSQL for production scale
- Add Nginx reverse proxy for SSL termination
- Use GitHub Container Registry (ghcr.io) for image storage
- Enable Docker health checks (already configured)
- Mount model files as volumes for easy updates without rebuilds
