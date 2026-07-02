import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ExternalLink, 
  ChevronRight,
  Database,
  Globe,
  Compass,
  Cpu,
  RefreshCw
} from "lucide-react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import BackgroundShader from "./components/BackgroundShader";
import { DashboardData } from "./types";

export default function App() {
  const [activeSource, setActiveSource] = useState<string>("imdb");
  const [activeTab, setActiveTab] = useState<"dashboard" | "growth" | "reach" | "demographics" | "models">("dashboard");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Custom UI Modals
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isApiDocsOpen, setIsApiDocsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isCustomMovieOpen, setIsCustomMovieOpen] = useState(false);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [detailCard, setDetailCard] = useState<{ title: string; value: string; details: string } | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // New movie form states
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState("");

  const triggerToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch dashboard data
  const fetchDashboardData = async (source: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`/api/dashboard?source=${source}`);
      if (!response.ok) {
        throw new Error("Failed to load dashboard data from core stream.");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Unknown error occurred while connecting to core server.");
      triggerToast("Error connecting to data streams.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger search / AI analysis
  const handleAISearch = async (query: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      triggerToast(`Analyzing dataset for "${query}"...`, "info");
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze dataset.");
      }
      
      setDashboardData(data);
      triggerToast(`Intelligence metrics loaded for "${query}".`, "success");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate AI analytics. Verify backend availability.");
      triggerToast("AI compilation failed.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Add custom verified movie
  const handleAddCustomMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      triggerToast("Please provide both Title and Description.", "error");
      return;
    }

    try {
      const response = await fetch("/api/custom-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          imageUrl: newImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to insert custom record into database.");
      }

      const resData = await response.json();
      
      // Update local dashboard data feed if present
      if (dashboardData) {
        setDashboardData({
          ...dashboardData,
          feed: [resData.item, ...dashboardData.feed],
        });
      }

      triggerToast("Custom movie update verified.", "success");
      setIsCustomMovieOpen(false);
      setNewTitle("");
      setNewDesc("");
      setNewImage("");
    } catch (err: any) {
      triggerToast("Failed to insert movie update.", "error");
    }
  };

  // Initial Load
  useEffect(() => {
    fetchDashboardData(activeSource);
  }, [activeSource]);

  const handleExport = () => {
    setIsExportOpen(true);
  };

  const downloadJson = () => {
    if (!dashboardData) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dashboardData, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `stream_os_${activeSource}_dataset.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Dataset downloaded successfully.", "success");
    setIsExportOpen(false);
  };

  const handleOpenDetailCard = (title: string, value: string, details: string) => {
    setDetailCard({ title, value, details });
    setIsDetailCardOpen(true);
  };

  return (
    <div className="bg-[#0A0A0A] text-[#F5F5F0] min-h-screen selection:bg-white/20 relative overflow-x-hidden font-sans">
      {/* 1. Live Background Shader */}
      <BackgroundShader />

      {/* 2. Global Navigation Header */}
      <Header 
        onSearch={handleAISearch} 
        isLoading={isLoading}
        onOpenSettings={() => triggerToast("STREAM_OS Configuration values standard.", "info")}
        onOpenNotifications={() => triggerToast("Data-streams are live and synchronized.", "success")}
      />

      {/* 3. Side Rail Bar Navigation */}
      <Sidebar 
        activeSource={activeSource}
        setActiveSource={setActiveSource}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExport={handleExport}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenApiDocs={() => setIsApiDocsOpen(true)}
      />

      {/* 4. Main Body Content Area */}
      <main className="md:ml-64 pt-24 pb-16 px-6 md:px-12 min-h-screen relative z-10 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6"
            >
              <RefreshCw className="w-10 h-10 text-white animate-spin" />
              <div className="space-y-2">
                <h3 className="font-serif italic font-medium text-xl text-white">Stream_OS Intelligence Synthesis</h3>
                <p className="text-[9px] text-outline font-mono uppercase tracking-[0.2em] animate-pulse">
                  Querying IMDB metadata indices & compiling analysis...
                </p>
              </div>
            </motion.div>
          ) : errorMsg ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="border border-white/10 bg-[#111111] p-8 rounded-none max-w-xl mx-auto text-center space-y-6 my-12"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div className="space-y-2">
                <h3 className="font-serif italic font-semibold text-xl text-white">Synthesis Blocked</h3>
                <p className="text-sm text-outline leading-relaxed">{errorMsg}</p>
              </div>
              <button 
                onClick={() => fetchDashboardData(activeSource)}
                className="px-6 py-2.5 border border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-none"
              >
                Reconnect Stream
              </button>
            </motion.div>
          ) : dashboardData ? (
            <motion.div
              key={`${activeSource}-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <DashboardView 
                data={dashboardData}
                activeSource={activeSource}
                activeTab={activeTab}
                onDetailCard={handleOpenDetailCard}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* 5. Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsCustomMovieOpen(true)}
          className="w-12 h-12 rounded-none bg-white text-black flex items-center justify-center hover:bg-[#E11D48] hover:text-white transition-all shadow-md"
          title="Create Custom Dataset Entry"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* 6. MODALS */}
      <AnimatePresence>
        {/* Support Modal */}
        {isSupportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-white/10 bg-[#111111] w-full max-w-md rounded-none p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsSupportOpen(false)}
                className="absolute top-5 right-5 text-outline hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif italic font-medium text-xl text-white mb-4 flex items-center gap-2">
                <Database className="text-[#E11D48] w-4.5 h-4.5" />
                STREAM_OS Support Center
              </h3>
              
              <div className="space-y-4 text-xs text-outline leading-relaxed">
                <p>
                  Welcome to the master data core. STREAM_OS utilizes high-performance cloud databases and LLM capabilities to parse cinema statistics.
                </p>
                <div className="p-4 bg-[#0A0A0A] border border-white/5 rounded-none font-mono text-[11px] text-white">
                  <span className="font-bold block text-[#E11D48] mb-1 uppercase tracking-wider">Developer Contact</span>
                  Email: sanyogsingh369@gmail.com
                </div>
                <p>
                  For troubleshooting query rate limits or requesting relational table modifications, contact technical operations.
                </p>
              </div>

              <button 
                onClick={() => setIsSupportOpen(false)}
                className="w-full mt-6 py-2.5 border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-colors rounded-none bg-transparent"
              >
                Close Support Logs
              </button>
            </motion.div>
          </div>
        )}

        {/* API Docs Modal */}
        {isApiDocsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-white/10 bg-[#111111] w-full max-w-lg rounded-none p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsApiDocsOpen(false)}
                className="absolute top-5 right-5 text-outline hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif italic font-medium text-xl text-white mb-4 flex items-center gap-2">
                <Cpu className="text-[#E11D48] w-4.5 h-4.5" />
                Data Stream API Docs
              </h3>
              
              <div className="space-y-4 text-xs font-mono max-h-[350px] overflow-y-auto pr-2">
                <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-none space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-rose-600/20 text-[#E11D48] font-bold rounded-none text-[9px] uppercase tracking-wider">GET</span>
                    <span className="text-white font-bold text-[11px]">/api/dashboard</span>
                  </div>
                  <p className="text-outline text-[11px]">Fetch standard core dashboard analytics, trends, pings and hotspots.</p>
                  <p className="text-outline/70 text-[10px]">Query: ?source=imdb | netflix | disney | prime</p>
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-none space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-white/10 text-white font-bold rounded-none text-[9px] uppercase tracking-wider">POST</span>
                    <span className="text-white font-bold text-[11px]">/api/analyze</span>
                  </div>
                  <p className="text-outline text-[11px]">Runs detailed real-time LLM query analysis on target movie title.</p>
                  <p className="text-outline/70 text-[10px]">Body: {"{ \"query\": \"Inception\" }"}</p>
                </div>

                <div className="p-4 bg-[#0A0A0A] border border-white/10 rounded-none space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-white/10 text-white font-bold rounded-none text-[9px] uppercase tracking-wider">POST</span>
                    <span className="text-white font-bold text-[11px]">/api/custom-movie</span>
                  </div>
                  <p className="text-outline text-[11px]">Manually inserts a custom movie diagnostic record into active data feed.</p>
                  <p className="text-outline/70 text-[10px]">Body: {"{ \"title\": \"Inception\", \"description\": \"Data processed\", \"imageUrl\": \"...\" }"}</p>
                </div>
              </div>

              <button 
                onClick={() => setIsApiDocsOpen(false)}
                className="w-full mt-6 py-2.5 border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-none bg-transparent"
              >
                Close Logs
              </button>
            </motion.div>
          </div>
        )}

        {/* Export Dataset Modal */}
        {isExportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-white/10 bg-[#111111] w-full max-w-md rounded-none p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsExportOpen(false)}
                className="absolute top-5 right-5 text-outline hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif italic font-medium text-xl text-white mb-4">Export Active Stream</h3>
              <p className="text-[10px] text-outline leading-relaxed mb-4 font-mono tracking-wide">
                Active dataset source: <span className="text-[#E11D48] font-bold uppercase">{activeSource}</span>. Export includes detailed statistics, normalized trends, sentiment coordinates, and regional hotspots.
              </p>

              <div className="bg-[#0A0A0A] border border-white/5 p-4 rounded-none max-h-[220px] overflow-y-auto mb-6">
                <pre className="text-[9px] font-mono text-outline leading-snug">
                  {JSON.stringify(dashboardData, null, 2)}
                </pre>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsExportOpen(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none bg-transparent"
                >
                  Cancel
                </button>
                <button 
                  onClick={downloadJson}
                  className="flex-1 py-2.5 bg-white text-black hover:bg-[#E11D48] hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-none"
                >
                  Confirm Export
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Custom Movie Entry Modal */}
        {isCustomMovieOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-white/10 bg-[#111111] w-full max-w-md rounded-none p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsCustomMovieOpen(false)}
                className="absolute top-5 right-5 text-outline hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif italic font-medium text-xl text-white mb-4">Verify Custom Movie Entry</h3>
              
              <form onSubmit={handleAddCustomMovie} className="space-y-4">
                <div>
                  <label className="text-[9px] font-mono text-outline uppercase font-bold tracking-[0.15em] block mb-1.5">Movie Title</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="e.g., Gladiator II, Dune: Part Two"
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white rounded-none px-3 py-2.5 text-xs text-white placeholder:text-outline/30 focus:ring-0"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono text-outline uppercase font-bold tracking-[0.15em] block mb-1.5">Diagnostic Log Description</label>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                    placeholder="e.g., Box office projection verified locally, or 10k ratings mapped"
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white rounded-none px-3 py-2.5 text-xs text-white placeholder:text-outline/30 focus:ring-0 h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono text-outline uppercase font-bold tracking-[0.15em] block mb-1.5">Poster Image URL (Optional)</label>
                  <input 
                    type="url" 
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="e.g., hotlinked asset path or unsplash url"
                    className="w-full bg-[#0A0A0A] border border-white/10 focus:border-white rounded-none px-3 py-2.5 text-xs text-white placeholder:text-outline/30 focus:ring-0"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsCustomMovieOpen(false)}
                    className="flex-1 py-2.5 border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none bg-transparent"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-white text-black hover:bg-[#E11D48] hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-none"
                  >
                    Verify Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Detailed Statistics Modal */}
        {isDetailCardOpen && detailCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-white/10 bg-[#111111] w-full max-w-sm rounded-none p-6 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsDetailCardOpen(false)}
                className="absolute top-5 right-5 text-outline hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-[#E11D48] flex-shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-outline uppercase font-bold tracking-[0.15em]">Metadata Diagnostic</span>
                  <h3 className="font-serif italic font-medium text-xl text-white mt-0.5">{detailCard.title}</h3>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs text-outline">
                <div className="p-3.5 bg-[#0A0A0A] rounded-none border border-white/15">
                  <span className="text-[8px] uppercase tracking-wider font-bold block text-[#E11D48] mb-1">Value Segment</span>
                  <span className="text-2xl font-serif italic text-white font-semibold leading-none">{detailCard.value}</span>
                </div>
                <p className="leading-relaxed text-xs font-sans">
                  {detailCard.details}
                </p>
              </div>

              <button 
                onClick={() => setIsDetailCardOpen(false)}
                className="w-full mt-6 py-2.5 bg-white text-black hover:bg-[#E11D48] hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-none"
              >
                Dismiss Diagnostics
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Action Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 border border-white/15 bg-[#111111] px-5 py-3 rounded-none flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em]"
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#E11D48]" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
            {toast.type === "info" && <RefreshCw className="w-4 h-4 text-white animate-spin" />}
            <span className="text-white font-sans font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
