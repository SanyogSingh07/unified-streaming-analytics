import { useState } from 'react';
import { Download, Film, Star, Globe, TrendingUp } from 'lucide-react';
import { RegionData } from '../types';

export default function NetflixDashboard() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const stats = [
    {
      title: 'Total Titles',
      value: '8.8k',
      change: '+12% vs LY',
      changeColor: 'text-[#e50914]',
      icon: Film,
    },
    {
      title: 'Avg Rating',
      value: '4.2',
      change: 'Global Mean',
      changeColor: 'text-zinc-400',
      icon: Star,
    },
    {
      title: 'Localization',
      value: '34 langs',
      change: '190+ Countries',
      changeColor: 'text-zinc-400',
      icon: Globe,
    },
    {
      title: 'Retention Rate',
      value: '92%',
      change: 'Peak Daily',
      changeColor: 'text-[#e50914]',
      icon: TrendingUp,
    },
  ];

  const regions: RegionData[] = [
    {
      id: '1',
      name: 'North America',
      flagCode: 'USA',
      marketShare: 42,
      growthIndex: 85,
      status: 'DOMINANT',
      trend: 'up',
    },
    {
      id: '2',
      name: 'Europe Central',
      flagCode: 'EU',
      marketShare: 28,
      growthIndex: 65,
      status: 'EXPANDING',
      trend: 'up',
    },
    {
      id: '3',
      name: 'Asia Pacific',
      flagCode: 'APAC',
      marketShare: 15,
      growthIndex: 40,
      status: 'STABLE',
      trend: 'stable',
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[#e50914] font-mono text-xs uppercase tracking-widest block mb-2 font-bold">Internal Analytics</span>
          <h1 className="font-display text-4xl font-extrabold text-zinc-900 tracking-tight">
            Netflix Library Performance
          </h1>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 border border-zinc-200 transition-all cursor-pointer shadow-xs">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="bg-[#e50914] text-white px-4 py-2 rounded-sm text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-xs cursor-pointer">
            <TrendingUp className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-sm flex flex-col justify-between netflix-glow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-[#e50914]/10 rounded-sm">
                  <Icon className="w-6 h-6 text-[#e50914]" />
                </div>
                <span className={`text-[10px] font-mono font-bold ${stat.changeColor}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase text-zinc-400 font-bold">
                  {stat.title}
                </span>
                <span className="block text-3xl font-extrabold text-zinc-900 mt-1">
                  {stat.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Growth Curve (Line chart with gradient area) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-sm chart-grid min-h-[400px] flex flex-col justify-between netflix-glow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-zinc-900 font-bold text-lg">Library Growth Curve</h3>
              <p className="text-zinc-400 text-[10px] font-mono tracking-widest mt-1">HISTORICAL VOLUME 2010 — 2024</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-mono text-[#e50914] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#e50914]"></span> MOVIES
              </span>
              <span className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-zinc-200"></span> TV SHOWS
              </span>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="flex-1 relative flex items-end min-h-[220px]">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="netflixGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e50914" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#e50914" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area Under Line */}
              <path 
                d="M 0,40 Q 15,36 30,30 T 60,18 T 90,8 T 100,5 L 100,40 Z" 
                fill="url(#netflixGradient)"
              />
              {/* Primary Line */}
              <path 
                d="M 0,38 Q 15,36 30,30 T 60,18 T 90,8 T 100,5" 
                fill="none" 
                stroke="#e50914" 
                strokeWidth="2.5" 
                className="drop-shadow-[0_2px_4px_rgba(229,9,20,0.2)]"
              />
            </svg>

            {/* Custom Hover Points */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
              {[2010, 2014, 2018, 2022, 2024].map((year, idx) => (
                <div 
                  key={year} 
                  className="flex flex-col justify-end items-center relative group pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Point Hover Tooltip */}
                  {hoveredPoint === idx && (
                    <div className="absolute bottom-24 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm text-center text-xs shadow-lg w-24">
                      <p className="font-bold text-white">{year}</p>
                      <p className="text-[#e50914] font-mono mt-0.5 font-bold">
                        {idx === 0 ? '1.8k' : idx === 1 ? '3.5k' : idx === 2 ? '5.2k' : idx === 3 ? '7.4k' : '8.8k'}
                      </p>
                    </div>
                  )}
                  {/* Dot */}
                  <span className={`w-3 h-3 rounded-full border-2 border-white bg-[#e50914] transition-all absolute mb-[22%] ${
                    hoveredPoint === idx ? 'scale-150 shadow-md' : ''
                  }`}></span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-400 border-t border-zinc-100 pt-4">
            <span>2010</span>
            <span>2014</span>
            <span>2018</span>
            <span>2022</span>
            <span>2024</span>
          </div>
        </div>

        {/* Content Mix Donut/Radial Progress Meter */}
        <div className="glass-card p-6 rounded-sm flex flex-col justify-between items-center netflix-glow">
          <div className="self-start">
            <h3 className="text-zinc-900 font-bold text-lg">Content Mix</h3>
            <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest mt-1">Movie vs TV Ratio</p>
          </div>

          <div className="relative w-44 h-44 my-4 flex items-center justify-center">
            {/* SVG Circle Progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0, 0, 0, 0.04)" strokeWidth="3.5" />
              <circle 
                cx="18" 
                cy="18" 
                r="16" 
                fill="none" 
                stroke="#e50914" 
                strokeWidth="3.5" 
                strokeDasharray="70 100" 
                className="drop-shadow-[0_2px_4px_rgba(229,9,20,0.15)]"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-extrabold text-zinc-900">70:30</span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">Global Balance</span>
            </div>
          </div>

          <div className="w-full space-y-3.5 pt-4 border-t border-zinc-100">
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 bg-[#e50914] rounded-xs"></span>
                <span className="text-zinc-700">Movies</span>
              </div>
              <span className="text-zinc-900">70%</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 bg-zinc-200 rounded-xs"></span>
                <span className="text-zinc-400">TV Shows</span>
              </div>
              <span className="text-zinc-500">30%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Grid Table Section */}
      <section className="glass-card rounded-sm overflow-hidden netflix-glow">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <h3 className="text-zinc-900 font-bold text-lg">Top Performing Regions</h3>
          <button className="text-[#e50914] text-xs font-bold hover:underline cursor-pointer uppercase font-mono">
            View All Metrics
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-50/80 text-zinc-500 border-b border-zinc-100 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Market Share</th>
                <th className="px-6 py-4">Growth Index</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {regions.map((reg) => (
                <tr key={reg.id} className="border-b border-zinc-100 hover:bg-zinc-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-zinc-800 flex items-center gap-3">
                    <span className="px-1.5 py-0.5 bg-zinc-100 rounded-sm text-[9px] font-mono text-zinc-600">
                      {reg.flagCode}
                    </span>
                    {reg.name}
                  </td>
                  <td className="px-6 py-4 text-zinc-600 font-mono">{reg.marketShare}%</td>
                  <td className="px-6 py-4">
                    <div className="w-32 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#e50914] h-full rounded-full" 
                        style={{ width: `${reg.growthIndex}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      reg.status === 'DOMINANT' 
                        ? 'bg-green-500/10 text-green-600' 
                        : reg.status === 'EXPANDING' 
                        ? 'bg-[#e50914]/10 text-[#e50914]' 
                        : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {reg.trend === 'up' && <span className="text-green-500 font-bold">↑</span>}
                    {reg.trend === 'stable' && <span className="text-zinc-400 font-bold">→</span>}
                    {reg.trend === 'down' && <span className="text-[#e50914] font-bold">↓</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
