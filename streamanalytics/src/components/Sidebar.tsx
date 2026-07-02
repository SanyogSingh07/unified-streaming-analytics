import { ActivePlatform, SidebarTab } from '../types';
import { LayoutDashboard, Library, TrendingUp, Users, FileText } from 'lucide-react';

interface SidebarProps {
  activePlatform: ActivePlatform;
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
}

export default function Sidebar({ activePlatform, activeTab, onTabChange }: SidebarProps) {
  // Config profiles for different platforms
  const getProfile = () => {
    switch (activePlatform) {
      case ActivePlatform.NETFLIX:
        return {
          name: 'Alex Reed',
          title: 'Senior Analyst',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPA1-hq9pX17OjPD5VxV46IupZmHaCd0BbLRH7l4tMPFqyk--ahRMNLAMvHHmp2GTNuo-en1BbJ5ho0M_jxsfXbrdH7ObucGMW8CqzbKPD1zFkMZOXqts88fQML1ZRNR9DzPZoQNgqJh1-wijPfjZBfXv2SCglCilqYSP1hE8zv8T86td2WIs8Xcevnp16LVbP3MO3aBt0WsIUE5awXbVMCPizQ1MUGlw00lBfUF4P7Q5M2LX0isidrocZW_vegfauELBHNdxu8FZU'
        };
      case ActivePlatform.DISNEY:
        return {
          name: 'Alex Chen',
          title: 'Chief Analyst',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu9KYY3CeV1IjZiVkQRy73ze2wBg2hT_z10AQPYPHCscNykYtOlKr-66hz-6SZ84jSX1j0k02AHakaiK7Uo6l4REedpcbHzCkaGCS7IgvJuUGzJ0pBsKKJZu6wtk6rqLe0ZjnH0zRCCc9yD2fRA7q-l44Dbn4-ll5veT5_Kh4pph3YX9aM7gFWyrCc92524l76otqq2jrYeDIZuKetqcjo8K_nIaLsyD-b8R1wag0scLp_r0TD_BpXhG2qsATKqLKbAFU-n1FWA6P0'
        };
      case ActivePlatform.PRIME_VIDEO:
        return {
          name: 'Alex Chen',
          title: 'Senior Data Scientist',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3xmk3sntTsNZB9XRXg53onDGPe5b8lBzMD0J-dx2vAtKaTGGDis_imDyKx955CtcYX4kfjiQvl6OP9i2DxdiZEqkva_qyiXErVAgGm_jxLaTvWx-Pasll4NBNd-QCNQ5QF8Ifx-5RD9uepauOdkWzpUyKIgdOwBySg5DbIXQv-9BY2el1RmJtGvf8tFFTg3ZLbJCCsoCvYXAX_zXxICySe-ln5WJ7-lWUWsgFcC-RXgzZ7Qy-DsuzMb3VQ6YrsqDVsk49pZInh4KK'
        };
    }
  };

  const getPlatformColors = () => {
    switch (activePlatform) {
      case ActivePlatform.NETFLIX:
        return {
          bg: 'bg-zinc-100 border-l-4 border-[#e50914]',
          text: 'text-[#e50914] font-bold',
          accent: '#e50914'
        };
      case ActivePlatform.DISNEY:
        return {
          bg: 'bg-zinc-100 border-l-4 border-[#0063e5]',
          text: 'text-[#0063e5] font-bold',
          accent: '#0063e5'
        };
      case ActivePlatform.PRIME_VIDEO:
        return {
          bg: 'bg-zinc-100 border-l-4 border-[#00A8E1]',
          text: 'text-[#00A8E1] font-bold',
          accent: '#00A8E1'
        };
    }
  };

  const profile = getProfile();
  const themeColors = getPlatformColors();

  const menuItems = [
    { tab: SidebarTab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { tab: SidebarTab.LIBRARY, label: 'Library', icon: Library },
    { tab: SidebarTab.GROWTH, label: 'Growth', icon: TrendingUp },
    { tab: SidebarTab.DEMOGRAPHICS, label: 'Demographics', icon: Users },
    { tab: SidebarTab.REPORTS, label: 'Reports', icon: FileText },
  ];

  return (
    <aside className="fixed left-0 top-[72px] h-[calc(100vh-72px)] w-64 z-40 bg-white border-r border-zinc-200 flex flex-col justify-between pt-6">
      <div>
        {/* Executive View Title */}
        <div className="px-6 mb-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            Component Sets
          </h3>
          <p className="text-xs font-semibold text-zinc-600 mt-1 uppercase font-mono">
            {activePlatform} Workspace
          </p>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer text-left ${
                  isActive
                    ? themeColors.bg + ' ' + themeColors.text
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-current' : 'text-zinc-400'}`} />
                <span className="font-mono text-[11px] tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card */}
      <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex items-center gap-3">
        <img
          src={profile.image}
          alt={profile.name}
          referrerPolicy="no-referrer"
          className={`w-10 h-10 rounded-full object-cover border-2 shrink-0 ${
            activePlatform === ActivePlatform.NETFLIX
              ? 'border-[#e50914]'
              : activePlatform === ActivePlatform.DISNEY
              ? 'border-[#0063e5]'
              : 'border-[#00A8E1]'
          }`}
        />
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-bold text-zinc-900 truncate leading-tight">{profile.name}</p>
          <p className="text-[10px] text-zinc-500 truncate mt-0.5">{profile.title}</p>
        </div>
      </div>
    </aside>
  );
}
