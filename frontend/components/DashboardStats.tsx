// components/DashboardStats.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

type DashboardStatsProps = {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  productivity: number;
};

export default function DashboardStats({ 
  totalTasks, 
  completedTasks, 
  pendingTasks,
  productivity 
}: DashboardStatsProps) {
  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: Target,
      color: 'from-rose-600 to-pink-500',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
      iconColor: 'text-rose-600'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-400',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
      iconColor: 'text-emerald-600'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'from-amber-500 to-yellow-400',
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      iconColor: 'text-amber-600'
    },
    {
      label: 'Productivity',
      value: `${productivity}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-slate-50 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-lg transition-shadow duration-300" />
          
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              </div>
              
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            
            {/* Progress bar for productivity */}
            {stat.label === 'Productivity' && (
              <div className="mt-4">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${productivity}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {productivity > 70 ? 'Excellent!' : productivity > 40 ? 'Good progress' : 'Keep going!'}
                </p>
              </div>
            )}
          </div>
          
          {/* Corner accent */}
          <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${stat.color} opacity-10 rounded-tr-2xl rounded-bl-2xl`} />
        </motion.div>
      ))}
    </div>
  );
}