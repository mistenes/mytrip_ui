import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, Plus, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  Calendar, FileText, MessageSquare, CreditCard, UserCircle, UsersRound, SlidersHorizontal,
  Phone, Clock, MapPin, Trash2, Edit2, Info
} from 'lucide-react';

export default function Itinerary({ onLogout, isDarkMode, setIsDarkMode, onBack }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const navItems = [
    { icon: Map, label: 'Trips', active: true },
    { icon: FolderOpen, label: 'Files' },
    { icon: Users, label: 'People' },
    { icon: Settings, label: 'Brand settings' },
  ];

  const tripMenu = [
    { icon: Map, label: 'Overview', onClick: onBack },
    { icon: Calendar, label: 'Itinerary', active: true },
    { icon: CreditCard, label: 'Finance' },
    { icon: UserCircle, label: 'Personal data' },
    { icon: FileText, label: 'Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Phone, label: 'Emergency contact' },
    { icon: UsersRound, label: 'Participants' },
    { icon: SlidersHorizontal, label: 'Settings' },
  ];

  const itineraryData = [
    {
      date: 'Saturday, 16 November 2024',
      shortDate: '16 Nov',
      day: 'Saturday',
      items: [
        {
          id: 1,
          title: 'flight',
          time: '08:00 - 11:00',
          timezone: 'Europe/Budapest',
          location: '',
          type: 'required'
        }
      ]
    },
    {
      date: 'Sunday, 17 November 2024',
      shortDate: '17 Nov',
      day: 'Sunday',
      items: [
        {
          id: 2,
          title: 'kukk',
          time: '11:00 - 12:00',
          timezone: 'Europe/Budapest',
          location: 'Marriott Budapest',
          type: 'required'
        }
      ]
    },
    {
      date: 'Monday, 18 November 2024',
      shortDate: '18 Nov',
      day: 'Monday',
      items: [
        {
          id: 3,
          title: 'checkin',
          time: '11:00 - 12:00',
          timezone: 'Asia/Tokyo',
          location: 'Tokyo Haneda Airport',
          type: 'required'
        }
      ]
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'required':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
      case 'free':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'optional':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      default:
        return 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20';
    }
  };

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
          <div className="p-6 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/50 dark:text-brand-200/40">Travel Ops</span>
              <h2 className="font-display text-2xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mt-0.5">myTrip.</h2>
            </div>
            <button className="lg:hidden p-2 -mr-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-100 rounded-full hover:bg-brand-100/50 dark:hover:bg-zinc-800 transition-colors" onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(false); }}>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto hide-scrollbar">
            <div className="mb-6">
              <button className="flex items-center gap-2 text-sm font-bold text-brand-400/70 dark:text-brand-200/60 hover:text-brand-500 dark:hover:text-brand-100 transition-colors px-2 mb-2">
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
              <a 
                key={idx} 
                href="#" 
                className="flex items-center gap-3 px-4 py-2.5 rounded-[14px] font-semibold text-sm text-brand-400/70 dark:text-brand-200/60 hover:bg-brand-100/50 dark:hover:bg-zinc-800/50 hover:text-brand-500 dark:hover:text-brand-100 transition-all"
              >
                <item.icon size={18} className="opacity-70" />
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
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-sm font-bold text-brand-400/60 dark:text-brand-200/50 mb-1">
                <span className="hover:text-brand-500 dark:hover:text-brand-100 cursor-pointer transition-colors" onClick={onBack}>MSC Grandiosa</span>
                <ChevronRight size={14} />
                <span className="text-brand-500 dark:text-brand-100">Itinerary</span>
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
            
            {/* Section Intro Card */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1.5 bg-brand-100/50 dark:bg-zinc-800 text-brand-500/70 dark:text-brand-200/60 text-[0.7rem] font-bold uppercase tracking-widest rounded-full border border-brand-200/30 dark:border-zinc-700">
                    Trip Flow
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-2">
                  Itinerary: MSC Grandiosa
                </h2>
                <p className="text-brand-400/80 dark:text-brand-200/70 text-base max-w-2xl">
                  Keep the schedule easy to follow on desktop and effortless to scan on mobile.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <button className="w-full md:w-auto px-6 py-3 bg-brand-500 dark:bg-brand-400 text-white rounded-[16px] font-bold shadow-sm hover:bg-brand-400 dark:hover:bg-brand-300 transition-colors flex items-center justify-center gap-2">
                  <Plus size={18} /> Add item
                </button>
              </div>
            </div>

            {/* Controls & Legend */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex p-1 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[14px] border border-brand-100/50 dark:border-zinc-800/50 shadow-sm">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${
                    viewMode === 'calendar' 
                      ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' 
                      : 'text-brand-400/70 dark:text-brand-200/50 hover:text-brand-500 dark:hover:text-brand-200'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-[10px] text-sm font-bold transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm' 
                      : 'text-brand-400/70 dark:text-brand-200/50 hover:text-brand-500 dark:hover:text-brand-200'
                  }`}
                >
                  List
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-[0.7rem] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                  Required
                </span>
                <span className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[0.7rem] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                  Free time
                </span>
                <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-[0.7rem] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                  Optional
                </span>
              </div>
            </div>

            {/* Itinerary Content */}
            {viewMode === 'list' ? (
              <div className="space-y-8">
                {itineraryData.map((dayGroup, idx) => (
                  <div key={idx} className="relative">
                    {/* Sticky Date Header */}
                    <div className="sticky top-0 z-20 bg-[#f8f9f8]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md py-3 mb-4 border-b-2 border-brand-200/50 dark:border-brand-400/20">
                      <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100">
                        {dayGroup.date}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {dayGroup.items.map((item) => (
                        <motion.div 
                          key={item.id}
                          whileHover={{ y: -2 }}
                          className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[20px] p-4 sm:p-5 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row gap-4 sm:gap-6 items-start group"
                        >
                          {/* Time Column */}
                          <div className="shrink-0 sm:w-40 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-1.5 w-full sm:w-auto">
                            <div className={`px-3 py-2 rounded-[12px] border ${getTypeStyles(item.type)} flex flex-col items-start w-fit`}>
                              <span className="font-bold text-sm">{item.time}</span>
                              <span className="text-[0.65rem] opacity-80 font-medium">({item.timezone})</span>
                            </div>
                            <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${getTypeStyles(item.type)} border-none bg-transparent sm:mt-1`}>
                              {item.type}
                            </span>
                          </div>

                          {/* Details Column */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-brand-500 dark:text-brand-100 mb-1.5 capitalize">{item.title}</h4>
                            {item.location && (
                              <p className="text-sm font-medium text-brand-400/80 dark:text-brand-200/70 flex items-center gap-1.5">
                                <MapPin size={14} className="opacity-70" /> {item.location}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-brand-100/50 dark:border-zinc-800/50 sm:border-none">
                            <button className="px-4 py-2 bg-brand-50 dark:bg-zinc-800 text-brand-500 dark:text-brand-200 rounded-[12px] text-xs font-bold hover:bg-brand-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5">
                              <Info size={14} /> Details
                            </button>
                            <button className="px-4 py-2 bg-brand-50 dark:bg-zinc-800 text-brand-500 dark:text-brand-200 rounded-[12px] text-xs font-bold hover:bg-brand-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5">
                              <Edit2 size={14} /> Edit
                            </button>
                            <button className="p-2 text-brand-400/60 hover:text-red-500 dark:text-brand-200/40 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[12px] transition-colors ml-auto sm:ml-0">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraryData.map((dayGroup, idx) => (
                  <div key={idx} className="bg-white/60 dark:bg-[#121212]/60 backdrop-blur-xl rounded-[24px] p-5 border border-brand-100/60 dark:border-zinc-800/50 shadow-sm flex flex-col h-full">
                    <div className="pb-4 mb-4 border-b border-brand-100/60 dark:border-zinc-800/50">
                      <h3 className="font-display text-xl font-bold text-brand-500 dark:text-brand-100 flex items-baseline gap-2">
                        {dayGroup.shortDate} <span className="text-sm font-medium text-brand-400/60 dark:text-brand-200/50 font-sans">{dayGroup.day}</span>
                      </h3>
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      {dayGroup.items.map((item) => (
                        <motion.div 
                          key={item.id}
                          whileHover={{ y: -2 }}
                          className="bg-white dark:bg-zinc-900/80 rounded-[16px] p-4 border border-brand-100/80 dark:border-zinc-800 shadow-sm relative group cursor-pointer"
                        >
                          <div className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${
                            item.type === 'required' ? 'bg-red-400' : item.type === 'free' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}></div>
                          
                          <div className="pl-3">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-brand-500 dark:text-brand-100 capitalize pr-12">{item.title}</h4>
                              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/50 dark:hover:text-brand-200 hover:bg-brand-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                  <Edit2 size={14} />
                                </button>
                                <button className="p-1.5 text-brand-400/60 hover:text-red-500 dark:text-brand-200/50 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-xs font-semibold text-brand-500/80 dark:text-brand-200/80">
                                <Clock size={12} className="opacity-70" /> {item.time}
                              </div>
                              {item.location && (
                                <div className="flex items-center gap-2 text-xs font-medium text-brand-400/70 dark:text-brand-200/60">
                                  <MapPin size={12} className="opacity-70" /> {item.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
