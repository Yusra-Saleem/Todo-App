'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Palette, Globe, Monitor, Moon, Sun, Shield } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function Settings() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar
        isCollapsed={false}
        toggleCollapse={() => { }}
        signOut={signOut}
      />

      <main className="flex-1 md:ml-[300px] p-4 md:p-8 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <DashboardHeader />

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <h1 className="text-3xl font-black text-slate-900 mb-2">Settings</h1>
              <p className="text-slate-500 font-medium mb-8">Customize your workspace experience.</p>

              <div className="flex flex-wrap gap-2 mb-8 bg-slate-50/50 p-1.5 rounded-2xl w-fit">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                        ? 'bg-white text-rose-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                      }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area - Creative Cards */}
              <div className="grid gap-6">
                {activeTab === 'appearance' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Light', 'Dark', 'System'].map((theme, i) => (
                        <button key={theme} className={`p-6 rounded-2xl border-2 text-left transition-all ${i === 0 ? 'border-rose-500 bg-rose-50/10 ring-4 ring-rose-100' : 'border-slate-100 hover:border-slate-200'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${i === 0 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
                            {i === 0 ? <Sun className="w-5 h-5" /> : i === 1 ? <Moon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                          </div>
                          <div className={`font-bold ${i === 0 ? 'text-rose-900' : 'text-slate-900'}`}>{theme} Theme</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'general' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl space-y-6">
                    <div className="space-y-4">
                      <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Display Name</label>
                        <input type="text" defaultValue="Creative User" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-rose-100 transition-all font-medium text-slate-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input type="email" defaultValue="user@example.com" disabled className="w-full px-4 py-3 rounded-xl bg-slate-50/50 text-slate-400 font-medium cursor-not-allowed" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}