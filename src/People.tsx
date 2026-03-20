import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  UserPlus
} from 'lucide-react';

export default function People({ onLogout, isDarkMode, setIsDarkMode, onBack, onNavigate }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void, onNavigate?: (page: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Map, label: 'Trips' },
    { icon: FolderOpen, label: 'Files' },
    { icon: Users, label: 'People', active: true },
    { icon: Settings, label: 'Brand settings' },
  ];

  const users = [
    { name: 'AndrasBoth', role: 'Traveler' },
    { name: 'Doki', role: 'Traveler' },
    { name: 'Eszter0214', role: 'Traveler' },
    { name: 'FanTom99', role: 'Traveler' },
    { name: 'HWG', role: 'Traveler' },
    { name: 'Kuris', role: 'Traveler' },
    { name: 'Mate Istenes', role: 'Traveler' },
    { name: 'foldertest', role: 'Traveler' },
    { name: 'japantest', role: 'Traveler' },
    { name: 'kukk', role: 'Traveler' },
    { name: 'mistenes', role: 'Admin' },
    { name: 'mistenesfolder', role: 'Traveler' },
    { name: 'olmosiaron', role: 'Traveler' },
    { name: 'register', role: 'Traveler' },
    { name: 'szijjadrian', role: 'Traveler' },
    { name: 'testuser', role: 'Traveler' },
    { name: 'user', role: 'Traveler' },
  ];

  const organizers = users.filter(u => u.role === 'Admin' || u.role === 'Organizer');
  const travelers = users.filter(u => u.role === 'Traveler');

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
          <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => onNavigate && onNavigate('dashboard')}>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mt-0.5">myTrip.</h2>
            </div>
            <button className="lg:hidden p-2 -mr-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-100 rounded-full hover:bg-brand-100/50 dark:hover:bg-zinc-800 transition-colors" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(false); }}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
            <div className="pt-2 pb-2 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/40 dark:text-brand-200/30">Workspace</span>
            </div>
            {navItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.label === 'Files' && onNavigate) onNavigate('files');
                  if (item.label === 'Trips' && onNavigate) onNavigate('dashboard');
                  if (item.label === 'People' && onNavigate) onNavigate('people');
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] font-semibold text-sm transition-all ${
                  item.active 
                    ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' 
                    : 'text-brand-400/70 dark:text-brand-200/60 hover:bg-brand-100/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100'
                }`}
              >
                <item.icon size={18} className={item.active ? 'opacity-100' : 'opacity-70'} />
                {item.label}
              </button>
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
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-500 dark:text-brand-100 tracking-tight hidden sm:block">People</h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
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
            
            <h1 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight sm:hidden mb-4">People</h1>

            {/* Hero Section */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-200/20 to-transparent dark:from-brand-400/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-100/50 dark:bg-zinc-800 text-brand-500/70 dark:text-brand-200/60 text-[0.7rem] font-bold uppercase tracking-widest rounded-full border border-brand-200/30 dark:border-zinc-700">
                      Workspace
                    </span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-4 leading-tight">
                    People
                  </h1>
                  
                  <p className="text-brand-400/80 dark:text-brand-200/70 text-lg leading-relaxed max-w-[60ch]">
                    Manage organizers, travelers, trip assignments, and invite status from one workspace.
                  </p>
                </div>

                <div className="shrink-0">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-500 dark:bg-brand-400 text-white font-semibold rounded-[16px] hover:bg-brand-500/90 dark:hover:bg-brand-400/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <UserPlus size={18} />
                    Send invite
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">Organizers ({organizers.length})</h3>
              {organizers.length === 0 ? (
                <p className="text-brand-400/70 dark:text-brand-200/60">No organizers yet.</p>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
                  {organizers.map((user, idx) => (
                    <div key={idx} className={`backdrop-blur-xl rounded-[20px] p-5 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform cursor-pointer ${
                      user.role === 'Admin' 
                        ? 'bg-gradient-to-br from-purple-500/5 to-white/80 dark:from-purple-500/10 dark:to-[#121212]/80 border border-purple-500/20 dark:border-purple-500/30' 
                        : 'bg-white/80 dark:bg-[#121212]/80 border border-brand-100/60 dark:border-zinc-800/50'
                    }`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 shadow-sm ${
                        user.role === 'Admin'
                          ? 'bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700'
                          : 'bg-gradient-to-br from-brand-300 to-brand-400 dark:from-brand-400 dark:to-brand-500'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-bold text-brand-500 dark:text-brand-100 mb-1 truncate w-full">{user.name}</div>
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-[0.7rem] font-bold uppercase tracking-widest ${
                        user.role === 'Admin'
                          ? 'bg-purple-100/50 dark:bg-purple-500/20 border border-purple-200/50 dark:border-purple-500/30 text-purple-600 dark:text-purple-300'
                          : 'bg-brand-100/50 dark:bg-zinc-800 border border-brand-200/30 dark:border-zinc-700 text-brand-500/70 dark:text-brand-300'
                      }`}>
                        {user.role}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">Other users ({travelers.length})</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
                {travelers.map((user, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border border-brand-100/60 dark:border-zinc-800/50 rounded-[20px] p-5 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col items-center text-center hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-brand-100/50 dark:bg-zinc-800 flex items-center justify-center text-brand-500 dark:text-brand-200 font-bold text-xl mb-3">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="font-bold text-brand-500 dark:text-brand-100 mb-1 truncate w-full">{user.name}</div>
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-brand-50/50 dark:bg-zinc-800/50 border border-brand-100/50 dark:border-zinc-700/50 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-300/70">
                      {user.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
