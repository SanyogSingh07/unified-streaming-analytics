import { useState } from 'react';
import { Download, RefreshCw, Star, Zap, Rocket, Sparkles, Film, Clock, Play, Award, ArrowUp, ArrowDown } from 'lucide-react';

export default function DisneyDashboard() {
  const [activeFranchise, setActiveFranchise] = useState<string>('Marvel');

  const stats = [
    {
      title: 'Total Titles',
      value: '1,542',
      change: '12%',
      changeType: 'positive',
      subtext: 'Growth this quarter',
    },
    {
      title: 'Avg Rating',
      value: '4.5',
      stars: 4.5,
      subtext: 'Based on 2.4M reviews',
    },
    {
      title: 'Daily Active Users',
      value: '84.2M',
      change: '+4.1%',
      changeType: 'positive',
      chart: [40, 60, 50, 95], // mini progress chart
    },
    {
      title: 'Engagement Rate',
      value: '68%',
      change: '2%',
      changeType: 'negative',
      subtext: 'Avg. watch: 142m/day',
    },
  ];

  const franchises = [
    { name: 'Marvel', value: '24%', icon: Zap, color: 'text-red-500 border-red-200 bg-red-50' },
    { name: 'Star Wars', value: '18%', icon: Rocket, color: 'text-blue-500 border-blue-200 bg-blue-50' },
    { name: 'Pixar', value: '12%', icon: Sparkles, color: 'text-amber-600 border-amber-200 bg-amber-50' },
    { name: 'Disney', value: '46%', icon: Film, color: 'text-sky-600 border-sky-200 bg-sky-50' },
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
            Disney+ Performance
          </h1>
          <p className="text-zinc-500 max-w-2xl text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0063e5]" />
            Last updated: March 15, 2024 · 09:42 AM PST
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="bg-white hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-sm text-xs font-semibold flex items-center gap-2 border border-zinc-200 transition-all cursor-pointer shadow-xs">
            <Download className="w-4 h-4" /> Export PDF
          </button>
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-sm text-xs font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm cursor-pointer">
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-sm flex flex-col justify-between disney-glow">
            <p className="font-mono text-xs uppercase text-zinc-400 font-bold mb-4">{stat.title}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-extrabold text-zinc-900">{stat.value}</h2>
              {stat.change && (
                <span className={`text-xs font-bold flex items-center gap-0.5 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-500'
                }`}>
                  {stat.changeType === 'positive' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
                  {stat.change}
                </span>
              )}
            </div>
            {stat.stars && (
              <div className="flex text-amber-500 mt-4 gap-0.5">
                {[1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
                <Star className="w-4 h-4 fill-current opacity-40" />
              </div>
            )}
            {stat.chart && (
              <div className="flex items-end gap-1.5 h-6 mt-4">
                {stat.chart.map((val, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="flex-1 bg-zinc-100 rounded-t-sm relative overflow-hidden" 
                    style={{ height: '100%' }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-[#0063e5] rounded-t-sm" 
                      style={{ height: `${val}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            )}
            {stat.subtext && (
              <p className="text-[10px] text-zinc-500 mt-4 font-medium">{stat.subtext}</p>
            )}
          </div>
        ))}
      </div>

      {/* Middle Grid - Franchise Distribution & Library Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Franchise Distribution */}
        <div className="lg:col-span-2 glass-card rounded-sm p-6 relative overflow-hidden flex flex-col justify-between disney-glow">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Franchise Distribution</h3>
            <p className="text-base text-zinc-600 mt-1">Content share by major studio category</p>
          </div>

          {/* Large round icon buttons representing categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 relative z-10">
            {franchises.map((fran) => {
              const Icon = fran.icon;
              const isSelected = activeFranchise === fran.name;
              return (
                <div 
                  key={fran.name} 
                  onClick={() => setActiveFranchise(fran.name)}
                  className={`text-center p-4 rounded-sm border border-zinc-200 cursor-pointer transition-all duration-300 hover:border-zinc-350 ${
                    isSelected ? 'bg-zinc-50/80 shadow-inner border-zinc-400' : ''
                  }`}
                >
                  <div className={`aspect-square w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 border ${fran.color} ${
                    isSelected ? 'scale-110 shadow-sm' : ''
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-mono text-[10px] uppercase text-zinc-500 font-bold">{fran.name}</p>
                  <p className="text-xl font-bold text-zinc-900 mt-0.5">{fran.value}</p>
                </div>
              );
            })}
          </div>

          {/* Multi-layered custom double wave-chart representation */}
          <div className="mt-8 h-48 chart-grid rounded-sm border border-zinc-200 p-4 relative flex items-end">
            <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path 
                d="M0,35 Q10,12 25,28 T50,8 T75,32 T100,18" 
                fill="none" 
                stroke="#e50914" 
                strokeWidth="2" 
                className="drop-shadow-[0_1px_2px_rgba(229,9,20,0.15)]"
              ></path>
              <path 
                d="M0,38 Q15,30 30,12 T60,28 T90,8 T100,22" 
                fill="none" 
                stroke="#0063e5" 
                strokeWidth="2" 
                className="drop-shadow-[0_1px_2px_rgba(0,99,229,0.15)]"
              ></path>
            </svg>
            <div className="absolute bottom-2 left-4 right-4 text-[10px] font-mono text-zinc-400 flex justify-between">
              <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
            </div>
          </div>
        </div>

        {/* Library Growth Sidebar Info */}
        <div className="glass-card rounded-sm p-6 flex flex-col justify-between disney-glow">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">Library Growth</h3>
          
          <div className="flex-1 space-y-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-200">
                <Film className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-zinc-800">New Originals</span>
                  <span className="text-zinc-500 font-mono">+124</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-200">
                <Play className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-zinc-800">Series Seasons</span>
                  <span className="text-zinc-500 font-mono">+42</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-200">
                <Award className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-zinc-800">Legacy Catalog</span>
                  <span className="text-zinc-500 font-mono">+210</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-zinc-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-zinc-150">
            <div className="p-3.5 rounded-sm bg-zinc-50 border border-zinc-200">
              <p className="text-[10px] text-zinc-400 font-mono uppercase mb-0.5">Region Leader</p>
              <p className="text-sm font-bold text-zinc-800">North America</p>
            </div>
            <div className="p-3.5 rounded-sm bg-zinc-50 border border-zinc-200">
              <p className="text-[10px] text-zinc-400 font-mono uppercase mb-0.5">Top Genre</p>
              <p className="text-sm font-bold text-zinc-800">Sci-Fi Fantasy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Highlight Card */}
      <div className="glass-card rounded-sm overflow-hidden relative min-h-[300px] bg-zinc-950 flex flex-col justify-center p-8 sm:p-12 disney-glow">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-YgzAESfLctcJQRISYONSSxPsbtccMt0CWTcT-ipW7AB9jBT4gunPf-PMoTlBfyigB-1TsosPMURO8N9NPgSH5Sky9yozJsviXPfEMwUFFti82om_WomSdFUQXLEL3jFmg6T47Je6kL8YzStAVzP0vXAeQH3vilIsLJr_8oYroc9_AZCjMKvtCelmkybMxFakvzPQ2_XkI6vegzBCnserpZImqTLK_OCraY4uqNXG1VOPa0vBn-DPj9BP7NZT1RlXCt7l8mzQHAzi" 
            alt="Marvel Secret Invasion artwork" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-xl space-y-4">
          <div className="flex items-center gap-2 text-[#0063e5] font-bold">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400">Global Trending</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Marvel's Secret Invasion
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Season finale driving a 14% increase in weekend subscriptions. Retention rate among core fans remains at an all-time high of 92%.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-6 py-2.5 bg-white text-zinc-950 text-xs font-bold rounded-sm hover:scale-105 transition-all shadow-md cursor-pointer">
              View Campaign
            </button>
            <button className="px-6 py-2.5 border border-white/20 text-white text-xs font-bold rounded-sm hover:bg-white/10 transition-all cursor-pointer">
              Download Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
