import type { VercelRequest, VercelResponse } from "@vercel/node";

const defaultDashboardData = {
  movieTitle: undefined,
  indexedTitles: "2.8M+",
  globalAverage: "8.2 / 10",
  trendsMonthly: [
    { label: "Jan", value: 35 },{ label: "Feb", value: 48 },{ label: "Mar", value: 65 },
    { label: "Apr", value: 85 },{ label: "May", value: 55 },{ label: "Jun", value: 30 },
    { label: "Jul", value: 75 },{ label: "Aug", value: 95 },{ label: "Sep", value: 60 },
    { label: "Oct", value: 50 },
  ],
  trendsQuarterly: [
    { label: "Q1", value: 45 },{ label: "Q2", value: 72 },
    { label: "Q3", value: 88 },{ label: "Q4", value: 65 },
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
    { city: "New York",  lat: 40.7128,  lng: -74.0060, intensity: 0.9  },
    { city: "London",   lat: 51.5074,  lng: -0.1278,  intensity: 0.8  },
    { city: "Berlin",   lat: 52.5200,  lng: 13.4050,  intensity: 0.6  },
    { city: "Tokyo",    lat: 35.6762,  lng: 139.6503, intensity: 0.95 },
    { city: "São Paulo",lat: -23.5505, lng: -46.6333, intensity: 0.7  },
    { city: "Mumbai",   lat: 19.0760,  lng: 72.8777,  intensity: 0.85 },
  ],
};

const presets: Record<string, typeof defaultDashboardData> = {
  imdb: defaultDashboardData,
  netflix: {
    ...defaultDashboardData,
    indexedTitles: "1.4M+",
    globalAverage: "7.9 / 10",
    trendsMonthly: [
      { label: "Jan", value: 65 },{ label: "Feb", value: 55 },{ label: "Mar", value: 80 },
      { label: "Apr", value: 70 },{ label: "May", value: 90 },{ label: "Jun", value: 85 },
      { label: "Jul", value: 60 },{ label: "Aug", value: 75 },{ label: "Sep", value: 88 },
      { label: "Oct", value: 92 },
    ],
    sentimentScore: 89,
    boxOfficeRevenue: "$850M",
    boxOfficeCorrelation: 0.81,
    genres: [
      { name: "Drama",  growth: "+14%" },
      { name: "Sci-Fi", growth: "+32%" },
      { name: "Comedy", growth: "-2%"  },
    ],
  },
  disney: {
    ...defaultDashboardData,
    indexedTitles: "850k+",
    globalAverage: "8.1 / 10",
    trendsMonthly: [
      { label: "Jan", value: 45 },{ label: "Feb", value: 60 },{ label: "Mar", value: 70 },
      { label: "Apr", value: 55 },{ label: "May", value: 80 },{ label: "Jun", value: 95 },
      { label: "Jul", value: 90 },{ label: "Aug", value: 75 },{ label: "Sep", value: 50 },
      { label: "Oct", value: 65 },
    ],
    sentimentScore: 91,
    boxOfficeRevenue: "$1.4B",
    boxOfficeCorrelation: 0.92,
    genres: [
      { name: "Fantasy",   growth: "+26%" },
      { name: "Animation", growth: "+18%" },
      { name: "Adventure", growth: "+8%"  },
    ],
  },
  prime: {
    ...defaultDashboardData,
    indexedTitles: "1.9M+",
    globalAverage: "7.6 / 10",
    trendsMonthly: [
      { label: "Jan", value: 30 },{ label: "Feb", value: 40 },{ label: "Mar", value: 55 },
      { label: "Apr", value: 50 },{ label: "May", value: 75 },{ label: "Jun", value: 70 },
      { label: "Jul", value: 85 },{ label: "Aug", value: 80 },{ label: "Sep", value: 95 },
      { label: "Oct", value: 90 },
    ],
    sentimentScore: 85,
    boxOfficeRevenue: "$980M",
    boxOfficeCorrelation: 0.79,
    genres: [
      { name: "Action",  growth: "+20%" },
      { name: "Thriller",growth: "+15%" },
      { name: "Mystery", growth: "+12%" },
    ],
  },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const source = ((req.query.source as string) || "imdb").toLowerCase();
  const data = presets[source] ?? defaultDashboardData;
  return res.status(200).json(data);
}
