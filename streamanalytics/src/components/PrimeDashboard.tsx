import { useState } from 'react';
import { Download, RefreshCw, Film, Star, Globe, DollarSign, Tv, Smartphone, Laptop, AlertCircle, Sparkles } from 'lucide-react';

export default function PrimeDashboard() {
  const [timeframe, setTimeWindow] = useState<'24h' | '7d'>('24h');
  const [hoveredQuarter, setHoveredQuarter] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Titles',
      value: '26,482',
      change: '+1.2%',
      changeColor: 'text-[#00A8E1]',
      icon: Film,
      progress: 72,
    },
    {
      title: 'Avg Rating',
      value: '3.9',
      change: '+0.4',
      changeColor: 'text-[#00A8E1]',
      icon: Star,
      progress: 82,
    },
    {
      title: 'Active Regions',
      value: '242',
      change: 'Global',
      changeColor: 'text-[#00A8E1]',
      icon: Globe,
      progress: 95,
    },
    {
      title: 'Revenue Est.',
      value: '$4.2B',
      change: 'Top Tier',
      changeColor: 'text-[#00A8E1]',
      icon: DollarSign,
      progress: 64,
    },
  ];

  const quarterData = [
    { name: 'Q1', value: 30, target: '90%', budget: '$250M' },
    { name: 'Q2', value: 50, target: '98%', budget: '$320M' },
    { name: 'Q3', value: 75, target: '105%', budget: '$400M' },
    { name: 'Q4', value: 90, target: '112%', budget: '$450M', isActive: true },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
            Prime Video Ecosystem
          </h1>
          <p className="text-zinc-500 max-w-2xl text-sm leading-relaxed">
            Real-time analytical performance of Amazon's global streaming catalog, monitoring active licensing and audience engagement across 240+ territories.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 border border-zinc-200 transition-all cursor-pointer shadow-xs">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="bg-[#00A8E1] text-white px-4 py-2 rounded-sm text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-xs cursor-pointer">
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-sm flex flex-col justify-between prime-glow">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-[#00A8E1]/10 rounded-sm">
                  <Icon className="w-6 h-6 text-[#00A8E1]" />
                </div>
                <span className={`text-xs font-mono font-bold ${stat.changeColor}`}>
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
                <div className="mt-4 w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00A8E1] rounded-full transition-all duration-1000" 
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid - Map & Growth charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Global Content Map Reach */}
        <div className="lg:col-span-2 glass-card rounded-sm p-6 relative overflow-hidden h-[450px] group flex flex-col justify-between prime-glow">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Global Content Reach</h3>
              <p className="text-2xl font-bold text-zinc-900 mt-1">Consumption Hotspots</p>
            </div>
            
            {/* Timeframe Switcher */}
            <div className="flex bg-zinc-100 rounded-md p-1 border border-zinc-200 z-20">
              <button
                onClick={() => setTimeWindow('24h')}
                className={`px-3 py-1 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  timeframe === '24h' ? 'bg-[#00A8E1] text-white' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                24h
              </button>
              <button
                onClick={() => setTimeWindow('7d')}
                className={`px-3 py-1 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                  timeframe === '7d' ? 'bg-[#00A8E1] text-white' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                7d
              </button>
            </div>
          </div>

          {/* Map Layer Image */}
          <div className="absolute inset-0 z-0 opacity-55 group-hover:opacity-75 transition-opacity duration-700">
            <div 
              className="w-full h-full bg-cover bg-center mix-blend-multiply"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdGB2o_wmBhuifxpRQYFIlJmi5QNGJ3dgj6-Eo28oFutZ0IRhbTwxBo2oIK-rTIfSJpVHU_gwROCqq7FtUvWtsOyjiTkxk_y-kyevmf6rTgL6TL7H_7yK5wDnvnXdOsO29xLIjCB8GD1GDqhA6F86CPvBZpmIN639jg6G07DlpxAwvchDPCSamK647gkl0hXLYS_gVGPXK4mEXhO54PhN2DXv0pSvBaTpUpitcfUvUrbpfwYqXnQaDBMhhYwbyWoI7ncA74hw_mVEb')`
              }}
            ></div>
          </div>

          {/* Glowing Animated Markers */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full">
              {/* Hotspot 1 (US North East) */}
              <div className="absolute top-[28%] left-[23%] flex items-center justify-center">
                <span className="w-3.5 h-3.5 bg-[#00A8E1] rounded-full absolute animate-ping-subtle"></span>
                <span className="w-3 h-3 bg-[#00A8E1] rounded-full"></span>
              </div>
              {/* Hotspot 2 (Europe) */}
              <div className="absolute top-[32%] left-[48%] flex items-center justify-center">
                <span className="w-3.5 h-3.5 bg-[#00A8E1] rounded-full absolute animate-ping-subtle" style={{ animationDelay: '0.5s' }}></span>
                <span className="w-3 h-3 bg-[#00A8E1] rounded-full"></span>
              </div>
              {/* Hotspot 3 (Asia/Pacific) */}
              <div className="absolute top-[48%] left-[78%] flex items-center justify-center">
                <span className="w-4 h-4 bg-[#00A8E1] rounded-full absolute animate-ping-subtle" style={{ animationDelay: '1s' }}></span>
                <span className="w-3.5 h-3.5 bg-[#00A8E1] rounded-full"></span>
              </div>
              {/* Hotspot 4 (South America) */}
              <div className="absolute bottom-[35%] left-[32%] flex items-center justify-center">
                <span className="w-3 h-3 bg-zinc-900/20 rounded-full absolute animate-ping-subtle" style={{ animationDelay: '1.5s' }}></span>
                <span className="w-2.5 h-2.5 bg-zinc-950/40 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Map Footer Info */}
          <div className="relative z-10 flex gap-4 mt-auto">
            <div className="flex items-center gap-2 text-xs text-zinc-700 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-sm border border-zinc-200 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A8E1]"></span> High Density
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-700 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-sm border border-zinc-200 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span> Emerging Reach
            </div>
          </div>
        </div>

        {/* Library Growth Production Bar Chart */}
        <div className="glass-card rounded-sm p-6 flex flex-col justify-between prime-glow">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Library Growth</h3>
            <p className="text-lg font-bold text-zinc-900 mt-1">Original Production Scaling</p>
          </div>

          {/* Interactive SVG / Bar Chart Representation */}
          <div className="flex-1 relative flex items-end gap-3 pb-8 pt-6 grid-overlay min-h-[160px]">
            {quarterData.map((q, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-end items-center gap-2 group cursor-pointer relative"
                onMouseEnter={() => setHoveredQuarter(q.name)}
                onMouseLeave={() => setHoveredQuarter(null)}
              >
                {/* Column block */}
                <div 
                  className={`w-full rounded-t-xs transition-all duration-300 relative ${
                    q.isActive ? 'bg-[#00A8E1]' : 'bg-[#00A8E1]/20 group-hover:bg-[#00A8E1]/40'
                  }`}
                  style={{ height: `${q.value}%` }}
                >
                  {/* Active highlight lines */}
                  {q.isActive && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/60 shadow-[0_1px_4px_#00A8E1]"></div>
                  )}
                </div>

                {/* X axis tag */}
                <span className={`text-[10px] font-mono ${q.isActive ? 'font-bold text-[#00A8E1]' : 'text-zinc-400'}`}>
                  {q.name}
                </span>

                {/* Custom Tooltip */}
                {hoveredQuarter === q.name && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 rounded-sm p-2 z-20 text-[10px] w-24 text-center shadow-lg">
                    <p className="font-bold text-white">{q.name} Target</p>
                    <p className="text-[#00A8E1] font-mono mt-0.5">{q.target}</p>
                    <p className="text-zinc-400 mt-0.5 font-mono">{q.budget}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Growth Footer Info */}
          <div className="space-y-3.5 pt-4 border-t border-zinc-150">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-bold">Annual Target</span>
              <span className="font-bold text-zinc-850">112% Achieved</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 font-bold">Production Cost</span>
              <span className="font-bold text-[#00A8E1]">-$1.2M (Opt)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Detailed Stats Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Top Genres Card */}
        <div className="glass-card p-6 rounded-sm relative overflow-hidden group prime-glow">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <h4 className="text-sm font-bold text-zinc-900 mb-5 flex items-center justify-between">
              Top Genres
              <span className="p-1 hover:bg-zinc-100 rounded-full cursor-pointer"><Sparkles className="w-4 h-4 text-[#00A8E1]" /></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A8E1]"></div>
                  <span className="text-zinc-700">Drama</span>
                </div>
                <span className="font-mono text-zinc-500">42%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <span className="text-zinc-700">Action</span>
                </div>
                <span className="font-mono text-zinc-500">28%</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div>
                  <span className="text-zinc-700">Comedy</span>
                </div>
                <span className="font-mono text-zinc-500">15%</span>
              </li>
            </ul>
          </div>
          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#00A8E1]/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        </div>

        {/* Device Distribution Card */}
        <div className="glass-card p-6 rounded-sm flex flex-col justify-between prime-glow">
          <h4 className="text-sm font-bold text-zinc-900 mb-5">Device Distribution</h4>
          <div className="flex items-center gap-4 h-24">
            {/* Smart TV */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <Tv className="w-5 h-5 text-zinc-400 hover:text-[#00A8E1] transition-colors" />
              <div className="w-full bg-zinc-100 h-1.5 rounded-full">
                <div className="h-full bg-[#00A8E1] w-[65%] rounded-full shadow-[0_1px_4px_#00A8E1]"></div>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Smart TV</span>
            </div>
            {/* Mobile */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <Smartphone className="w-5 h-5 text-zinc-400 hover:text-[#00A8E1] transition-colors" />
              <div className="w-full bg-zinc-100 h-1.5 rounded-full">
                <div className="h-full bg-blue-500 w-[25%] rounded-full"></div>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Mobile</span>
            </div>
            {/* Desktop */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <Laptop className="w-5 h-5 text-zinc-400 hover:text-[#00A8E1] transition-colors" />
              <div className="w-full bg-zinc-100 h-1.5 rounded-full">
                <div className="h-full bg-zinc-300 w-[10%] rounded-full"></div>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Desktop</span>
            </div>
          </div>
        </div>

        {/* Licensing Alerts banner */}
        <div className="glass-card p-6 rounded-sm flex items-center justify-between bg-[#00A8E1]/5 border-[#00A8E1]/20 prime-glow">
          <div className="space-y-4">
            <div>
              <h4 className="text-base font-bold text-zinc-900">Licensing Alerts</h4>
              <p className="text-xs text-zinc-500 mt-1">42 Titles expiring in 30 days</p>
            </div>
            <button className="bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 px-3.5 py-1.5 rounded-sm text-[10px] font-bold tracking-wide transition-all cursor-pointer">
              Review Contracts
            </button>
          </div>
          <div className="relative shrink-0">
            <AlertCircle className="w-12 h-12 text-[#00A8E1] opacity-25 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
