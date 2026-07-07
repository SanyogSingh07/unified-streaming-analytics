import { 
  Film, 
  Sparkles, 
  Layers, 
  Database, 
  TrendingUp, 
  Globe, 
  Users, 
  HelpCircle, 
  Code,
  Download,
  Cpu
} from "lucide-react";

interface SidebarProps {
  activeSource: string;
  setActiveSource: (source: string) => void;
  activeTab: "dashboard" | "growth" | "reach" | "demographics" | "models";
  setActiveTab: (tab: "dashboard" | "growth" | "reach" | "demographics" | "models") => void;
  onExport: () => void;
  onOpenSupport: () => void;
  onOpenApiDocs: () => void;
}

export default function Sidebar({
  activeSource,
  setActiveSource,
  activeTab,
  setActiveTab,
  onExport,
  onOpenSupport,
  onOpenApiDocs
}: SidebarProps) {
  const sources = [
    { id: "netflix", label: "Netflix", icon: Film },
    { id: "disney", label: "Disney+", icon: Sparkles },
    { id: "prime", label: "Prime Video", icon: Layers },
    { id: "imdb", label: "IMDB", icon: Database },
  ];

  const tabs = [
    { id: "growth", label: "Growth", icon: TrendingUp },
    { id: "reach", label: "Reach", icon: Globe },
    { id: "demographics", label: "Demographics", icon: Users },
    { id: "models", label: "Models", icon: Cpu },
  ];

  return (
    <aside 
      id="side-nav-bar"
      className="fixed left-0 top-20 h-[calc(100vh-80px)] w-64 bg-[#0A0A0A]/95 backdrop-blur-xl border-r border-white/10 flex flex-col py-8 z-40 hidden md:flex transition-all duration-300"
    >
      {/* Brand Metadata */}
      <div className="px-6 mb-8 border-b border-white/5 pb-6">
        <h3 className="font-serif italic font-medium text-white text-xl tracking-wide mb-1">
          Archives / Core
        </h3>
        <p className="text-[9px] text-outline uppercase tracking-[0.3em] font-mono">
          System v4.2.0 Stable
        </p>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-6">
        {/* Dataset Sources */}
        <div>
          <p className="px-3 text-[10px] text-outline uppercase tracking-[0.25em] font-bold mb-3">
            Data Streams
          </p>
          <div className="space-y-1">
            {sources.map((item) => {
              const Icon = item.icon;
              const isActive = activeSource === item.id && activeTab === "dashboard";
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSource(item.id);
                    setActiveTab("dashboard");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/5 border-l border-white"
                      : "text-on-surface-variant hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-65" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Analytics Modules */}
        <div>
          <p className="px-3 text-[10px] text-outline uppercase tracking-[0.25em] font-bold mb-3">
            Intelligence
          </p>
          <div className="space-y-1">
            {tabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    isActive
                      ? "text-white bg-white/5 border-l border-white"
                      : "text-on-surface-variant hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-65" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Actions and Footer Links */}
      <div className="px-6 mt-auto pt-6 border-t border-white/5 space-y-5">
        <button
          onClick={onExport}
          className="w-full py-2.5 border border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          Export Dataset
        </button>

        <div className="flex flex-col gap-2.5 px-1">
          <button
            onClick={onOpenSupport}
            className="flex items-center gap-2 text-outline hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.15em] text-left"
          >
            <HelpCircle className="w-3.5 h-3.5 opacity-70" />
            Support Logs
          </button>
          <button
            onClick={onOpenApiDocs}
            className="flex items-center gap-2 text-outline hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.15em] text-left"
          >
            <Code className="w-3.5 h-3.5 opacity-70" />
            API Protocols
          </button>
        </div>
      </div>
    </aside>
  );
}
