export interface TrendItem {
  label: string;
  value: number;
}

export interface GenreGrowth {
  name: string;
  growth: string;
}

export interface RealTimeUpdate {
  title: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
}

export interface HeatmapHotspot {
  city: string;
  lat: number;
  lng: number;
  intensity: number; // 0 to 1
}

export interface DashboardData {
  movieTitle?: string;
  indexedTitles: string;
  globalAverage: string;
  trendsMonthly: TrendItem[];
  trendsQuarterly: TrendItem[];
  sentimentScore: number; // e.g., 94 for 94%
  sentimentDistribution: number[]; // e.g., 6 numbers for the bar heights
  boxOfficeRevenue: string; // e.g., "$1.2B"
  boxOfficeCorrelation: number; // e.g., 0.87
  genres: GenreGrowth[];
  feed: RealTimeUpdate[];
  hotspots: HeatmapHotspot[];
}
