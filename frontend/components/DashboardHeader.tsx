// components/DashboardHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Settings, HelpCircle, Moon, Sun, ChevronDown, CheckSquare, Sparkles, LogOut, User as UserIcon, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function DashboardHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formatter.format(date));
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-rose-100/50 supports-[backdrop-filter]:bg-white/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>

            <Link href="/dashboard" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900 via-rose-700 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/20 group-hover:shadow-rose-900/40 transition-all duration-300"
              >
                <CheckSquare className="w-6 h-6 text-white" />
              </motion.div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-black bg-gradient-to-r from-rose-950 via-rose-800 to-rose-600 bg-clip-text text-transparent tracking-tight font-serif">
                  TaskZen
                </h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Dashboard</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center Section - Date Display (Creative Element) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-sm font-medium flex items-center gap-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-rose-400/50" />
              {currentDate}
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3 md:gap-4">



            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm relative group"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform" />
            </motion.button>

            <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block" />

            {/* User Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full bg-white border border-slate-100 hover:border-rose-200 hover:shadow-md hover:shadow-rose-100/50 transition-all group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-100 to-rose-200 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-black text-rose-700">{user?.email?.[0].toUpperCase() || 'U'}</span>
                    )}
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-rose-900 transition-colors">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl shadow-rose-900/10 border border-rose-100 overflow-hidden z-50 origin-top-right"
                  >
                    {/* Dropdown Header */}
                    <div className="p-5 bg-gradient-to-br from-rose-50/50 to-transparent border-b border-rose-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-rose-500/30">
                          {user?.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{user?.email?.split('@')[0]}</p>
                          <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Pro Plan
                        </span>
                        <span className="text-xs text-slate-400">Member since 2024</span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      {[
                        { icon: UserIcon, label: 'My Profile', desc: 'Manage account details' },
                        { icon: Settings, label: 'Preferences', desc: 'Customize your view' },
                        { icon: Palette, label: 'Appearance', desc: 'Theme & display settings' },
                        { icon: HelpCircle, label: 'Help Center', desc: 'Get support & guides' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group text-left"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 group-hover:text-rose-900 transition-colors">{item.label}</p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="p-2 border-t border-slate-50 bg-slate-50/50">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-rose-600 font-bold hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
