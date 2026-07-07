import React, { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  onOpenSettings: () => void;
  onOpenNotifications: () => void;
}

export default function Header({
  onSearch,
  isLoading,
  onOpenSettings,
  onOpenNotifications,
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
    }
  };

  return (
    <header 
      id="top-nav-bar"
      className="fixed top-0 w-full h-20 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10"
    >
      <div className="flex justify-between items-center h-full px-8 md:px-12 w-full">
        {/* Brand Logotype */}
        <div className="flex items-center gap-10">
          <span className="font-serif italic font-semibold text-2xl tracking-wide text-white">
            Stream_OS
          </span>
          
          {/* Dynamic Movie Search Form */}
          <form 
            onSubmit={handleSubmit}
            className="hidden md:flex items-center bg-[#111111] px-5 py-2 border border-white/10 focus-within:border-white/30 transition-all"
          >
            <Search className="text-on-surface-variant w-4 h-4 mr-2" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              disabled={isLoading}
              className="bg-transparent border-none outline-none focus:ring-0 text-xs text-[#F5F5F0] placeholder:text-outline/40 w-72 font-sans tracking-wide"
              placeholder={isLoading ? "AUTOMATED ANALYZING..." : "Search Archives... (Inception, Dune)"}
            />
          </form>
        </div>

        {/* Action Controls & Analyst Avatar */}
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={onOpenNotifications}
              className="relative p-1 text-on-surface-variant hover:text-[#F5F5F0] transition-colors duration-200"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-600 rounded-full ring-1 ring-black animate-pulse" />
            </button>
            <button 
              onClick={onOpenSettings}
              className="p-1 text-on-surface-variant hover:text-[#F5F5F0] transition-colors duration-200"
            >
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>

          <div className="w-8 h-8 bg-surface-container border border-white/10 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Data analyst profile headshot"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ssUBN-aNT-n9cZ7vW85igVnmN7nir0LXDhd6cAwSCfDg0Ed16a-ALc6t31eQDKf_6RVvPhiNLehxG3HxUplSPvta_MOKYtzPloDX33_NfXX6bsQhvxrnC2k4qSqzmDSGpvfYXeXFZ7Enk730PthH4bcnTHx-L2E6795Tvm9vCXrN0hkmIrqar82e0DL1terAsTDa137B6MtCnplnSARWaCiSNssfzCetMsR-ETzlx24R-S36Gn19fWgMFEfc0nQXlRgSqRLWHT4t"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
