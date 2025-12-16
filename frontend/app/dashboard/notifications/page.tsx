'use client';

import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageSquare, Star, Zap } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';

export default function Notifications() {
  const { signOut } = useAuth();

  const notifications = [
    { id: 1, type: 'like', title: 'Task Completed', message: 'You completed "Redesign Homepage" ahead of schedule!', time: '2m ago', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 2, type: 'message', title: 'New Comment', message: 'Sarah left a note on "Project Alpha".', time: '1h ago', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, type: 'system', title: 'System Update', message: 'TaskZen has been updated to v2.0.', time: '1d ago', icon: Bell, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar
        isCollapsed={false}
        toggleCollapse={() => { }}
        signOut={signOut}
      />

      <main className="flex-1 md:ml-[300px] p-4 md:p-8 transition-all duration-300">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <DashboardHeader />

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-black text-slate-900">Notifications</h1>
              <button className="text-sm font-bold text-rose-600 hover:text-rose-700">Mark all as read</button>
            </div>

            <div className="space-y-4">
              {notifications.map((notif, i) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-900/5 transition-all flex items-start gap-5 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${notif.type === 'system' ? 'bg-rose-500' : 'bg-transparent'}`} />

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900">{notif.title}</h3>
                      <span className="text-xs font-semibold text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed">{notif.message}</p>
                  </div>

                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-full hover:bg-slate-50 text-slate-300 hover:text-rose-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="py-8 text-center">
                <p className="text-slate-400 font-medium text-sm">That's all for now!</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}