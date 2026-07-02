import { useState } from 'react';
import { ActivePlatform, SidebarTab } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NetflixDashboard from './components/NetflixDashboard';
import DisneyDashboard from './components/DisneyDashboard';
import PrimeDashboard from './components/PrimeDashboard';
import { Plus, BarChart2, MessageSquare } from 'lucide-react';

export default function App() {
  const [activePlatform, setActivePlatform] = useState<ActivePlatform>(ActivePlatform.NETFLIX);
  const [activeTab, setActiveTab] = useState<SidebarTab>(SidebarTab.DASHBOARD);
  const [showFabMenu, setShowFabMenu] = useState<boolean>(false);

  // Background and base theme styling based on active platform
  const getPlatformBg = () => {
    return 'bg-zinc-100 text-zinc-900';
  };

  return (
    <div className={`min-h-screen font-sans ${getPlatformBg()} transition-colors duration-500 overflow-x-hidden antialiased flex flex-col pb-10`}>
      {/* Top Header Navigation */}
      <Header activePlatform={activePlatform} onPlatformChange={setActivePlatform} />

      {/* Side Navigation */}
      <Sidebar 
        activePlatform={activePlatform} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Main Content Stage */}
      <main className="md:ml-64 pt-[72px] min-h-[calc(100vh-112px)] transition-all duration-300">
        <div className="p-6 md:p-8 max-w-7xl mx-auto relative z-10">
          {activeTab === SidebarTab.DASHBOARD ? (
            <>
              {activePlatform === ActivePlatform.NETFLIX && <NetflixDashboard />}
              {activePlatform === ActivePlatform.DISNEY && <DisneyDashboard />}
              {activePlatform === ActivePlatform.PRIME_VIDEO && <PrimeDashboard />}
            </>
          ) : (
            /* Elegant Placeholder for non-dashboard tabs to maintain functional discipline */
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-fade-in bg-white border border-zinc-200 rounded-sm p-8 max-w-lg mx-auto">
              <div className="p-4 bg-zinc-50 rounded-full border border-zinc-200 text-zinc-400">
                <BarChart2 className="w-12 h-12 text-zinc-600" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 font-display">
                {activeTab} Analytics Section
              </h2>
              <p className="text-zinc-500 max-w-md text-sm">
                Detailed metrics, deep filters, and historical performance breakdowns for the {activePlatform} {activeTab.toLowerCase()} ecosystem.
              </p>
              <button 
                onClick={() => setActiveTab(SidebarTab.DASHBOARD)}
                className="px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-sm text-xs font-bold transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Interactive Quick Action Floating Action Button (FAB) */}
      <div className="fixed bottom-14 right-8 z-50">
        <button 
          onClick={() => setShowFabMenu(!showFabMenu)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer ${
            activePlatform === ActivePlatform.NETFLIX
              ? 'bg-[#e50914] hover:bg-[#b00710] shadow-[#e50914]/20'
              : activePlatform === ActivePlatform.DISNEY
              ? 'bg-[#0063e5] hover:bg-[#004db8] shadow-[#0063e5]/20'
              : 'bg-[#00A8E1] hover:bg-[#008cb8] shadow-[#00A8E1]/20'
          }`}
        >
          <Plus className={`w-7 h-7 transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`} />
        </button>

        {/* FAB Quick Action Panel */}
        {showFabMenu && (
          <div className="absolute bottom-16 right-0 bg-white border border-zinc-200 rounded-lg p-4 shadow-xl min-w-[220px] animate-fade-in">
            <p className="text-[10px] font-bold text-zinc-400 mb-3 tracking-wide uppercase font-mono">Quick Reports</p>
            <div className="space-y-1">
              <button 
                onClick={() => {
                  setActiveTab(SidebarTab.REPORTS);
                  setShowFabMenu(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-zinc-50 rounded-md text-left text-xs text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <BarChart2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Weekly Summary Report</span>
              </button>
              <button 
                onClick={() => {
                  alert('Generating live marketing campaign analysis report...');
                  setShowFabMenu(false);
                }}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-zinc-50 rounded-md text-left text-xs text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium">Campaign Feedback</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Console / Meta Rail */}
      <footer className="fixed bottom-0 left-0 w-full h-10 bg-zinc-900 text-zinc-500 px-6 flex items-center justify-between text-[10px] font-mono z-50">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> CONNECTED: PORT_3000</span>
          <span className="hidden sm:inline">WORKSPACE: STREAM_ANALYTICS_PROD</span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span>INTEGRATION: ACTIVE</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-300 hidden xs:inline">AUTO-SAVE: ON</span>
          <span>v4.2.0-STABLE</span>
        </div>
      </footer>
    </div>
  );
}
