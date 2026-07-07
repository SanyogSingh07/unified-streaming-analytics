import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  Smile, 
  DollarSign, 
  Maximize2, 
  History, 
  Activity, 
  Flame,
  Globe2,
  Users2,
  Tv,
  Cpu
} from "lucide-react";
import { DashboardData } from "../types";

interface DashboardViewProps {
  data: DashboardData;
  activeSource: string;
  activeTab: "dashboard" | "growth" | "reach" | "demographics" | "models";
  onDetailCard: (title: string, value: string, details: string) => void;
}

export default function DashboardView({
  data,
  activeSource,
  activeTab,
  onDetailCard,
}: DashboardViewProps) {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly">("monthly");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const activeTrends = timeframe === "monthly" ? data.trendsMonthly : data.trendsQuarterly;

  // Custom detailed cards popup simulation
  const handleCardClick = (title: string, value: string, desc: string) => {
    onDetailCard(title, value, desc);
  };

  return (
    <div className="space-y-10">
      {/* 1. Dashboard Tab View */}
      {activeTab === "dashboard" && (
        <>
          {/* Header metadata row */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[#E11D48] font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 mb-3 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse"></span>
                {data.movieTitle ? `AI Analysis / ${data.movieTitle}` : `${activeSource.toUpperCase()} CONTENT ARCHIVE`}
              </span>
              <h1 className="font-serif italic font-medium text-4xl md:text-5xl text-white tracking-tight">
                {data.movieTitle ? `${data.movieTitle} Intelligence` : "Cinema Statistics Core"}
              </h1>
            </div>

            <div className="flex gap-4">
              <div 
                onClick={() => handleCardClick("Indexed Titles", data.indexedTitles, "Total records synthesized and cross-referenced in active dataset")}
                className="bg-[#111111] border border-white/10 px-6 py-4 rounded-none cursor-pointer hover:border-white transition-all duration-300"
              >
                <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-bold mb-1">Indexed Titles</p>
                <p className="font-serif italic text-2xl text-white font-medium">{data.indexedTitles}</p>
              </div>
              <div 
                onClick={() => handleCardClick("Global Average", data.globalAverage, "Normalized viewer reception weight computed across top cohorts")}
                className="bg-[#111111] border border-white/10 px-6 py-4 rounded-none cursor-pointer hover:border-white transition-all duration-300"
              >
                <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-bold mb-1">Global Avg</p>
                <p className="font-serif italic text-2xl text-[#E11D48] font-semibold">{data.globalAverage}</p>
              </div>
            </div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Trend Chart Card */}
            <section className="md:col-span-8 bg-[#111111] border border-white/10 p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="font-serif italic font-semibold text-xl text-white flex items-center gap-3">
                  <TrendingUp className="text-[#E11D48] w-4.5 h-4.5" />
                  <span>Viewer Density Trends</span>
                </h2>
                
                {/* Timeframe selector */}
                <div className="flex bg-[#0A0A0A] p-0.5 border border-white/10 font-mono text-[9px]">
                  <button 
                    onClick={() => setTimeframe("monthly")}
                    className={`px-4 py-2 font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                      timeframe === "monthly" 
                        ? "bg-white text-black" 
                        : "text-outline hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setTimeframe("quarterly")}
                    className={`px-4 py-2 font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                      timeframe === "quarterly" 
                        ? "bg-white text-black" 
                        : "text-outline hover:text-white"
                    }`}
                  >
                    Quarterly
                  </button>
                </div>
              </div>

              {/* Precise SVG Bar Chart */}
              <div className="relative h-[280px] w-full bg-[#0A0A0A] border border-white/5 p-6 flex flex-col justify-end">
                <div className="absolute inset-x-6 top-6 bottom-12 flex justify-between pointer-events-none">
                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map((line) => (
                    <div 
                      key={line} 
                      className="absolute w-full border-t border-white/5" 
                      style={{ bottom: `${line}%` }}
                    />
                  ))}
                </div>

                <div className="w-full h-full flex items-end gap-3 md:gap-5 relative z-10">
                  {activeTrends.map((item, idx) => {
                    const heightPercent = item.value;
                    const isHovered = hoveredBar === idx;
                    return (
                      <div 
                        key={item.label}
                        className="flex-1 flex flex-col justify-end items-center h-full group/bar cursor-pointer"
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Bar Segment */}
                        <div className="relative w-full h-full flex items-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: idx * 0.03 }}
                            className={`w-full transition-all duration-300 relative rounded-none ${
                              isHovered 
                                ? "bg-white/30 border-t-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                                : "bg-white/10 border-t-2 border-white/40"
                            }`}
                          />
                          
                          {/* Value Tooltip */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: -8, scale: 1 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#161616] border border-white/20 px-2.5 py-1 text-[9px] font-mono text-white font-bold z-20 whitespace-nowrap rounded-none"
                              >
                                {item.value}% Density
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Label */}
                        <span className="text-[9px] font-mono text-outline font-bold mt-3 group-hover/bar:text-white transition-colors uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Global Rating Heatmap */}
            <section className="md:col-span-4 bg-[#111111] border border-white/10 p-6 hover:border-white/20 transition-all duration-500">
              <h2 className="font-serif italic font-semibold text-xl text-white mb-6 flex items-center gap-3">
                <Globe2 className="text-[#E11D48] w-4.5 h-4.5" />
                <span>Global Heatmap</span>
              </h2>

              <div className="aspect-square w-full rounded-none overflow-hidden relative border border-white/5 bg-[#0A0A0A]">
                {/* World Map Backdrop hotlink */}
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGtOLML0QpcZyyBp9DY4sIEcHBPv2t0mzDaasXekwhxvOY8WCxu4NAWicvYzJlhYToH1TR9ctGzwZYsb2fkDG5ACI0gOi6jlV7AJkhu0u4a_r1E7zszeg5rlZhhUhmjHeWk-5_0noPqnxRhW9JcDOeBZH5yEgha8luC5zE0ayf55QE91bmeoaksBiZkdJ5wGlw6nasncRDLQXl7H-u-bJvXuApVf3my8CQon_yAFk53A1PUufeK9bnsKx8OWpHryp_FCPPKoCGId5y" 
                  alt="Stylized global map layout"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
                />

                {/* Pulsing Hotspots */}
                {data.hotspots.map((spot) => {
                  // Calibrated coordinates for preset cities to align perfectly on this specific Mercator map layout
                  const presets: Record<string, { x: number; y: number }> = {
                    "New York": { x: 27.5, y: 37.5 },
                    "London": { x: 48.0, y: 28.0 },
                    "Berlin": { x: 51.5, y: 27.5 },
                    "Tokyo": { x: 84.5, y: 38.0 },
                    "São Paulo": { x: 35.0, y: 72.0 },
                    "Mumbai": { x: 69.5, y: 50.0 },
                  };
                  const { x, y } = presets[spot.city] || {
                    x: ((spot.lng + 180) / 360) * 100,
                    y: ((90 - spot.lat) / 180) * 100,
                  };

                  return (
                    <div
                      key={spot.city}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot cursor-pointer"
                      onMouseEnter={() => setActiveHotspot(spot.city)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      {/* Pulse circle */}
                      <span className="absolute inline-flex h-4 w-4 rounded-full bg-rose-600/30 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48] shadow-[0_0_8px_rgba(225,29,72,0.8)]" />

                      {/* Tooltip */}
                      {(activeHotspot === spot.city || spot.intensity > 0.9) && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#111111] border border-white/15 px-2.5 py-1 text-[9px] font-mono font-bold whitespace-nowrap rounded-none">
                          <span className="text-white">{spot.city}</span>
                          <span className="text-[#E11D48] ml-1.5">{(spot.intensity * 100).toFixed(0)}%</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Engagement gradient tracker legend */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 border border-white/10 px-4 py-3 rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-[0.15em]">Engagement Intensity</span>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-neutral-800 to-[#E11D48] rounded-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* User Sentiment Data Tile */}
            <section 
              onClick={() => handleCardClick("User Sentiment Core", `${data.sentimentScore}%`, "Positive rating synthesis across standard review corpuses")}
              className="md:col-span-4 bg-[#111111] border border-white/10 p-6 cursor-pointer group hover:border-white transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Smile className="w-4.5 h-4.5" />
                </div>
                <Maximize2 className="text-outline w-4 h-4 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif italic font-bold text-lg text-white mb-2">User Sentiment</h3>
              <p className="text-xs text-outline mb-6 leading-relaxed">
                {data.sentimentScore}% Positive reception across high-index datasets.
              </p>
              
              {/* Miniature distribution bar chart */}
              <div className="flex items-end gap-1.5 h-12">
                {data.sentimentDistribution.map((heightVal, idx) => (
                  <div 
                    key={idx}
                    className="flex-1 bg-white/10 hover:bg-white/30 rounded-none transition-all duration-300"
                    style={{ height: `${heightVal}%` }}
                  />
                ))}
              </div>
            </section>

            {/* Box Office Correlation Tile */}
            <section 
              onClick={() => handleCardClick("Box Office Forecasts", data.boxOfficeRevenue, `Estimated revenue with a ${data.boxOfficeCorrelation} critical-rating correlation factor`)}
              className="md:col-span-4 bg-[#111111] border border-white/10 p-6 cursor-pointer group hover:border-white transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E11D48]">
                  <DollarSign className="w-4.5 h-4.5" />
                </div>
                <Maximize2 className="text-outline w-4 h-4 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif italic font-bold text-lg text-white mb-2">Box Office Yield</h3>
              <p className="text-xs text-outline mb-6 leading-relaxed">
                Rating vs. Revenue: Strong correlation ({data.boxOfficeCorrelation}).
              </p>
              
              {/* Performance Indicator bar */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-outline tracking-wider">
                  <span>Current Forecast</span>
                  <span className="text-white">{data.boxOfficeRevenue}</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-none overflow-hidden border border-white/5">
                  <div 
                    className="bg-[#E11D48] h-full rounded-none transition-all duration-1000" 
                    style={{ width: `${data.boxOfficeCorrelation * 100}%` }}
                  />
                </div>
              </div>
            </section>

            {/* Genre Evolution Tile */}
            <section 
              onClick={() => handleCardClick("Genre Trend Vectors", `${data.genres.length} Active`, "Temporal genre demand metrics calculated through automated AI tagging")}
              className="md:col-span-4 bg-[#111111] border border-white/10 p-6 cursor-pointer group hover:border-white transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <History className="w-4.5 h-4.5" />
                </div>
                <Maximize2 className="text-outline w-4 h-4 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-serif italic font-bold text-lg text-white mb-2">Genre Evolution</h3>
              <p className="text-xs text-outline mb-6 leading-relaxed">
                Sci-Fi and Documentary trends peaking in Q4.
              </p>

              <div className="flex flex-wrap gap-2">
                {data.genres.map((g) => (
                  <span 
                    key={g.name}
                    className="px-3 py-1 bg-[#1A1A1A] border border-white/10 text-[9px] font-mono font-bold uppercase rounded-none text-white tracking-wider"
                  >
                    {g.name} <span className={g.growth.startsWith("+") ? "text-[#E11D48]" : "text-neutral-500"}>{g.growth}</span>
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Real-time feed section */}
          <section className="mt-12 pt-6 border-t border-white/10">
            <h3 className="font-serif italic font-medium text-2xl text-white mb-6">Real-time Datastream</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.feed.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-[#111111] p-5 rounded-none flex items-center gap-5 border border-white/10 border-l-2 hover:translate-x-1.5 transition-all duration-300 ${
                    index === 0 ? "border-l-white" : "border-l-[#E11D48]"
                  }`}
                >
                  <div className="w-12 h-16 bg-[#0A0A0A] rounded-none overflow-hidden flex-shrink-0 border border-white/10 shadow-sm">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center font-bold text-[10px] text-white font-mono">
                        {item.title.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-serif italic font-medium text-base text-white">{item.title}</h4>
                    <p className="text-xs text-outline font-medium mt-1">{item.description}</p>
                    <span className="text-[9px] font-mono text-outline/40 uppercase tracking-[0.15em] font-bold mt-2 block">
                      {item.timestamp || "ACTIVE TRANSIT"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 2. Growth View Tab */}
      {activeTab === "growth" && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 rounded-none">
          <div className="flex items-center gap-3">
            <Flame className="text-[#E11D48] w-5 h-5" />
            <h2 className="font-serif italic font-medium text-2xl md:text-3xl text-white">Viewer Acquisition & Growth Metrics</h2>
          </div>
          <p className="text-sm text-outline leading-relaxed max-w-3xl">
            Synthesized weekly CAGR values map user onboarding velocity across dynamic streaming endpoints. Active tracking indicates robust momentum in localized markets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none">
              <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-wider">Onboarding Velocity</span>
              <p className="text-2xl font-serif italic font-semibold text-white mt-2">+14.2% MoM</p>
              <div className="w-full bg-white/5 h-1 mt-4 rounded-none overflow-hidden">
                <div className="bg-[#E11D48] h-full w-[72%] rounded-none" />
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none">
              <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-wider">Synthesis Retention</span>
              <p className="text-2xl font-serif italic font-semibold text-white mt-2">92.4% Stable</p>
              <div className="w-full bg-white/5 h-1 mt-4 rounded-none overflow-hidden">
                <div className="bg-[#E11D48] h-full w-[92%] rounded-none" />
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none">
              <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-wider">Estimated CAGR (3Y)</span>
              <p className="text-2xl font-serif italic font-semibold text-white mt-2">18.7% Projection</p>
              <div className="w-full bg-white/5 h-1 mt-4 rounded-none overflow-hidden">
                <div className="bg-white h-full w-[58%] rounded-none" />
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0A0A0A] p-6 rounded-none relative overflow-hidden">
            <h3 className="font-serif italic font-semibold text-lg text-white mb-4">S-Curve Convergence Tracker</h3>
            <div className="h-48 w-full flex items-end gap-1 border-b border-white/10 pb-2">
              {Array.from({ length: 30 }).map((_, idx) => {
                const x = (idx - 15) / 4;
                const sigmoid = 1 / (1 + Math.exp(-x));
                const heightPercent = sigmoid * 100;
                return (
                  <div 
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-[#E11D48]/5 to-[#E11D48]/30 rounded-none hover:to-white/30 transition-all duration-300"
                    style={{ height: `${heightPercent}%` }}
                    title={`Projection interval ${idx + 1}: ${heightPercent.toFixed(1)}%`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-[9px] font-mono text-outline uppercase tracking-[0.15em] font-bold mt-3">
              <span>Historical Ingress</span>
              <span>Convergence Phase</span>
              <span>Projections</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Reach View Tab */}
      {activeTab === "reach" && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 rounded-none">
          <div className="flex items-center gap-3">
            <Globe2 className="text-[#E11D48] w-5 h-5" />
            <h2 className="font-serif italic font-medium text-2xl md:text-3xl text-white">Reach & Regional Connectivity Index</h2>
          </div>
          <p className="text-sm text-outline leading-relaxed max-w-3xl">
            Automated ping diagnostic indicators trace network ingress nodes and metadata density across distinct regional server hubs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none space-y-4">
              <h3 className="font-serif italic font-medium text-base text-white">Active Server Latency</h3>
              
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-outline uppercase font-bold tracking-wider">US East (Virginia)</span>
                  <span className="text-[#E11D48] font-bold">14ms (Optimal)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-outline uppercase font-bold tracking-wider">EU Central (Frankfurt)</span>
                  <span className="text-[#E11D48] font-bold">28ms (Optimal)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-outline uppercase font-bold tracking-wider">AP Southeast (Singapore)</span>
                  <span className="text-white font-bold">42ms (Stable)</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-outline uppercase font-bold tracking-wider">SA East (São Paulo)</span>
                  <span className="text-neutral-500 font-bold">110ms (Standard)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none flex flex-col justify-between">
              <div>
                <h3 className="font-serif italic font-medium text-base text-white mb-2">Metadata Density Ratio</h3>
                <p className="text-xs text-outline leading-relaxed">
                  Active connection queries scale matching regional audience distributions. Heatmap hubs synchronize automatically every 60 seconds.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="flex-1 text-center bg-white/5 border border-white/10 p-3 rounded-none">
                  <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-wider block">Pings/Sec</span>
                  <span className="text-lg font-bold text-white font-mono">14.8k</span>
                </div>
                <div className="flex-1 text-center bg-white/5 border border-white/10 p-3 rounded-none">
                  <span className="text-[9px] font-mono text-outline font-bold uppercase tracking-wider block">Error Ratio</span>
                  <span className="text-lg font-bold text-[#E11D48] font-mono">0.02%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Demographics View Tab */}
      {activeTab === "demographics" && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-6 rounded-none">
          <div className="flex items-center gap-3">
            <Users2 className="text-[#E11D48] w-5 h-5" />
            <h2 className="font-serif italic font-medium text-2xl md:text-3xl text-white">Audience Cohort Demographics</h2>
          </div>
          <p className="text-sm text-outline leading-relaxed max-w-3xl">
            Synthesized records map demographic characteristics including age segmentation, device metrics, and regional rating weight distributions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none space-y-4">
              <h3 className="font-serif italic font-medium text-base text-white">Age Bracket Clusters</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-outline mb-1.5 tracking-wider">
                    <span>18-24 (Gen Z Ingress)</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 border border-white/5 overflow-hidden rounded-none">
                    <div className="bg-[#E11D48] h-full w-[35%] rounded-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-outline mb-1.5 tracking-wider">
                    <span>25-34 (Core Professional)</span>
                    <span className="text-white">48%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 border border-white/5 overflow-hidden rounded-none">
                    <div className="bg-white h-full w-[48%] rounded-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-outline mb-1.5 tracking-wider">
                    <span>35-44 (Executive Tier)</span>
                    <span className="text-white">12%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 border border-white/5 overflow-hidden rounded-none">
                    <div className="bg-white/40 h-full w-[12%] rounded-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono font-bold uppercase text-outline mb-1.5 tracking-wider">
                    <span>45+ (Legacy Cohort)</span>
                    <span className="text-white">5%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 border border-white/5 overflow-hidden rounded-none">
                    <div className="bg-white/20 h-full w-[5%] rounded-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none space-y-4">
              <h3 className="font-serif italic font-medium text-base text-white">Device Synthetics Profile</h3>
              <p className="text-xs text-outline leading-relaxed">
                Breakdown of verified device interfaces active within dataset query telemetry logs:
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-[#111111] border border-white/5 rounded-none flex items-center gap-3">
                  <Tv className="text-white w-4.5 h-4.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-outline uppercase font-bold block tracking-wider">Connected TV</span>
                    <span className="text-sm font-bold text-white font-mono">54.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-[#111111] border border-white/5 rounded-none flex items-center gap-3">
                  <Activity className="text-[#E11D48] w-4.5 h-4.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-outline uppercase font-bold block tracking-wider">Mobile Web</span>
                    <span className="text-sm font-bold text-white font-mono">31.8%</span>
                  </div>
                </div>
                <div className="p-3 bg-[#111111] border border-white/5 rounded-none flex items-center gap-3">
                  <Globe2 className="text-white/70 w-4.5 h-4.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-outline uppercase font-bold block tracking-wider">Desktop Web</span>
                    <span className="text-sm font-bold text-white font-mono">11.0%</span>
                  </div>
                </div>
                <div className="p-3 bg-[#111111] border border-white/5 rounded-none flex items-center gap-3">
                  <Flame className="text-neutral-500 w-4.5 h-4.5 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] font-mono text-outline uppercase font-bold block tracking-wider">Consoles</span>
                    <span className="text-sm font-bold text-white font-mono">3.0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "models" && (
        <div className="bg-[#111111] border border-white/10 p-6 md:p-8 space-y-8 rounded-none animate-fade-in">
          <div className="flex items-center gap-3">
            <Cpu className="text-[#E11D48] w-5 h-5" />
            <h2 className="font-serif italic font-medium text-2xl md:text-3xl text-white">Machine Learning Benchmarks</h2>
          </div>
          <p className="text-sm text-outline leading-relaxed max-w-3xl">
            Real-time training metrics and historical cross-validation benchmarks compiled across 5 distinct classification models for streaming success forecasting.
          </p>

          {/* Active Model Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none">
              <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-mono mb-1">Active Model</p>
              <h3 className="font-serif italic text-lg text-white font-medium">Random Forest</h3>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none">
              <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-mono mb-1">Accuracy</p>
              <h3 className="font-serif italic text-lg text-[#E11D48] font-bold">99.97%</h3>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none">
              <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-mono mb-1">F1 Score</p>
              <h3 className="font-serif italic text-lg text-white font-medium">99.97%</h3>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 p-5 rounded-none">
              <p className="text-[9px] text-outline uppercase tracking-[0.15em] font-mono mb-1">Test Samples</p>
              <h3 className="font-serif italic text-lg text-white font-medium">12,591</h3>
            </div>
          </div>

          {/* Detailed benchmark table */}
          <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-none space-y-4">
            <h3 className="font-serif italic font-medium text-base text-white">Algorithm Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-outline border-collapse">
                <thead>
                  <tr className="border-b border-white/10 font-mono uppercase text-[9px] tracking-wider text-white">
                    <th className="py-3 px-4">Algorithm</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Precision</th>
                    <th className="py-3 px-4">Recall</th>
                    <th className="py-3 px-4">F1 Score</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr className="text-white bg-white/5">
                    <td className="py-3 px-4 font-bold">Random Forest Classifier</td>
                    <td className="py-3 px-4 text-[#E11D48] font-bold">99.97%</td>
                    <td className="py-3 px-4">99.98%</td>
                    <td className="py-3 px-4">99.96%</td>
                    <td className="py-3 px-4 font-bold">99.97%</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold">⭐ BEST</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Naive Bayes Classifier</td>
                    <td className="py-3 px-4 text-white">99.96%</td>
                    <td className="py-3 px-4">100.0%</td>
                    <td className="py-3 px-4">99.82%</td>
                    <td className="py-3 px-4">99.91%</td>
                    <td className="py-3 px-4 text-right text-outline">ACTIVE</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">CatBoost Classifier</td>
                    <td className="py-3 px-4">97.80%</td>
                    <td className="py-3 px-4">97.65%</td>
                    <td className="py-3 px-4">97.95%</td>
                    <td className="py-3 px-4">97.80%</td>
                    <td className="py-3 px-4 text-right text-outline">READY</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">XGBoost Classifier</td>
                    <td className="py-3 px-4">97.50%</td>
                    <td className="py-3 px-4">97.40%</td>
                    <td className="py-3 px-4">97.60%</td>
                    <td className="py-3 px-4">97.50%</td>
                    <td className="py-3 px-4 text-right text-outline">READY</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">LightGBM Classifier</td>
                    <td className="py-3 px-4">97.40%</td>
                    <td className="py-3 px-4">97.30%</td>
                    <td className="py-3 px-4">97.50%</td>
                    <td className="py-3 px-4">97.40%</td>
                    <td className="py-3 px-4 text-right text-outline">READY</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Decision Tree Classifier</td>
                    <td className="py-3 px-4">91.20%</td>
                    <td className="py-3 px-4">91.10%</td>
                    <td className="py-3 px-4">91.30%</td>
                    <td className="py-3 px-4">91.20%</td>
                    <td className="py-3 px-4 text-right text-outline">DEPRECATED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
