/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, UserCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Dashboard from './Dashboard';
import TravelerDashboard from './TravelerDashboard';
import TravelerTripDetail from './TravelerTripDetail';
import TravelerFinance from './TravelerFinance';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<'organizer' | 'traveler' | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  useEffect(() => {
    // Check system preference on initial load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'demo' && password === 'demo123') {
      setRole('organizer');
    } else if (username === 'traveler' && password === 'traveler123') {
      setRole('traveler');
    } else {
      alert('Invalid credentials. Try demo/demo123 (Organizer) or traveler/traveler123 (Traveler).');
    }
  };

  const handleLogout = () => {
    setRole(null);
    setSelectedTrip(null);
  };

  if (role === 'organizer') {
    return <Dashboard onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
  }

  if (role === 'traveler') {
    if (selectedTrip === 'latin-turnebusz') {
      return <TravelerTripDetail onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setSelectedTrip(null)} />;
    }
    if (selectedTrip === 'latin-turnebusz-finance') {
      return <TravelerFinance onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onBack={() => setSelectedTrip(null)} />;
    }
    return <TravelerDashboard onLogout={handleLogout} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setSelectedTrip={setSelectedTrip} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-100/40 via-white to-brand-200/20 dark:from-brand-500 dark:via-[#0a0a0a] dark:to-brand-400/20 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background blobs to mimic the radial gradients from the dashboard */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-200/20 dark:bg-brand-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-300/10 dark:bg-brand-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <header className="p-5 sm:p-6 flex justify-between items-center w-full max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl tracking-tight text-brand-500 dark:text-brand-100"
        >
          myTrip
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border border-brand-100/50 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer text-brand-500 dark:text-brand-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <div className="bg-white/90 dark:bg-[#121212]/90 backdrop-blur-xl rounded-[24px] shadow-[0_16px_34px_rgba(16,35,55,0.08)] dark:shadow-[0_16px_34px_rgba(0,0,0,0.3)] border border-brand-100/60 dark:border-brand-400/30 p-7 sm:p-8">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-bold tracking-tight mb-2 text-brand-500 dark:text-brand-100">Welcome back</h1>
              <p className="text-brand-400/80 dark:text-brand-100/60 text-[0.9rem] leading-relaxed">
                Sign in to access your travel workspace.
              </p>
              <p className="text-brand-400/60 dark:text-brand-100/40 text-xs mt-3 bg-brand-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-brand-100/50 dark:border-zinc-700/50">
                Try <strong>demo</strong> (Organizer) or <strong>traveler</strong> (Traveler).<br/>Password is <strong>[username]123</strong>.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label htmlFor="username" className="block text-[0.76rem] font-bold uppercase tracking-[0.08em] text-brand-500/80 dark:text-brand-100/60">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] bg-white dark:bg-[#0a0a0a] border border-brand-100 dark:border-brand-400/40 focus:outline-none focus:ring-2 focus:ring-brand-300/40 transition-all placeholder:text-brand-400/30 dark:placeholder:text-brand-100/30 text-brand-500 dark:text-brand-100 shadow-sm"
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="password" className="block text-[0.76rem] font-bold uppercase tracking-[0.08em] text-brand-500/80 dark:text-brand-100/60">
                    Password
                  </label>
                  <button type="button" className="text-[0.8rem] font-semibold text-brand-300 dark:text-brand-200 hover:text-brand-400 dark:hover:text-brand-100 transition-colors cursor-pointer">
                    Forgot?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-[14px] bg-white dark:bg-[#0a0a0a] border border-brand-100 dark:border-brand-400/40 focus:outline-none focus:ring-2 focus:ring-brand-300/40 transition-all placeholder:text-brand-400/30 dark:placeholder:text-brand-100/30 text-brand-500 dark:text-brand-100 shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-br from-brand-300 to-brand-400 dark:from-brand-400 dark:to-brand-500 text-white rounded-[16px] font-bold hover:from-brand-400 hover:to-brand-500 dark:hover:from-brand-300 dark:hover:to-brand-400 transition-all active:scale-[0.98] mt-6 cursor-pointer shadow-[0_10px_24px_rgba(58,90,64,0.15)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
              >
                Continue
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform opacity-90" />
              </button>
              
              <div className="text-center mt-4">
                <p className="text-[0.75rem] text-brand-400/60 dark:text-brand-100/40 font-medium">
                  Demo credentials pre-filled for testing.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
