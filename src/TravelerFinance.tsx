import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, LogOut, Menu, X, Bell,
  Map, FileText, MessageSquare, UserCircle, ChevronRight,
  Calendar, CreditCard, Compass, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export default function TravelerFinance({ onLogout, isDarkMode, setIsDarkMode, onBack }: { onLogout: () => void, isDarkMode: boolean, setIsDarkMode: (val: boolean) => void, onBack: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: Compass, label: 'My Trips', active: true },
    { icon: FileText, label: 'My Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: UserCircle, label: 'Profile' },
  ];

  const tripMenu = [
    { icon: Compass, label: 'Journey Overview', onClick: onBack },
    { icon: Calendar, label: 'Itinerary' },
    { icon: FileText, label: 'Tickets & Docs' },
    { icon: CreditCard, label: 'Payments', active: true },
    { icon: MessageSquare, label: 'Organizer Chat' },
  ];

  const transactions = [
    { id: 1, date: '2024-11-14', description: 'Stripe Top-up', amount: 200, type: 'credit' },
    { id: 2, date: '2024-11-13', description: 'Top-up', amount: 100, type: 'credit' },
    { id: 3, date: '2024-11-10', description: 'Flight Ticket', amount: -150, type: 'expense' },
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
            <div className="pt-2 pb-2 px-4">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400/40 dark:text-brand-200/30">Workspace</span>
            </div>
            {navItems.slice(1).map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (item.label === 'My Trips' && onBack) onBack();
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
                <span className="hover:text-brand-500 dark:hover:text-brand-100 cursor-pointer transition-colors" onClick={onBack}>My Trips</span>
                <ChevronRight size={14} />
                <span className="text-brand-500 dark:text-brand-100">Latin turnebusz</span>
              </div>
            </div>
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
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Hero Section */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[32px] p-6 sm:p-10 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-300/20 to-transparent dark:from-brand-400/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-500 dark:bg-brand-400 text-white text-[0.7rem] font-bold uppercase tracking-widest rounded-full shadow-sm">
                      Your Balance
                    </span>
                  </div>
                  
                  <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-500 dark:text-brand-100 tracking-tight mb-4 leading-tight">
                    Trip Finances
                  </h1>
                  
                  <p className="text-brand-400/80 dark:text-brand-200/70 text-lg font-medium">
                    View your payments, outstanding balance, and settle your share easily.
                  </p>
                </div>

                {/* Balance Card */}
                <div className="bg-brand-50/80 dark:bg-zinc-900/80 p-6 rounded-[20px] border border-brand-100/80 dark:border-zinc-800 shadow-sm min-w-[200px] shrink-0 text-center">
                  <span className="block text-[0.75rem] font-bold uppercase tracking-widest text-brand-400/60 dark:text-brand-200/50 mb-2">Current Balance</span>
                  <strong className="block text-4xl font-display font-bold text-emerald-500 dark:text-emerald-400 mb-1">+150 HUF</strong>
                  <span className="text-xs font-medium text-emerald-600/80 dark:text-emerald-400/80">You are fully paid</span>
                </div>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-between group hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[14px] bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CreditCard size={24} />
                  </div>
                  <div className="text-left">
                    <strong className="block text-lg font-bold text-brand-500 dark:text-brand-100">Pay with Stripe</strong>
                    <span className="text-sm text-brand-400/70 dark:text-brand-200/60">Credit or debit card</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-brand-400/50 group-hover:text-brand-500 dark:text-brand-200/30 dark:group-hover:text-brand-100 transition-colors" />
              </button>

              <button className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] p-6 border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_4px_12px_rgba(16,35,55,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-between group hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#003087]/10 dark:bg-[#003087]/20 text-[#003087] dark:text-[#0079C1] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M17.3 8.2c-.4-1.6-1.8-2.2-3.8-2.2H8.6c-.3 0-.6.2-.7.5L5 20.5c0 .2.2.5.5.5h3.6c.3 0 .6-.2.7-.5l.8-4.8c.1-.3.3-.5.6-.5h1.6c2.8 0 4.9-1.1 5.5-4.3.3-1.6.1-2.6-.5-3.2z"></path><path d="M18.8 4.2c-.4-1.6-1.8-2.2-3.8-2.2H10c-.3 0-.6.2-.7.5L6.4 16.5c0 .2.2.5.5.5h3.6c.3 0 .6-.2.7-.5l.8-4.8c.1-.3.3-.5.6-.5h1.6c2.8 0 4.9-1.1 5.5-4.3.3-1.6.1-2.6-.5-3.2z"></path></svg>
                  </div>
                  <div className="text-left">
                    <strong className="block text-lg font-bold text-brand-500 dark:text-brand-100">Pay with PayPal</strong>
                    <span className="text-sm text-brand-400/70 dark:text-brand-200/60">Fast & secure</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-brand-400/50 group-hover:text-brand-500 dark:text-brand-200/30 dark:group-hover:text-brand-100 transition-colors" />
              </button>
            </div>

            {/* Transactions List */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl rounded-[24px] border border-brand-100/60 dark:border-zinc-800/50 shadow-[0_8px_30px_rgba(16,35,55,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-brand-100/60 dark:border-zinc-800/50">
                <h3 className="text-lg font-bold text-brand-500 dark:text-brand-100">Your Transactions</h3>
                <p className="text-sm font-medium text-brand-400/70 dark:text-brand-200/60">History of your payments and expenses.</p>
              </div>
              
              <div className="divide-y divide-brand-100/40 dark:divide-zinc-800/30">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 sm:p-8 flex items-center justify-between hover:bg-brand-50/30 dark:hover:bg-zinc-900/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'}`}>
                        {tx.type === 'credit' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                      </div>
                      <div>
                        <strong className="block text-base font-bold text-brand-500 dark:text-brand-100 mb-0.5">{tx.description}</strong>
                        <span className="text-xs font-medium text-brand-400/60 dark:text-brand-200/50">{tx.date}</span>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${tx.type === 'credit' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} HUF
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
