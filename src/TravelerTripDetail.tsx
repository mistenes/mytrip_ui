import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, 
  Map, FileText, MessageSquare, UserCircle, ChevronRight,
  Plane, Calendar, CreditCard, Compass, Clock, MapPin, Phone
} from 'lucide-react';
import TravelerFinance from './TravelerFinance';

export default function TravelerTripDetail({ onLogout, isDarkMode, setIsDarkMode, onBack }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'finance'>('overview');

  const navItems = [
    { icon: Compass, label: 'My Trips', active: true },
    { icon: FileText, label: 'My Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: UserCircle, label: 'Profile' },
  ];

  const tripMenu = [
    { icon: Compass, label: 'Journey Overview', active: activeView === 'overview', onClick: () => setActiveView('overview') },
    { icon: Calendar, label: 'Itinerary' },
    { icon: FileText, label: 'Tickets & Docs' },
    { icon: CreditCard, label: 'Payments', active: activeView === 'finance', onClick: () => setActiveView('finance') },
    { icon: MessageSquare, label: 'Organizer Chat' },
  ];

  if (activeView === 'finance') {
    return <TravelerFinance onLogout={onLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setActiveView('overview')} />;
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
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/50 dark:text-brand-200/40">Traveler Portal</span>
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
                <ChevronRight size={16} className="rotate-180" /> Back to Dashboard
              </button>
              
              <div className="bg-brand-100/30 dark:bg-zinc-900/50 rounded-[16px] p-2 mt-2">
                <div className="px-3 py-2 mb-1">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/50 dark:text-brand-200/40 block mb-1">Your Trip</span>
                  <strong className="text-sm font-bold text-brand-500 dark:text-brand-100 truncate block">Latin turnebusz</strong>
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
                <span className="hover:text-brand-500 dark:hover:text-brand-100 cursor-pointer transition-colors" onClick={onBack}>My Trips</span>
                <ChevronRight size={14} />
                <span className="text-brand-500 dark:text-brand-100">Latin turnebusz</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <div className="h-10 w-10 rounded-[14px] bg-gradient-to-br from-emerald-300 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-12 hide-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Hero Section */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-300/20 to-transparent dark:from-brand-400/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-500 dark:bg-brand-400 text-white text-[0.7rem] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      Your Journey
                    </span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-4 leading-tight">
                    Latin turnebusz
                  </h1>
                  
                  <div className="flex items-center gap-4 text-brand-400/80 dark:text-brand-200/70 text-lg font-medium">
                    <span className="flex items-center gap-2"><Calendar size={18} /> Apr 29 - May 11, 2026</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="bg-brand-50/80 dark:bg-zinc-900/80 p-5 rounded-[20px] border border-brand-100/80 dark:border-zinc-800 shadow-sm min-w-[180px] shrink-0 text-center">
                  <strong className="block text-4xl font-display font-bold text-brand-500 dark:text-brand-100 mb-1">45</strong>
                  <span className="block text-[0.75rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50">Days until departure</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left Column - Main Details */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                
                {/* Next Up / Itinerary Highlight */}
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">First Day Highlight</h3>
                    <button className="text-sm font-bold text-brand-400 hover:text-brand-500 dark:text-brand-300 dark:hover:text-brand-100 transition-colors">View full itinerary</button>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-100/50 dark:bg-brand-400/20 flex items-center justify-center text-brand-500 dark:text-brand-300 z-10">
                        <Plane size={18} />
                      </div>
                      <div className="w-0.5 h-full bg-brand-100 dark:bg-zinc-800 my-2"></div>
                    </div>
                    <div className="pb-6">
                      <span className="text-sm font-bold text-brand-400/80 dark:text-brand-200/70 block mb-1">Apr 29, 10:00 AM</span>
                      <strong className="text-lg font-bold text-brand-500 dark:text-brand-100 block mb-2">Flight to Destination</strong>
                      <p className="text-sm text-brand-400/70 dark:text-brand-200/60">Meet at Terminal 2, Gate B45. Don't forget your passport and boarding pass.</p>
                    </div>
                  </div>
                </div>

                {/* Important Documents */}
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">Ready for Download</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-[16px] border border-brand-100/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex items-center gap-4 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-[12px] bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-brand-500 dark:text-brand-100">Flight Tickets.pdf</strong>
                        <span className="text-xs text-brand-400/60 dark:text-brand-200/50">Added 2 days ago</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-[16px] border border-brand-100/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex items-center gap-4 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 rounded-[12px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText size={20} />
                      </div>
                      <div>
                        <strong className="block text-sm font-bold text-brand-500 dark:text-brand-100">Hotel Voucher.pdf</strong>
                        <span className="text-xs text-brand-400/60 dark:text-brand-200/50">Added yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar info */}
              <div className="space-y-6 sm:space-y-8">
                
                {/* Organizer Info */}
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <h3 className="font-display text-lg font-bold text-brand-500 dark:text-brand-100 mb-4">Your Guide</h3>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#121212] bg-brand-200 dark:bg-brand-400 flex items-center justify-center text-sm font-bold text-brand-500 dark:text-brand-100 shadow-sm">M</div>
                    <div>
                      <strong className="block text-sm font-bold text-brand-500 dark:text-brand-100">mistenes</strong>
                      <span className="text-xs text-brand-400/60 dark:text-brand-200/50">Lead Organizer</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 px-4 bg-brand-50 dark:bg-brand-400/10 border border-brand-200/50 dark:border-brand-400/20 text-brand-500 dark:text-brand-300 rounded-[12px] text-sm font-bold hover:bg-brand-100 dark:hover:bg-brand-400/20 transition-colors flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Message Organizer
                  </button>
                </div>

                {/* Emergency Contact */}
                <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                      <Phone size={14} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-500 dark:text-brand-100">Emergency</h3>
                  </div>
                  <div className="p-4 rounded-[16px] border border-dashed border-brand-200/50 dark:border-zinc-700 bg-brand-50/30 dark:bg-zinc-900/30 text-center">
                    <span className="text-sm font-medium text-brand-400/60 dark:text-brand-200/50">Organizer hasn't published emergency contacts yet.</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
