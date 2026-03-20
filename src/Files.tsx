import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  Calendar, FileText, MessageSquare, CreditCard, UserCircle, UsersRound, SlidersHorizontal,
  Phone, Plus, Edit2, Trash2, Download, Search, Filter, ArrowUpRight
} from 'lucide-react';

export default function Files({ onLogout, isDarkMode, setIsDarkMode, onBack, onNavigate }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void, onNavigate?: (page: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Map, label: 'Trips' },
    { icon: FolderOpen, label: 'Files', active: true },
    { icon: Users, label: 'People' },
    { icon: Settings, label: 'Brand settings' },
  ];

  const files = [
    { id: 1, name: 'Trip_Itinerary_Sep_2025.pdf', participant: 'olmosiaron', trip: "Törökország '25", category: 'General', date: '2025-07-22' },
    { id: 2, name: 'Trip_Itinerary_Sep_2025.pdf', participant: 'Eszter0214', trip: "Törökország '25", category: 'Tickets', date: '2025-07-22' },
    { id: 3, name: 'KD_BUD_MXP_Wizz Air.pdf', participant: 'Kuris', trip: 'Japán 2025', category: 'Boarding Passes', date: '2025-02-25' },
    { id: 4, name: 'KD_BUD_MXP_Wizz Air.pkpass', participant: 'Kuris', trip: 'Japán 2025', category: 'Boarding Passes', date: '2025-02-25' },
    { id: 5, name: 'CSE_BUD_MXP_Wizz Air.pkpass', participant: 'Eszter0214', trip: 'Japán 2025', category: 'Boarding Passes', date: '2025-02-25' },
    { id: 6, name: 'CSE_BUD_MXP_Wizz Air.pdf', participant: 'Eszter0214', trip: 'Japán 2025', category: 'Boarding Passes', date: '2025-02-25' },
    { id: 7, name: 'tk budayt.pdf', participant: 'Eszter0214', trip: "Törökország '25", category: 'Tickets', date: '2025-02-24' },
    { id: 8, name: 'tk budayt.pdf', participant: 'olmosiaron', trip: "Törökország '25", category: 'Tickets', date: '2025-02-24' },
    { id: 9, name: 'ISTNESMATE.pkpass', participant: 'Mate Istenes', trip: 'MSC Grandiosa', category: 'Boarding Passes', date: '2024-11-19' },
    { id: 10, name: 'MATE_ISTENES.pdf', participant: 'Mate Istenes', trip: 'MSC Grandiosa', category: 'Boarding Passes', date: '2024-11-19' },
  ];

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
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-500 dark:text-brand-100 tracking-tight hidden sm:block">Files</h1>
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
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 pb-12 hide-scrollbar">
          <div className="max-w-[1260px] mx-auto space-y-5">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-white/90 to-[#f4f8fc]/90 dark:from-[#121212]/90 dark:to-[#1a1a1a]/90 backdrop-blur-xl rounded-[26px] p-6 sm:p-8 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_14px_30px_rgba(16,35,55,0.08)] flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center px-3 py-1 bg-white/50 dark:bg-zinc-800/50 text-[#0d8b7b] dark:text-brand-300 text-[0.78rem] font-bold uppercase tracking-[0.08em] rounded-full border border-white/60 dark:border-zinc-700">
                  File library
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight leading-tight m-0">
                  All files
                </h2>
                <p className="text-[#4f647a] dark:text-brand-200/70 text-base max-w-[64ch] m-0">
                  Browse uploaded files across trips with a mobile-safe card layout and a dense desktop table.
                </p>
              </div>
              
              <div className="shrink-0 flex items-center justify-center min-h-[46px] px-5 bg-[#f7fafc] dark:bg-zinc-800 text-[#4f647a] dark:text-brand-300 border border-[#cfdbe7] dark:border-zinc-700 text-[0.9rem] font-semibold rounded-full">
                42 files
              </div>
            </div>

            {/* Filters */}
            <div className="bg-gradient-to-b from-white/90 to-[#f4f8fc]/90 dark:from-[#121212]/90 dark:to-[#1a1a1a]/90 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_14px_30px_rgba(16,35,55,0.08)]">
              <div className="space-y-2">
                <label className="block font-medium text-[#0f2236] dark:text-brand-100">Participant filter</label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4f647a] dark:text-brand-200/60" size={18} />
                  <select className="w-full min-h-[46px] pl-11 pr-4 py-2.5 bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 rounded-[14px] text-base text-[#0f2236] dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-[#0d8b7b]/30 appearance-none">
                    <option value="">All participants</option>
                    <option value="Mate Istenes">Mate Istenes</option>
                    <option value="foldertest">foldertest</option>
                    <option value="mistenes">mistenes</option>
                    <option value="user">user</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Files Table */}
            <div className="bg-white dark:bg-zinc-900 rounded-[22px] border border-[#cfdbe7] dark:border-zinc-800 shadow-[0_14px_30px_rgba(16,35,55,0.08)] overflow-hidden">
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f2f7fb] dark:bg-zinc-800/50 border-b border-[#cfdbe7] dark:border-zinc-800">
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Name</th>
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Participant</th>
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Trip</th>
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Category</th>
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Uploaded</th>
                      <th className="px-6 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cfdbe7] dark:divide-zinc-800">
                    {files.map((file) => (
                      <tr key={file.id} className="hover:bg-[#f2f7fb]/50 dark:hover:bg-zinc-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0d8b7b]/10 text-[#0d8b7b] flex items-center justify-center shrink-0">
                              <FileText size={16} />
                            </div>
                            <span className="text-sm font-bold text-[#0f2236] dark:text-brand-100 truncate max-w-[200px]">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-[#4f647a] dark:text-brand-200/70">{file.participant}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-[#4f647a] dark:text-brand-200/70">{file.trip}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 text-xs font-semibold text-[#4f647a] dark:text-brand-300">
                            {file.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-[#4f647a] dark:text-brand-200/60">{file.date}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#cfdbe7] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#0f2236] dark:text-brand-200 text-[0.85rem] font-semibold hover:bg-[#0d8b7b] hover:border-[#0d8b7b] hover:text-white transition-all opacity-0 group-hover:opacity-100">
                            Open <ArrowUpRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile View */}
              <div className="md:hidden divide-y divide-[#cfdbe7] dark:divide-zinc-800">
                {files.map((file) => (
                  <div key={file.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-[12px] bg-[#0d8b7b]/10 text-[#0d8b7b] flex items-center justify-center shrink-0 mt-1">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <strong className="block text-[#0f2236] dark:text-brand-100 truncate mb-1">{file.name}</strong>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#4f647a] dark:text-brand-200/60">
                          <span>{file.participant}</span>
                          <span>•</span>
                          <span>{file.trip}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 text-xs font-semibold text-[#4f647a] dark:text-brand-300">
                        {file.category}
                      </span>
                      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[12px] border border-[#cfdbe7] dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#0f2236] dark:text-brand-200 text-sm font-semibold hover:bg-[#0d8b7b] hover:border-[#0d8b7b] hover:text-white transition-all">
                        Open <ArrowUpRight size={14} />
                      </button>
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
