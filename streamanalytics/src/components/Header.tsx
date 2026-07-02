import { ActivePlatform } from '../types';
import { Search, Bell, Settings, User } from 'lucide-react';

interface HeaderProps {
  activePlatform: ActivePlatform;
  onPlatformChange: (platform: ActivePlatform) => void;
}

export default function Header({ activePlatform, onPlatformChange }: HeaderProps) {
  // Theme styling based on active platform
  const getLogoColor = () => {
    switch (activePlatform) {
      case ActivePlatform.NETFLIX:
        return 'text-[#e50914]';
      case ActivePlatform.DISNEY:
        return 'text-[#0063e5]';
      case ActivePlatform.PRIME_VIDEO:
        return 'text-[#00A8E1]';
    }
  };

  const getBadgeColor = () => {
    switch (activePlatform) {
      case ActivePlatform.NETFLIX:
        return 'border-[#e50914]';
      case ActivePlatform.DISNEY:
        return 'border-[#0063e5]';
      case ActivePlatform.PRIME_VIDEO:
        return 'border-[#00A8E1]';
    }
  };

  const getActiveTabStyle = (platform: ActivePlatform) => {
    if (activePlatform === platform) {
      switch (platform) {
        case ActivePlatform.NETFLIX:
          return 'text-[#e50914] border-b-2 border-[#e50914] pb-5 mt-5';
        case ActivePlatform.DISNEY:
          return 'text-[#0063e5] border-b-2 border-[#0063e5] pb-5 mt-5';
        case ActivePlatform.PRIME_VIDEO:
          return 'text-[#00A8E1] border-b-2 border-[#00A8E1] pb-5 mt-5';
      }
    }
    return 'text-zinc-500 hover:text-zinc-900 transition-colors pb-5 mt-5 border-b-2 border-transparent';
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[72px] z-50 flex items-center justify-between px-8 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-xs">
      {/* Brand & Tabs */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onPlatformChange(ActivePlatform.NETFLIX)}>
          <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center rounded-sm transition-transform duration-300 hover:rotate-90">
            <div className={`w-3.5 h-3.5 border-2 ${getBadgeColor()} rotate-45 transition-colors duration-300`}></div>
          </div>
          <span className="font-display text-xl font-bold tracking-tighter text-zinc-900">
            STITCH.ANALYTICS
          </span>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-normal h-[72px]">
          {Object.values(ActivePlatform).map((platform) => (
            <button
              key={platform}
              onClick={() => onPlatformChange(platform)}
              className={`cursor-pointer ${getActiveTabStyle(platform)}`}
            >
              {platform}
            </button>
          ))}
        </nav>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search metrics..."
            className="w-64 bg-zinc-50 border border-zinc-200 rounded-sm pl-10 pr-4 py-1.5 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-zinc-100 rounded-sm text-zinc-500 hover:text-zinc-900 transition-colors relative cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#e50914] rounded-full animate-pulse"></span>
          </button>
          <button className="p-2 hover:bg-zinc-100 rounded-sm text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-zinc-200 mx-1"></div>
          <button className="p-2 hover:bg-zinc-100 rounded-sm text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-2">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
