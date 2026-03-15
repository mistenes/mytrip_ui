import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, 
  Map, FolderOpen, Users, Settings, Bell, ChevronRight,
  Calendar, FileText, MessageSquare, CreditCard, UserCircle, UsersRound, SlidersHorizontal,
  Phone, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export default function Finance({ onLogout, isDarkMode, setIsDarkMode, onBack }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void }) {
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
                <span className="text-brand-500 dark:text-brand-100">Finance</span>
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
                    Finance Desk
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-2">
                  Finance: MSC Grandiosa
                </h2>
                <p className="text-brand-400/80 dark:text-brand-200/70 text-base max-w-2xl mb-4">
                  Track manual finance records, online credits, and participant balances from one clean workspace.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-500/20 text-[0.75rem] font-bold rounded-full">
                    Staff view
                  </span>
                  <span className="px-3 py-1.5 bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-500/20 text-[0.75rem] font-bold rounded-full">
                    4 participants · 3 visible records
                  </span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="shrink-0 w-full md:w-auto grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="bg-brand-50/50 dark:bg-zinc-900/50 p-4 rounded-[16px] border border-brand-100/50 dark:border-zinc-800/50">
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Online Payments</span>
                  <strong className="text-xl font-display font-bold text-brand-500 dark:text-brand-100">0 HUF</strong>
                </div>
                <div className="bg-brand-50/50 dark:bg-zinc-900/50 p-4 rounded-[16px] border border-brand-100/50 dark:border-zinc-800/50">
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-1">Outstanding</span>
                  <strong className="text-xl font-display font-bold text-emerald-500 dark:text-emerald-400">150 HUF</strong>
                </div>
              </div>
            </div>

            {/* Balances Grid */}
            <div>
              <div className="flex items-center justify-between mb-4 px-2">
                <div>
                  <h3 className="text-lg font-bold text-brand-500 dark:text-brand-100">Balances</h3>
                  <p className="text-sm font-medium text-brand-400/70 dark:text-brand-200/60">See who is still outstanding and who is already fully credited.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {balances.map((balance, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[20px] p-5 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                    <h4 className="text-sm font-bold text-brand-500 dark:text-brand-100 truncate mb-2">{balance.name}</h4>
                    <p className={`text-xl font-display font-bold ${balance.amount >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      {balance.amount > 0 ? '+' : ''}{balance.amount} HUF
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Manual Record */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-500 dark:text-brand-100">Add manual record</h3>
                <p className="text-sm font-medium text-brand-400/70 dark:text-brand-200/60">Use manual entries for offline payments, shared costs, and later adjustments.</p>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="block text-[0.76rem] font-bold uppercase tracking-[0.08em] text-brand-500/80 dark:text-brand-100/60">Participant</label>
                  <select className="w-full px-4 py-3 bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/80 dark:border-zinc-800 rounded-[14px] text-sm font-semibold text-brand-500 dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all">
                    <option>Mate Istenes</option>
                    <option>foldertest</option>
                    <option>mistenes</option>
                    <option>user</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[0.76rem] font-bold uppercase tracking-[0.08em] text-brand-500/80 dark:text-brand-100/60">Description</label>
                  <input type="text" placeholder="e.g. Dinner split" className="w-full px-4 py-3 bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/80 dark:border-zinc-800 rounded-[14px] text-sm font-semibold text-brand-500 dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-brand-400/40 dark:placeholder:text-brand-200/30" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[0.76rem] font-bold uppercase tracking-[0.08em] text-brand-500/80 dark:text-brand-100/60">Amount (HUF)</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-3 bg-brand-50/50 dark:bg-zinc-900/50 border border-brand-100/80 dark:border-zinc-800 rounded-[14px] text-sm font-semibold text-brand-500 dark:text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all placeholder:text-brand-400/40 dark:placeholder:text-brand-200/30" />
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 p-1 bg-brand-100/30 dark:bg-zinc-900/50 rounded-[14px] border border-brand-100/50 dark:border-zinc-800/50 flex">
                    <button type="button" className="flex-1 py-2 rounded-[10px] text-xs font-bold bg-white dark:bg-zinc-800 text-brand-500 dark:text-brand-100 shadow-sm">Expense</button>
                    <button type="button" className="flex-1 py-2 rounded-[10px] text-xs font-bold text-brand-400/70 dark:text-brand-200/50 hover:text-brand-500 dark:hover:text-brand-200">Credit</button>
                  </div>
                  <button type="button" className="px-4 py-3 bg-brand-500 dark:bg-brand-400 text-white rounded-[14px] font-bold shadow-sm hover:bg-brand-400 dark:hover:bg-brand-300 transition-colors flex items-center justify-center shrink-0">
                    <Plus size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Transactions Table */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-brand-100/60 dark:border-zinc-800/50">
                <h3 className="text-lg font-bold text-brand-500 dark:text-brand-100">Transactions</h3>
                <p className="text-sm font-medium text-brand-400/70 dark:text-brand-200/60">Every visible ledger item.</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-50/50 dark:bg-zinc-900/30 border-b border-brand-100/60 dark:border-zinc-800/50">
                      <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-200/50">Participant</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-200/50">Date</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-200/50">Description</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-200/50">Amount (HUF)</th>
                      <th className="px-6 py-4 text-[0.7rem] font-bold uppercase tracking-widest text-brand-400/70 dark:text-brand-200/50 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100/40 dark:divide-zinc-800/30">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-brand-50/30 dark:hover:bg-zinc-900/20 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-brand-500 dark:text-brand-100">{tx.participant}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-brand-400/80 dark:text-brand-200/70">{tx.date}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-brand-500 dark:text-brand-100">{tx.description}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold flex items-center gap-1 ${tx.type === 'credit' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                            {tx.type === 'credit' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-brand-400/60 hover:text-brand-500 dark:text-brand-200/40 dark:hover:text-brand-200 hover:bg-brand-50 dark:hover:bg-zinc-800 rounded-[10px] transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button className="p-2 text-brand-400/60 hover:text-red-500 dark:text-brand-200/40 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[10px] transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
