import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Sun, Moon, LogOut, Menu, X, Plus, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  PlaneTakeoff, CheckCircle2, AlertCircle
} from 'lucide-react';
import TripDetail from './TripDetail';

export default function Dashboard({ onLogout, isDarkMode, setIsDarkMode }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const navItems = [
    { icon: Map, label: 'Trips', active: true },
    { icon: FolderOpen, label: 'Files' },
    { icon: Users, label: 'People' },
    { icon: Settings, label: 'Brand settings' },
  ];

  if (selectedTrip) {
    return <TripDetail onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setSelectedTrip(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9f8] dark:bg-[#0a0a0a] text-brand-500 dark:text-brand-100 font-sans selection:bg-brand-200/30 overflow-hidden flex">
      
      {/* Background Ambient Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-200/20 dark:bg-brand-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-300/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-500/20 dark:bg-black/40 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full z-50
        w-[260px] flex-shrink-0
        transition-transform duration-300 ease-[0.22,1,0.36,1]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        p-4 lg:p-6 lg:pr-0
      `}>
        <div className="h-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border border-brand-100/60 dark:border-zinc-800/50 rounded-[24px] shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden">
          
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/50 dark:text-brand-200/40">Travel Ops</span>
              <h2 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mt-0.5">myTrip.</h2>
            </div>
            <button className="lg:hidden p-2 -mr-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-100 rounded-full hover:bg-brand-100/50 dark:hover:bg-zinc-800 transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
            {navItems.map((item, idx) => (
              <a 
                key={idx} 
                href="#" 
                className={`flex items-center gap-3 px-4 py-3 rounded-[16px] font-semibold text-sm transition-all ${
                  item.active 
                    ? 'bg-brand-500 dark:bg-brand-400 text-white shadow-md shadow-brand-500/20' 
                    : 'text-brand-400/70 dark:text-brand-200/60 hover:bg-brand-100/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100'
                }`}
              >
                <item.icon size={18} className={item.active ? 'opacity-100' : 'opacity-70'} />
                {item.label}
              </a>
            ))}

            <div className="pt-6 pb-2 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/40 dark:text-brand-200/30">Recent</span>
            </div>
            <a href="#" className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-brand-400/70 dark:text-brand-200/60 hover:text-brand-500 dark:hover:text-brand-100 hover:bg-brand-100/30 dark:hover:bg-zinc-800/30 rounded-[14px] transition-colors">
              <span className="truncate">Latin turnebusz</span>
            </a>
            <a href="#" className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-brand-400/70 dark:text-brand-200/60 hover:text-brand-500 dark:hover:text-brand-100 hover:bg-brand-100/30 dark:hover:bg-zinc-800/30 rounded-[14px] transition-colors">
              <span className="truncate">MSC Grandiosa</span>
            </a>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-brand-100/50 dark:border-zinc-800/50 space-y-2">
            <div className="flex items-center justify-between p-1 bg-brand-100/30 dark:bg-zinc-900/50 rounded-[16px] border border-brand-100/50 dark:border-zinc-800/50">
              <button 
                onClick={() => setIsDarkMode(false)} 
                className={`flex-1 flex justify-center items-center py-2 rounded-[12px] text-sm font-semibold transition-all ${!isDarkMode ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' : 'text-brand-400/60 dark:text-brand-200/50 hover:text-brand-500'}`}
              >
                <Sun size={16} />
              </button>
              <button 
                onClick={() => setIsDarkMode(true)} 
                className={`flex-1 flex justify-center items-center py-2 rounded-[12px] text-sm font-semibold transition-all ${isDarkMode ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' : 'text-brand-400/60 dark:text-brand-200/50 hover:text-brand-500'}`}
              >
                <Moon size={16} />
              </button>
            </div>
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-500/80 dark:text-red-400/80 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[16px] transition-colors">
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        {/* Header */}
        <header className="px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2.5 -ml-2 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border border-brand-100/60 dark:border-zinc-800/50 text-brand-500 dark:text-brand-200 rounded-[14px] shadow-sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-500 dark:text-brand-100 tracking-tight hidden sm:block">Overview</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white/60 dark:bg-[#121212]/60 backdrop-blur-md border border-brand-100/60 dark:border-zinc-800/50 rounded-[16px] w-64 lg:w-80 shadow-sm transition-all focus-within:bg-white dark:focus-within:bg-[#121212] focus-within:ring-2 focus-within:ring-brand-300/20">
              <Search size={16} className="text-brand-400/50 dark:text-brand-200/40" />
              <input type="text" placeholder="Search trips..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-brand-400/40 dark:placeholder:text-brand-200/30 text-brand-500 dark:text-brand-100 font-medium" />
            </div>

            <button className="p-2.5 bg-white/60 dark:bg-[#121212]/60 backdrop-blur-md border border-brand-100/60 dark:border-zinc-800/50 text-brand-500 dark:text-brand-200 rounded-[14px] shadow-sm hover:bg-white dark:hover:bg-[#121212] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#121212]"></span>
            </button>

            <div className="h-10 w-10 rounded-[14px] bg-gradient-to-br from-brand-300 to-brand-400 dark:from-brand-400 dark:to-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              M
            </div>
          </div>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 hide-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
            
            <h1 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight sm:hidden">Overview</h1>

            {/* KPI Grid - Ultra Compact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl p-4 sm:p-5 rounded-[20px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 rounded-full bg-brand-100/50 dark:bg-brand-400/20 flex items-center justify-center text-brand-500 dark:text-brand-300">
                    <PlaneTakeoff size={12} />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Active</span>
                </div>
                <strong className="block text-2xl sm:text-3xl font-display font-bold text-brand-500 dark:text-brand-100">1</strong>
              </div>
              
              <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl p-4 sm:p-5 rounded-[20px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100/50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <AlertCircle size={12} />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Action Req</span>
                </div>
                <strong className="block text-2xl sm:text-3xl font-display font-bold text-brand-500 dark:text-brand-100">3</strong>
              </div>

              <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl p-4 sm:p-5 rounded-[20px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 rounded-full bg-brand-100/50 dark:bg-brand-400/20 flex items-center justify-center text-brand-500 dark:text-brand-300">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Completed</span>
                </div>
                <strong className="block text-2xl sm:text-3xl font-display font-bold text-brand-500 dark:text-brand-100">5</strong>
              </div>

              <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl p-4 sm:p-5 rounded-[20px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 rounded-full bg-red-100/50 dark:bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                    <span className="font-bold text-[10px]">Ft</span>
                  </div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Balance</span>
                </div>
                <strong className="block text-xl sm:text-2xl font-display font-bold text-red-500 dark:text-red-400">-1.2M</strong>
              </div>
            </div>

            {/* List Header & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-white/60 dark:bg-[#121212]/60 backdrop-blur-md p-1 rounded-[16px] border border-brand-100/60 dark:border-zinc-800/50 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-sm font-bold rounded-[12px] whitespace-nowrap transition-all ${activeTab === 'all' ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' : 'text-brand-400/60 dark:text-brand-200/50 hover:text-brand-500'}`}
                >
                  All trips <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-brand-100/50 dark:bg-zinc-900 text-[0.65rem]">6</span>
                </button>
                <button 
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 text-sm font-bold rounded-[12px] whitespace-nowrap transition-all ${activeTab === 'active' ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' : 'text-brand-400/60 dark:text-brand-200/50 hover:text-brand-500'}`}
                >
                  Active <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-brand-100/50 dark:bg-zinc-900 text-[0.65rem]">1</span>
                </button>
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 text-sm font-bold rounded-[12px] whitespace-nowrap transition-all ${activeTab === 'past' ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' : 'text-brand-400/60 dark:text-brand-200/50 hover:text-brand-500'}`}
                >
                  Past <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-brand-100/50 dark:bg-zinc-900 text-[0.65rem]">5</span>
                </button>
              </div>

              <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-500 dark:bg-brand-400 text-white rounded-[14px] font-bold hover:bg-brand-400 dark:hover:bg-brand-300 transition-all shadow-sm w-full sm:w-auto">
                <Plus size={18} />
                New Trip
              </button>
            </div>

            {/* Trip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Card 1 */}
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTrip('latin-turnebusz')}
                className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-100/20 to-transparent dark:from-brand-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-amber-100/80 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[0.65rem] font-bold uppercase tracking-wider rounded-full border border-amber-200/50 dark:border-amber-500/20 mb-3">
                      Preparing
                    </span>
                    <h3 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 leading-tight">Latin turnebusz</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-100/50 dark:bg-zinc-800 flex items-center justify-center text-brand-400 dark:text-brand-300 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-400/80 dark:text-brand-200/70 mb-6 relative z-10">
                  <Map size={14} className="opacity-70" />
                  29 Apr 2026 — 11 May 2026
                </div>
                
                <div className="mt-auto pt-5 border-t border-brand-100/60 dark:border-zinc-800/50 flex items-center justify-between relative z-10">
                  <div className="flex gap-6">
                    <div>
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-brand-400/50 dark:text-brand-200/40 mb-0.5">Pax</span>
                      <strong className="text-sm font-bold text-brand-500 dark:text-brand-100">2</strong>
                    </div>
                    <div>
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-brand-400/50 dark:text-brand-200/40 mb-0.5">Lead</span>
                      <strong className="text-sm font-bold text-brand-500 dark:text-brand-100">mistenes</strong>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#121212] bg-brand-200 dark:bg-brand-400 flex items-center justify-center text-[10px] font-bold text-brand-500 dark:text-brand-100">M</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-[#121212] bg-brand-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-brand-500 dark:text-brand-100">+1</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 (Past) */}
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTrip('msc-grandiosa')}
                className="bg-white/50 dark:bg-[#121212]/50 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-brand-100/40 dark:border-zinc-800/30 shadow-[0_8px_30px_rgba(16,35,55,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden group cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              >
                <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-brand-100/50 dark:bg-zinc-800 text-brand-500/70 dark:text-brand-200/60 text-[0.65rem] font-bold uppercase tracking-wider rounded-full mb-3">
                      Completed
                    </span>
                    <h3 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 leading-tight">MSC Grandiosa</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-100/30 dark:bg-zinc-800/50 flex items-center justify-center text-brand-400/50 dark:text-brand-300/50 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-400/60 dark:text-brand-200/50 mb-6 relative z-10">
                  <Map size={14} className="opacity-70" />
                  12 Oct 2025 — 19 Oct 2025
                </div>
                
                <div className="mt-auto pt-5 border-t border-brand-100/40 dark:border-zinc-800/30 flex items-center justify-between relative z-10">
                  <div className="flex gap-6">
                    <div>
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-brand-400/40 dark:text-brand-200/30 mb-0.5">Pax</span>
                      <strong className="text-sm font-bold text-brand-500/80 dark:text-brand-100/80">4</strong>
                    </div>
                    <div>
                      <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-brand-400/40 dark:text-brand-200/30 mb-0.5">Lead</span>
                      <strong className="text-sm font-bold text-brand-500/80 dark:text-brand-100/80">mistenes</strong>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
