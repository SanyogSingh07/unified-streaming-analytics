# Frontend

Documentation for the React + TypeScript dashboard.

---

## Overview

The frontend is a **React 18 + TypeScript** single-page application built with **Vite** and styled with **TailwindCSS**. It features a premium dark theme, Framer Motion animations, and AI-powered search via the Google Gemini API.

---

## Structure

```
deployment/frontend/
├── src/
│   ├── App.tsx                  ← Root component, routing, state
│   ├── components/
│   │   ├── DashboardView.tsx    ← Main analytics panels
│   │   ├── Header.tsx           ← Search bar + AI integration
│   │   ├── Sidebar.tsx          ← Navigation, data source selector
│   │   └── BackgroundShader.tsx ← WebGL animated background
│   ├── types.ts                 ← TypeScript interface definitions
│   └── index.css                ← Global styles
├── server.ts                    ← Express + Vite dev server, Gemini proxy
├── package.json
└── vite.config.ts
```

---

## Dashboard Views

| Tab | Component | Description |
|-----|-----------|-------------|
| Dashboard | `DashboardView.tsx` | Trend charts, genre bars, sentiment |
| Heatmap | World heatmap | Global audience intensity |
| Growth | Growth panels | Cross-platform content growth |
| Models | ML Results | Training metrics, model comparison |

---

## Running Locally

```bash
cd deployment/frontend
npm install
npm run dev
```

Frontend: http://localhost:3000

---

## AI Search

The search bar uses the **Google Gemini API** (proxied through `server.ts`):

1. User types a movie/show name
2. Frontend sends POST to `/analyze` endpoint
3. Server calls Gemini with a structured prompt
4. Returns genre trends, sentiment, box office correlations
5. Dashboard updates with AI-generated insights

Set `GEMINI_API_KEY` in `.env` to enable.

---

## Build for Production

```bash
npm run build
# Output: deployment/frontend/dist/
```
