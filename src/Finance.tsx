import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  Calendar, FileText, MessageSquare, CreditCard, UserCircle, UsersRound, SlidersHorizontal,
  Phone, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export default function Finance({ onLogout, isDarkMode, setIsDarkMode, onBack, onNavigate }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void, onNavigate?: (page: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Map, label: 'Trips', active: true },
    { icon: FolderOpen, label: 'Files' },
    { icon: Users, label: 'People' },
    { icon: Settings, label: 'Brand settings' },
  ];

  const tripMenu = [
    { icon: Map, label: 'Overview', onClick: onBack },
    { icon: Calendar, label: 'Itinerary' },
    { icon: CreditCard, label: 'Finance', active: true },
    { icon: UserCircle, label: 'Personal data' },
    { icon: FileText, label: 'Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Phone, label: 'Emergency contact' },
    { icon: UsersRound, label: 'Participants' },
    { icon: SlidersHorizontal, label: 'Settings' },
  ];

  const transactions = [
    { id: 1, participant: 'foldertest', date: '2024-11-14', description: 'Stripe Top-up', amount: 200, type: 'credit' },
    { id: 2, participant: 'foldertest', date: '2024-11-13', description: 'Top-up', amount: 100, type: 'credit' },
    { id: 3, participant: 'mistenes', date: '2024-11-10', description: 'Flight Ticket', amount: -150, type: 'expense' },
  ];

  const balances = [
    { name: 'Mate Istenes', amount: 0 },
    { name: 'foldertest', amount: 300 },
    { name: 'mistenes', amount: -150 },
    { name: 'user', amount: 0 },
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
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 pb-12 hide-scrollbar">
          <div className="max-w-[1260px] mx-auto space-y-5">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-white/90 to-[#f7f1e8]/90 dark:from-[#121212]/90 dark:to-[#1a1a1a]/90 backdrop-blur-xl rounded-[28px] p-6 sm:p-8 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_24px_60px_rgba(18,35,52,0.1)] relative overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#de8a3e]/10 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex-1 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/50 dark:bg-zinc-800/50 text-[#0d8b7b] dark:text-brand-300 text-[0.78rem] font-bold uppercase tracking-[0.08em] rounded-full border border-white/60 dark:border-zinc-700">
                  Finance desk
                </span>
                
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight leading-tight">
                  Finance: MSC Grandiosa
                </h2>
                
                <p className="text-[#4f647a] dark:text-brand-200/70 text-base max-w-[62ch] leading-relaxed">
                  Track manual finance records, online credits, and participant balances from one clean workspace.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center min-h-[2rem] px-3 py-1.5 bg-[#f2f7fb] dark:bg-zinc-800 text-[#4f647a] dark:text-brand-300 border border-[#0d8b7b]/10 dark:border-zinc-700 text-[0.82rem] font-semibold rounded-full">
                    Staff view
                  </span>
                  <span className="inline-flex items-center min-h-[2rem] px-3 py-1.5 bg-[#f2f7fb] dark:bg-zinc-800 text-[#4f647a] dark:text-brand-300 border border-[#0d8b7b]/10 dark:border-zinc-700 text-[0.82rem] font-semibold rounded-full">
                    4 participants · 3 visible records
                  </span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="relative z-10 shrink-0 w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <div className="bg-gradient-to-br from-[#0d8b7b]/10 to-white/90 dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-[18px] border border-[#0d8b7b]/10 dark:border-zinc-700 shadow-sm">
                  <h4 className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-[#4f647a] dark:text-brand-200/60 mb-1">Visible transactions</h4>
                  <p className="text-2xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight">3</p>
                </div>
                <div className="bg-gradient-to-br from-[#274a70]/10 to-white/90 dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-[18px] border border-[#0d8b7b]/10 dark:border-zinc-700 shadow-sm">
                  <h4 className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-[#4f647a] dark:text-brand-200/60 mb-1">Online payments</h4>
                  <p className="text-2xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight">0</p>
                </div>
                <div className="bg-gradient-to-br from-[#d98634]/10 to-white/90 dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-[18px] border border-[#0d8b7b]/10 dark:border-zinc-700 shadow-sm">
                  <h4 className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-[#4f647a] dark:text-brand-200/60 mb-1">Outstanding balances</h4>
                  <p className="text-2xl font-bold text-[#158f5f] dark:text-emerald-400 tracking-tight">150 HUF</p>
                </div>
              </div>
            </div>

            {/* Balances Section */}
            <section className="bg-gradient-to-b from-[#f4f8fc] to-white dark:from-[#121212] dark:to-[#0a0a0a] rounded-[22px] p-6 sm:p-8 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_14px_30px_rgba(16,35,55,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight mb-1">Balances</h3>
                  <p className="text-[#4f647a] dark:text-brand-200/60">See who is still outstanding and who is already fully credited.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {balances.map((balance, idx) => (
                  <div key={idx} className="bg-white dark:bg-zinc-900 rounded-[18px] p-5 border border-[#cfdbe7] dark:border-zinc-800 shadow-[0_8px_18px_rgba(18,35,52,0.05)]">
                    <h4 className="text-[0.9rem] font-bold uppercase tracking-[0.05em] text-[#4f647a] dark:text-brand-200/60 truncate mb-1">{balance.name}</h4>
                    <p className={`text-2xl font-bold tracking-tight ${balance.amount >= 0 ? 'text-[#158f5f] dark:text-emerald-400' : 'text-[#c93e5e] dark:text-red-400'}`}>
                      {balance.amount > 0 ? '+' : ''}{balance.amount} HUF
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Add Manual Record Section */}
            <section className="bg-gradient-to-b from-[#f4f8fc] to-white dark:from-[#121212] dark:to-[#0a0a0a] rounded-[22px] p-6 sm:p-8 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_14px_30px_rgba(16,35,55,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight mb-1">Add manual record</h3>
                  <p className="text-[#4f647a] dark:text-brand-200/60">Use manual entries for offline payments, shared costs, and later adjustments.</p>
                </div>
              </div>
              
              <form className="bg-white dark:bg-zinc-900 rounded-[18px] p-6 border border-[#cfdbe7] dark:border-zinc-800 shadow-[0_8px_18px_rgba(18,35,52,0.05)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="block font-medium text-[#0f2236] dark:text-brand-100">Participant</label>
                    <select className="w-full min-h-[46px] px-4 py-2.5 bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 rounded-lg text-base text-[#0f2236] dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-[#0d8b7b]/30">
                      <option>Mate Istenes</option>
                      <option>foldertest</option>
                      <option>mistenes</option>
                      <option>user</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-[#0f2236] dark:text-brand-100">Description</label>
                    <input type="text" required className="w-full min-h-[46px] px-4 py-2.5 bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 rounded-lg text-base text-[#0f2236] dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-[#0d8b7b]/30" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block font-medium text-[#0f2236] dark:text-brand-100">Amount (HUF)</label>
                    <input type="number" required className="w-full min-h-[46px] px-4 py-2.5 bg-[#f2f7fb] dark:bg-zinc-800 border border-[#cfdbe7] dark:border-zinc-700 rounded-lg text-base text-[#0f2236] dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-[#0d8b7b]/30" />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium text-[#0f2236] dark:text-brand-100">Type</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="type" value="expense" defaultChecked className="w-4 h-4 text-[#0d8b7b] focus:ring-[#0d8b7b]" />
                        <span className="text-[#0f2236] dark:text-brand-100">Expense</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="type" value="payment" className="w-4 h-4 text-[#0d8b7b] focus:ring-[#0d8b7b]" />
                        <span className="text-[#0f2236] dark:text-brand-100">Credit</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-[#0d8b7b] to-[#0b7567] text-white rounded-[16px] font-bold shadow-[0_10px_24px_rgba(18,35,52,0.08)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(18,35,52,0.12)] transition-all">
                  Add record
                </button>
              </form>
            </section>

            {/* Transactions Section */}
            <section className="bg-gradient-to-b from-[#f4f8fc] to-white dark:from-[#121212] dark:to-[#0a0a0a] rounded-[22px] p-6 sm:p-8 border border-[#0d8b7b]/10 dark:border-zinc-800/50 shadow-[0_14px_30px_rgba(16,35,55,0.08)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0f2236] dark:text-brand-100 tracking-tight mb-1">Transactions</h3>
                  <p className="text-[#4f647a] dark:text-brand-200/60">Every visible ledger item, with mobile cards for quick scanning and desktop table editing for dense work.</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 rounded-[18px] border border-[#cfdbe7] dark:border-zinc-800 shadow-[0_8px_18px_rgba(18,35,52,0.05)] overflow-hidden">
                <div className="overflow-x-auto hidden md:block">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f2f7fb] dark:bg-zinc-800/50 border-b border-[#cfdbe7] dark:border-zinc-800">
                        <th className="px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Participant</th>
                        <th className="px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Date</th>
                        <th className="px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Description</th>
                        <th className="px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Amount (HUF)</th>
                        <th className="px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.05em] text-[#0f2236] dark:text-brand-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cfdbe7] dark:divide-zinc-800">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-[#f2f7fb]/50 dark:hover:bg-zinc-800/30 transition-colors">
                          <td className="px-4 py-4 text-[#0f2236] dark:text-brand-100">{tx.participant}</td>
                          <td className="px-4 py-4 text-[#0f2236] dark:text-brand-100">{tx.date}</td>
                          <td className="px-4 py-4 text-[#0f2236] dark:text-brand-100">{tx.description}</td>
                          <td className={`px-4 py-4 font-medium ${tx.type === 'credit' ? 'text-[#158f5f] dark:text-emerald-400' : 'text-[#c93e5e] dark:text-red-400'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#cfdbe7] dark:border-zinc-700 bg-[#f2f7fb] dark:bg-zinc-800 text-[#0f2236] dark:text-brand-200 text-[0.9rem] hover:bg-[#0d8b7b] hover:border-[#0d8b7b] hover:text-white transition-all">
                                <Edit2 size={14} /> Edit
                              </button>
                              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#cfdbe7] dark:border-zinc-700 bg-[#f2f7fb] dark:bg-zinc-800 text-[#c93e5e] dark:text-red-400 text-[0.9rem] hover:bg-[#c93e5e] hover:border-[#c93e5e] hover:text-white transition-all">
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Mobile View */}
                <div className="md:hidden divide-y divide-[#cfdbe7] dark:divide-zinc-800">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="block text-[#0f2236] dark:text-brand-100">{tx.description}</strong>
                          <span className="text-sm text-[#4f647a] dark:text-brand-200/60">{tx.participant} • {tx.date}</span>
                        </div>
                        <span className={`font-bold ${tx.type === 'credit' ? 'text-[#158f5f] dark:text-emerald-400' : 'text-[#c93e5e] dark:text-red-400'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-[#cfdbe7] dark:border-zinc-700 bg-[#f2f7fb] dark:bg-zinc-800 text-[#0f2236] dark:text-brand-200 text-[0.9rem] hover:bg-[#0d8b7b] hover:border-[#0d8b7b] hover:text-white transition-all">
                          <Edit2 size={14} /> Edit
                        </button>
                        <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-[#cfdbe7] dark:border-zinc-700 bg-[#f2f7fb] dark:bg-zinc-800 text-[#c93e5e] dark:text-red-400 text-[0.9rem] hover:bg-[#c93e5e] hover:border-[#c93e5e] hover:text-white transition-all">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
