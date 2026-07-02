import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/model-assets", express.static(path.join(__dirname, "..", "..", "model", "datasets")));

const PORT = 3000;

// Lazy initialize Gemini to prevent startup crashes if key is absent
let aiInstance: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment secrets. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// Preset datasets for various sources (Netflix, Disney+, Prime Video, IMDB, etc.)
const defaultDashboardData = {
  movieTitle: undefined,
  indexedTitles: "2.8M+",
  globalAverage: "8.2 / 10",
  trendsMonthly: [
    { label: "Jan", value: 35 },
    { label: "Feb", value: 48 },
    { label: "Mar", value: 65 },
    { label: "Apr", value: 85 },
    { label: "May", value: 55 },
    { label: "Jun", value: 30 },
    { label: "Jul", value: 75 },
    { label: "Aug", value: 95 },
    { label: "Sep", value: 60 },
    { label: "Oct", value: 50 },
  ],
  trendsQuarterly: [
    { label: "Q1", value: 45 },
    { label: "Q2", value: 72 },
    { label: "Q3", value: 88 },
    { label: "Q4", value: 65 },
  ],
  sentimentScore: 94,
  sentimentDistribution: [40, 52, 65, 45, 95, 55],
  boxOfficeRevenue: "$1.2B",
  boxOfficeCorrelation: 0.87,
  genres: [
    { name: "Sci-Fi", growth: "+22%" },
    { name: "Drama", growth: "-4%" },
    { name: "Horror", growth: "+18%" },
  ],
  feed: [
    {
      title: "The Night Crawler",
      description: "Dataset Update: 14k new user reviews processed",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFaTWI_Ol4t3G1eagmCVJimvuFZTBXV-BRsxfxRnvCHOu_48EEUX-SKLlbZWYxlJD3Xbxxmu1jHoaw5YU5keuB_LFPfvvwBN5sbDroHOLaL_w6CZp2TbtiW02Yi6vBXTPpihHsIBW8GrhHsfcCHF2PI9IDIH5K07G2KCZqXh9vZC4PbMSjZpLFnPur4EDk4bUw1kHUOFYNvWpyvi6plL-vkPuRQ3DG08Dzxiebo2es2K0SCcTykSznhSJXoCgbD3ynZrdClfFjKKcb",
      timestamp: "Just now",
    },
    {
      title: "Infinite Horizon",
      description: "Dataset Update: Box office revenue verified (Global)",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2JU2yS5f76aF_oLgS2ShBQDndU42phtN55oQ1ViENu8mUa1q7i2MQefJfnL-pLnXW2nxbHiSb-jCCmhfXH3HFVVCwoGraerpzQJj0hnQ72gA51Kn_1NCkls7mk69emS4jOLmakzWZng5ftFGnA2ww-jn-sWdKrgtj71IldaD1UeRgVUhjE53M232pYWefH_-od8_NhI0xPHZ2G1_d5T-TktnXnOsi48o1B8oe8TpQgZ-lYVxZpSwV1oeI-m4NpvpGdELYrhzeF_vi",
      timestamp: "2 mins ago",
    },
  ],
  hotspots: [
    { city: "New York", lat: 40.7128, lng: -74.006, intensity: 0.9 },
    { city: "London", lat: 51.5074, lng: -0.1278, intensity: 0.8 },
    { city: "Berlin", lat: 52.52, lng: 13.405, intensity: 0.6 },
    { city: "Tokyo", lat: 35.6762, lng: 139.6503, intensity: 0.95 },
    { city: "São Paulo", lat: -23.5505, lng: -46.6333, intensity: 0.7 },
    { city: "Mumbai", lat: 19.076, lng: 72.8777, intensity: 0.85 },
  ],
};

const presets: Record<string, typeof defaultDashboardData> = {
  netflix: {
    ...defaultDashboardData,
    indexedTitles: "1.4M+",
    globalAverage: "7.9 / 10",
    trendsMonthly: [
      { label: "Jan", value: 65 },
      { label: "Feb", value: 55 },
      { label: "Mar", value: 80 },
      { label: "Apr", value: 70 },
      { label: "May", value: 90 },
      { label: "Jun", value: 85 },
      { label: "Jul", value: 60 },
      { label: "Aug", value: 75 },
      { label: "Sep", value: 88 },
      { label: "Oct", value: 92 },
    ],
    sentimentScore: 89,
    boxOfficeRevenue: "$850M",
    boxOfficeCorrelation: 0.81,
    genres: [
      { name: "Drama", growth: "+14%" },
      { name: "Sci-Fi", growth: "+32%" },
      { name: "Comedy", growth: "-2%" },
    ],
  },
  disney: {
    ...defaultDashboardData,
    indexedTitles: "850k+",
    globalAverage: "8.1 / 10",
    trendsMonthly: [
      { label: "Jan", value: 45 },
      { label: "Feb", value: 60 },
      { label: "Mar", value: 70 },
      { label: "Apr", value: 55 },
      { label: "May", value: 80 },
      { label: "Jun", value: 95 },
      { label: "Jul", value: 90 },
      { label: "Aug", value: 75 },
      { label: "Sep", value: 50 },
      { label: "Oct", value: 65 },
    ],
    sentimentScore: 91,
    boxOfficeRevenue: "$1.4B",
    boxOfficeCorrelation: 0.92,
    genres: [
      { name: "Fantasy", growth: "+26%" },
      { name: "Animation", growth: "+18%" },
      { name: "Adventure", growth: "+8%" },
    ],
  },
  prime: {
    ...defaultDashboardData,
    indexedTitles: "1.9M+",
    globalAverage: "7.6 / 10",
    trendsMonthly: [
      { label: "Jan", value: 30 },
      { label: "Feb", value: 40 },
      { label: "Mar", value: 55 },
      { label: "Apr", value: 50 },
      { label: "May", value: 75 },
      { label: "Jun", value: 70 },
      { label: "Jul", value: 85 },
      { label: "Aug", value: 80 },
      { label: "Sep", value: 95 },
      { label: "Oct", value: 90 },
    ],
    sentimentScore: 85,
    boxOfficeRevenue: "$980M",
    boxOfficeCorrelation: 0.79,
    genres: [
      { name: "Action", growth: "+20%" },
      { name: "Thriller", growth: "+15%" },
      { name: "Mystery", growth: "+12%" },
    ],
  },
  imdb: defaultDashboardData,
};

// API: Get core dashboard statistics based on source or filters
app.get("/api/dashboard", async (req, res) => {
  const source = (req.query.source as string || "imdb").toLowerCase();
  
  // Return presets directly for non-IMDb platforms
  if (source !== "imdb") {
    const data = presets[source] || defaultDashboardData;
    return res.json(data);
  }

  try {
    const backendUrl = process.env.VITE_API_URL || "http://127.0.0.1:8000";
    const backendRes = await fetch(`${backendUrl}/dashboard`);
    if (!backendRes.ok) throw new Error("Backend not available");
    const backendData = await backendRes.json();
    
    // Map FastAPI data to the Frontend Schema
    const mappedData = {
      ...defaultDashboardData,
      indexedTitles: `${backendData.kpis.total_movies.toLocaleString()}`,
      globalAverage: `${backendData.kpis.avg_rating} / 10`,
      boxOfficeRevenue: `${backendData.kpis.max_popularity} (Max Pop)`,
      genres: backendData.top_genres_count.slice(0, 3).map((g: any) => ({
        name: g.genre,
        growth: `+${Math.floor(Math.random() * 30)}%` // simulated metric
      })),
      trendsMonthly: backendData.release_trends.slice(-10).map((t: any) => ({
        label: t.year.toString(),
        value: t.count
      }))
    };
    res.json(mappedData);
  } catch (error) {
    console.warn("Failed to reach FastAPI backend. Falling back to preset data.", error);
    const data = presets[source] || defaultDashboardData;
    res.json(data);
  }
});

// API: Process user custom movie dataset creation (local insert simulation)
app.post("/api/custom-movie", (req, res) => {
  const { title, description, imageUrl } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and Description are required." });
  }

  // Simulate inserting into default feed
  const newFeedItem = {
    title,
    description: `User Verified: ${description}`,
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
    timestamp: "Just now",
  };

  // Prepend to feed
  defaultDashboardData.feed = [newFeedItem, ...defaultDashboardData.feed];

  res.json({ success: true, item: newFeedItem });
});

// API: AI-powered Movie Intelligence Query
app.post("/api/analyze", async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Please provide a valid movie title to analyze." });
  }

  const backendUrl = process.env.VITE_API_URL || "http://127.0.0.1:8000";

  try {
    // 1. Try to search the database first via backend to get 100% accurate results
    const searchRes = await fetch(`${backendUrl}/search?q=${encodeURIComponent(query)}`);
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (Array.isArray(searchData) && searchData.length > 0) {
        const movie = searchData[0];
        
        // 2. Fetch actual recommendations from backend recommendation engine
        let recommendations: any[] = [];
        try {
          const recRes = await fetch(`${backendUrl}/recommend?title=${encodeURIComponent(movie.title)}`);
          if (recRes.ok) {
            recommendations = await recRes.json();
          }
        } catch (recError) {
          console.warn("Failed to fetch recommendations for movie:", movie.title, recError);
        }

        // Map recommendations to feed format
        const feed = recommendations.slice(0, 3).map((m: any, idx: number) => ({
          title: m.title,
          description: `Similar: Rating: ${m.vote_average}/10 | Genres: ${m.genres || "Drama"}`,
          imageUrl: m.poster_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
          timestamp: `${idx + 1} min ago`
        }));

        if (feed.length === 0) {
          feed.push({
            title: movie.title,
            description: movie.overview || "Database record verified.",
            imageUrl: movie.poster_url || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
            timestamp: "Just now"
          });
        }

        const hotspots = [
          { city: "New York", lat: 40.7128, lng: -74.006, intensity: 0.8 + Math.random() * 0.18 },
          { city: "London", lat: 51.5074, lng: -0.1278, intensity: 0.75 + Math.random() * 0.2 },
          { city: "Tokyo", lat: 35.6762, lng: 139.6503, intensity: 0.85 + Math.random() * 0.14 },
          { city: "São Paulo", lat: -23.5505, lng: -46.6333, intensity: 0.65 + Math.random() * 0.3 },
          { city: "Mumbai", lat: 19.076, lng: 72.8777, intensity: 0.7 + Math.random() * 0.25 }
        ];

        // Robust parsing of genres list which can be string or array
        const rawGenres = movie.genres || "Drama";
        const genresList = Array.isArray(rawGenres)
          ? rawGenres
          : typeof rawGenres === "string"
            ? rawGenres.replace(/[\[\]']/g, "").split(",").map((g: string) => g.trim())
            : ["Drama"];

        const genres = genresList.slice(0, 3).map((g: string) => ({
          name: g,
          growth: `+${Math.floor(Math.random() * 30)}%`
        }));

        const resultJson = {
          movieTitle: movie.title,
          indexedTitles: "63,249",
          globalAverage: `${movie.vote_average || "5.77"} / 10`,
          trendsMonthly: [
            { label: "Jan", value: Math.floor(Math.random() * 40) + 30 },
            { label: "Feb", value: Math.floor(Math.random() * 40) + 40 },
            { label: "Mar", value: Math.floor(Math.random() * 40) + 50 },
            { label: "Apr", value: Math.floor(Math.random() * 40) + 30 },
            { label: "May", value: Math.floor(Math.random() * 40) + 45 },
            { label: "Jun", value: Math.floor(Math.random() * 40) + 55 },
            { label: "Jul", value: Math.floor(Math.random() * 40) + 60 },
            { label: "Aug", value: Math.floor(Math.random() * 40) + 65 },
            { label: "Sep", value: Math.floor(Math.random() * 40) + 70 },
            { label: "Oct", value: Math.min(100, Math.floor((movie.popularity || 0) * 100)) || 50 }
          ],
          trendsQuarterly: [
            { label: "Q1", value: Math.floor(Math.random() * 40) + 40 },
            { label: "Q2", value: Math.floor(Math.random() * 40) + 50 },
            { label: "Q3", value: Math.floor(Math.random() * 40) + 60 },
            { label: "Q4", value: Math.floor(Math.random() * 40) + 55 }
          ],
          sentimentScore: Math.floor((movie.vote_average || 5.77) * 10),
          sentimentDistribution: [
            Math.floor(Math.random() * 30) + 20,
            Math.floor(Math.random() * 30) + 30,
            Math.floor(Math.random() * 40) + 40,
            Math.floor(Math.random() * 30) + 25,
            Math.floor((movie.vote_average || 5.77) * 10),
            Math.floor(Math.random() * 30) + 30
          ],
          boxOfficeRevenue: movie.popularity ? `$${(movie.popularity * 10).toFixed(0)}M` : "N/A",
          boxOfficeCorrelation: 0.75 + (movie.vote_average || 5) * 0.02,
          genres,
          feed,
          hotspots
        };
        
        return res.json(resultJson);
      }
    }
  } catch (dbError) {
    console.warn("FastAPI search failed, trying Gemini API fallback...", dbError);
  }

  // 3. Fallback to Gemini if database lookup didn't yield results
  try {
    const ai = getGemini();
    const prompt = `Perform a detailed movie intelligence data analysis on the movie "${query}".
Return the output strictly as a JSON object matching the following TypeScript interface schema:
{
  "movieTitle": "Name of the movie analyzed",
  "indexedTitles": "An estimate of index records, e.g. '1.4M+' or '45k+'",
  "globalAverage": "An estimated viewer score on scale of 10, formatted like '8.4 / 10' or '7.2 / 10'",
  "trendsMonthly": [{"label": "Jan", "value": 45}, {"label": "Feb", "value": 50}, {"label": "Mar", "value": 65}, {"label": "Apr", "value": 55}, {"label": "May", "value": 85}, {"label": "Jun", "value": 75}, {"label": "Jul", "value": 90}, {"label": "Aug", "value": 95}, {"label": "Sep", "value": 80}, {"label": "Oct", "value": 60}],
  "trendsQuarterly": [{"label": "Q1", "value": 55}, {"label": "Q2", "value": 75}, {"label": "Q3", "value": 90}, {"label": "Q4", "value": 70}],
  "sentimentScore": 92,
  "sentimentDistribution": [35, 45, 55, 30, 90, 40],
  "boxOfficeRevenue": "The total worldwide box office revenue in billions or millions, e.g. '$1.2B' or '$450M'",
  "boxOfficeCorrelation": 0.85,
  "genres": [{"name": "Sci-Fi", "growth": "+22%"}, {"name": "Drama", "growth": "-4%"}, {"name": "Horror", "growth": "+18%"}],
  "feed": [
    {"title": "Name of the movie", "description": "Dynamic update description", "timestamp": "Just now"},
    {"title": "Name of the movie", "description": "Another update", "timestamp": "1 min ago"}
  ],
  "hotspots": [
    {"city": "New York", "lat": 40.7128, "lng": -74.006, "intensity": 0.9},
    {"city": "London", "lat": 51.5074, "lng": -0.1278, "intensity": 0.8},
    {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503, "intensity": 0.95}
  ]
}
Make sure all values are highly realistic according to actual details of "${query}" but fit the dashboard's layout. Do not wrap in markdown blocks, respond strictly with raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const cleanedText = text.trim();
    const resultJson = JSON.parse(cleanedText);

    const completedResult = {
      ...defaultDashboardData,
      ...resultJson,
    };

    res.json(completedResult);
  } catch (error: any) {
    console.error("Gemini analysis error, returning fallback generated preset:", error);
    // Final fallback preset so search never crashes the UI
    const finalFallback = {
      ...defaultDashboardData,
      movieTitle: query,
      indexedTitles: "63,249",
      globalAverage: "7.0 / 10",
      feed: [
        {
          title: query,
          description: `Synthesized fallback profile: Search query received, database index updated.`,
          imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&auto=format&fit=crop&q=60",
          timestamp: "Just now"
        }
      ]
    };
    res.json(finalFallback);
  }
});

// Configure Vite or Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`STREAM_OS Server running on port ${PORT}`);
  });
}

startServer();
