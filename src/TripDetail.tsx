import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Sun, Moon, LogOut, Menu, X, Plus, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  PlaneTakeoff, CheckCircle2, AlertCircle,
  Calendar, FileText, MessageSquare, CreditCard, UserCircle, UsersRound, SlidersHorizontal,
  Phone
} from 'lucide-react';
import Itinerary from './Itinerary';
import Finance from './Finance';

export default function TripDetail({ onLogout, isDarkMode, setIsDarkMode, onBack, onNavigate }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void, onNavigate?: (page: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'itinerary' | 'finance'>('overview');

  const navItems = [
    { icon: Map, label: 'Trips', active: true },
    { icon: FolderOpen, label: 'Files' },
    { icon: Users, label: 'People' },
    { icon: Settings, label: 'Brand settings' },
  ];

  const tripMenu = [
    { icon: Map, label: 'Overview', active: activeView === 'overview', onClick: () => setActiveView('overview') },
    { icon: Calendar, label: 'Itinerary', active: activeView === 'itinerary', onClick: () => setActiveView('itinerary') },
    { icon: CreditCard, label: 'Finance', active: activeView === 'finance', onClick: () => setActiveView('finance') },
    { icon: UserCircle, label: 'Personal data' },
    { icon: FileText, label: 'Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Phone, label: 'Emergency contact' },
    { icon: UsersRound, label: 'Participants' },
    { icon: SlidersHorizontal, label: 'Settings' },
  ];

  if (activeView === 'itinerary') {
    return <Itinerary onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setActiveView('overview')} onNavigate={onNavigate} />;
  }
  
  if (activeView === 'finance') {
    return <Finance onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setActiveView('overview')} onNavigate={onNavigate} />;
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
          <div className="p-6 flex items-center justify-between cursor-pointer" onClick={onBack}>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mt-0.5">myTrip.</h2>
            </div>
            <button className="lg:hidden p-2 -mr-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-100 rounded-full hover:bg-brand-100/50 dark:hover:bg-zinc-800 transition-colors" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(false); }}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
            <div className="mb-6">
              <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-brand-400/70 dark:text-brand-200/60 hover:text-brand-500 dark:hover:text-brand-100 transition-colors px-2 mb-2">
                <ChevronRight size={16} className="rotate-180" /> Back to Trips
              </button>
              
              <div className="bg-brand-100/30 dark:bg-zinc-900/50 rounded-[16px] p-2 mt-2">
                <div className="px-3 py-2 mb-1">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/50 dark:text-brand-200/40 block mb-1">Current Trip</span>
                  <strong className="text-sm font-bold text-brand-500 dark:text-brand-100 truncate block">MSC Grandiosa</strong>
                </div>
                
                <ul className="space-y-0.5">
                  {tripMenu.map((item, idx) => (
                    <li key={idx}>
                      <button onClick={item.onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-[12px] text-sm font-semibold transition-all ${
                        item.active 
                          ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' 
                          : 'text-brand-400/70 dark:text-brand-200/60 hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100'
                      }`}>
                        <item.icon size={16} className={item.active ? 'opacity-100 text-brand-400 dark:text-brand-300' : 'opacity-70'} />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 pb-2 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/40 dark:text-brand-200/30">Workspace</span>
            </div>
            {navItems.slice(1).map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.label === 'Files' && onNavigate) onNavigate('files');
                  if (item.label === 'Trips' && onNavigate) onNavigate('dashboard');
                  if (item.label === 'People' && onNavigate) onNavigate('people');
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] font-semibold text-sm text-brand-400/70 dark:text-brand-200/60 hover:bg-brand-100/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100 transition-all"
              >
                <item.icon size={18} className="opacity-70" />
                {item.label}
              </button>
            ))}
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
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-400/60 dark:text-brand-200/50 mb-1">
                <span className="hover:text-brand-500 dark:hover:text-brand-100 cursor-pointer transition-colors" onClick={onBack}>Trips</span>
                <ChevronRight size={14} />
                <span className="text-brand-500 dark:text-brand-100">MSC Grandiosa</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="p-2.5 bg-white/60 dark:bg-[#121212]/60 backdrop-blur-md border border-brand-100/60 dark:border-zinc-800/50 text-brand-500 dark:text-brand-200 rounded-[14px] shadow-sm hover:bg-white dark:hover:bg-[#121212] transition-colors relative">
              <Bell size={20} />
            </button>

            <div className="h-10 w-10 rounded-[14px] bg-gradient-to-br from-brand-300 to-brand-400 dark:from-brand-400 dark:to-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              M
            </div>
          </div>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 hide-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Hero Section - Redesigned to be less cluttered */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-200/20 to-transparent dark:from-brand-400/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-100/50 dark:bg-zinc-800 text-brand-500/70 dark:text-brand-200/60 text-[0.7rem] font-bold uppercase tracking-widest rounded-full border border-brand-200/30 dark:border-zinc-700">
                      Trip Cockpit
                    </span>
                    <span className="px-3 py-1.5 bg-brand-500/5 dark:bg-brand-400/10 text-brand-500 dark:text-brand-300 text-[0.7rem] font-bold uppercase tracking-widest rounded-full border border-brand-500/10 dark:border-brand-400/20 flex items-center gap-1.5">
                      <CheckCircle2 size={12} /> Completed
                    </span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-4 leading-tight">
                    MSC Grandiosa
                  </h1>
                  
                  <p className="text-brand-400/80 dark:text-brand-200/70 text-lg leading-relaxed">
                    Everything this trip needs lives here: schedule, files, communications, traveler data, and payment activity.
                  </p>
                </div>

                {/* Key Dates Card - Moved from below to hero */}
                <div className="bg-white dark:bg-zinc-900/80 p-5 rounded-[20px] border border-brand-100/80 dark:border-zinc-800 shadow-sm min-w-[240px] shrink-0">
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-2">Trip Window</span>
                  <strong className="block text-lg font-bold text-brand-500 dark:text-brand-100 mb-4">16 Nov 2024<br/><span className="text-brand-400/50 dark:text-brand-200/40 text-sm font-medium">to</span> 18 Nov 2024</strong>
                  
                  <div className="pt-4 border-t border-brand-100/60 dark:border-zinc-800/80">
                    <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Status</span>
                    <span className="text-sm font-semibold text-brand-500 dark:text-brand-200">The trip has wrapped. Final documentation pending.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid - Replaces the old "Summary Tiles" */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-4 px-2">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {[
                  { icon: Calendar, label: 'Itinerary', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20', onClick: () => setActiveView('itinerary') },
                  { icon: FileText, label: 'Documents', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20' },
                  { icon: MessageSquare, label: 'Messages', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-100 dark:border-purple-500/20' },
                  { icon: CreditCard, label: 'Finance', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', onClick: () => setActiveView('finance') },
                  { icon: UserCircle, label: 'Personal', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10', border: 'border-rose-100 dark:border-rose-500/20' },
                  { icon: UsersRound, label: 'People', color: 'text-brand-500 dark:text-brand-300', bg: 'bg-brand-50 dark:bg-brand-400/10', border: 'border-brand-100 dark:border-brand-400/20' },
                ].map((action, idx) => (
                  <motion.button
                    key={idx}
                    onClick={action.onClick}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-[20px] border ${action.border} bg-white dark:bg-[#121212] shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all group`}
                  >
                    <div className={`w-10 h-10 rounded-full ${action.bg} ${action.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <action.icon size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-brand-500 dark:text-brand-100">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Two Column Layout for Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">Operational Overview</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 rounded-[16px] bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/50 dark:border-zinc-800/50">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Duration</span>
                      <strong className="text-xl font-bold text-brand-500 dark:text-brand-100">3 days</strong>
                    </div>
                    <div className="p-4 rounded-[16px] bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/50 dark:border-zinc-800/50">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Travelers</span>
                      <strong className="text-xl font-bold text-brand-500 dark:text-brand-100">3 pax</strong>
                    </div>
                    <div className="p-4 rounded-[16px] bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/50 dark:border-zinc-800/50 col-span-2 flex items-center justify-between">
                      <div>
                        <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Lead Organizer</span>
                        <strong className="text-sm font-bold text-brand-500 dark:text-brand-100">mistenes</strong>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#121212] bg-brand-200 dark:bg-brand-400 flex items-center justify-center text-xs font-bold text-brand-500 dark:text-brand-100 shadow-sm">M</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar info */}
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                      <Phone size={14} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-500 dark:text-brand-100">Emergency Contact</h3>
                  </div>
                  <p className="text-sm text-brand-400/70 dark:text-brand-200/60 leading-relaxed mb-4">
                    Published organizer contacts for quick traveler access and support.
                  </p>
                  <div className="p-4 rounded-[16px] border border-dashed border-brand-200/50 dark:border-zinc-700 bg-brand-50/30 dark:bg-zinc-900/30 text-center">
                    <span className="text-sm font-medium text-brand-400/60 dark:text-brand-200/50">No contact published yet.</span>
                  </div>
                  <button className="w-full mt-4 py-2.5 px-4 bg-white dark:bg-zinc-800 border border-brand-200/50 dark:border-zinc-700 text-brand-500 dark:text-brand-100 rounded-[12px] text-sm font-bold hover:bg-brand-50 dark:hover:bg-zinc-700 transition-colors shadow-sm">
                    Add Contact
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
