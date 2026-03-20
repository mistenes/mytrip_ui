import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, Bell,
  Map, FileText, MessageSquare, UserCircle, ChevronRight,
  Plane, Calendar, CreditCard, Compass
} from 'lucide-react';
import TravelerTripDetail from './TravelerTripDetail';

export default function TravelerDashboard({ onLogout, isDarkMode, setIsDarkMode }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  const navItems = [
    { icon: Compass, label: 'My Trips', active: true },
    { icon: FileText, label: 'My Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: UserCircle, label: 'Profile' },
  ];

  if (selectedTrip) {
    return <TravelerTripDetail onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setSelectedTrip(null)} />;
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
              <h2 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mt-0.5">myTrip.</h2>
            </div>
            <button className="lg:hidden p-2 -mr-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-100 rounded-full hover:bg-brand-100/50 dark:hover:bg-zinc-800 transition-colors" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
            <div className="pt-2 pb-2 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/40 dark:text-brand-200/30">Workspace</span>
            </div>
            {navItems.map((item, idx) => (
              <a 
                key={idx} 
                href="#" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-[14px] font-semibold text-sm transition-all ${
                  item.active 
                    ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' 
                    : 'text-brand-400/70 dark:text-brand-200/60 hover:bg-brand-100/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100'
                }`}
              >
                <item.icon size={18} className={item.active ? 'opacity-100' : 'opacity-70'} />
                {item.label}
              </a>
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
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-500 dark:text-brand-100 tracking-tight hidden sm:block">Welcome, Alex!</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="p-2.5 bg-white/60 dark:bg-[#121212]/60 backdrop-blur-md border border-brand-100/60 dark:border-zinc-800/50 text-brand-500 dark:text-brand-200 rounded-[14px] shadow-sm hover:bg-white dark:hover:bg-[#121212] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#121212]"></span>
            </button>

            <div className="h-10 w-10 rounded-[14px] bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 hide-scrollbar">
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
            
            <h1 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight sm:hidden">Welcome, Alex!</h1>

            {/* Upcoming Trip Hero Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              onClick={() => setSelectedTrip('latin-turnebusz')}
              className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_12px_40px_rgba(16,35,55,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-brand-300/30 to-transparent dark:from-brand-400/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3 transition-opacity group-hover:opacity-80"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-500 dark:bg-brand-400 text-white text-[0.7rem] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      Upcoming Trip
                    </span>
                    <span className="text-sm font-bold text-brand-400/80 dark:text-brand-200/70 flex items-center gap-1.5">
                      <Calendar size={14} /> 29 Apr 2026
                    </span>
                  </div>
                  
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-4 leading-tight">
                    Latin turnebusz
                  </h2>
                  
                  <p className="text-brand-400/80 dark:text-brand-200/70 text-lg max-w-lg mb-8">
                    Get ready for your adventure! Your itinerary, tickets, and important details are all organized here.
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-brand-500 dark:bg-brand-400 text-white rounded-[16px] font-bold shadow-sm hover:bg-brand-400 dark:hover:bg-brand-300 transition-colors flex items-center gap-2">
                      View Details <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Countdown / Status */}
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-6 rounded-[24px] border border-brand-100/80 dark:border-zinc-800 shadow-sm min-w-[200px] shrink-0 text-center">
                  <div className="w-12 h-12 mx-auto bg-brand-100/50 dark:bg-brand-400/20 rounded-full flex items-center justify-center text-brand-500 dark:text-brand-300 mb-3">
                    <Plane size={20} />
                  </div>
                  <strong className="block text-4xl font-display font-bold text-brand-500 dark:text-brand-100 mb-1">45</strong>
                  <span className="block text-[0.75rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Days to go</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Access */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-4 px-2">Quick Access</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: FileText, label: 'Boarding Passes', desc: '2 files ready', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20' },
                  { icon: Calendar, label: 'Daily Schedule', desc: 'View itinerary', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20' },
                  { icon: MessageSquare, label: 'Organizer Chat', desc: '1 unread', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-100 dark:border-purple-500/20' },
                  { icon: CreditCard, label: 'Payments', desc: 'All settled', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', onClick: () => setSelectedTrip('latin-turnebusz-finance') },
                ].map((action, idx) => (
                  <motion.button
                    key={idx}
                    onClick={action.onClick}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex flex-col items-start p-5 rounded-[20px] border ${action.border} bg-white dark:bg-[#121212] shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all group text-left`}
                  >
                    <div className={`w-10 h-10 rounded-full ${action.bg} ${action.color} flex items-center justify-center transition-transform group-hover:scale-110 mb-3`}>
                      <action.icon size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-brand-500 dark:text-brand-100 mb-1">{action.label}</span>
                    <span className="text-xs font-medium text-brand-400/60 dark:text-brand-200/50">{action.desc}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Past Trips */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-4 px-2 mt-8">Past Adventures</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-white/50 dark:bg-[#121212]/50 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-brand-100/40 dark:border-zinc-800/30 shadow-[0_8px_30px_rgba(16,35,55,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden group cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
                    <div>
                      <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100 leading-tight">MSC Grandiosa</h3>
                      <p className="text-xs font-semibold text-brand-400/60 dark:text-brand-200/50 mt-1">Oct 2025</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand-100/30 dark:bg-zinc-800/50 flex items-center justify-center text-brand-400/50 dark:text-brand-300/50 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
