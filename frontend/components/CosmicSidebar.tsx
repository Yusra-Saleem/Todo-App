// components/CosmicSidebar.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  Zap,
  Satellite,
  Infinity as InfinityIcon,
  Brain,
  Sparkles,
  Orbit
} from 'lucide-react';
import { useState } from 'react';

type CosmicSidebarProps = {
  activeDimension: string;
  onDimensionChange: (dimension: string) => void;
  onToggleHologram: () => void;
};

const dimensions = [
  { id: 'tasks', label: 'Task Portal', icon: CheckSquare, color: 'from-rose-500 to-pink-500' },
  { id: 'analytics', label: 'Quantum Analytics', icon: BarChart3, color: 'from-purple-500 to-blue-500' },
  { id: 'team', label: 'Nebula Team', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { id: 'ai', label: 'AI Nexus', icon: Brain, color: 'from-emerald-500 to-green-500' },
  { id: 'settings', label: 'Orbit Settings', icon: Settings, color: 'from-amber-500 to-yellow-500' },
];

export default function CosmicSidebar({ activeDimension, onDimensionChange, onToggleHologram }: CosmicSidebarProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-80 bg-gradient-to-b from-gray-900/90 via-purple-900/30 to-gray-900/90 backdrop-blur-xl border-r border-white/10 z-40"
    >
      {/* Nebula Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-rose-500/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 shadow-2xl shadow-rose-500/50">
              <InfinityIcon className="w-7 h-7 text-white absolute inset-0 m-auto" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-2xl border-2 border-dashed border-rose-400/30"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              TASK<span className="text-white">FLOW</span>
            </h1>
            <p className="text-xs text-rose-300/60 font-mono">QUANTUM EDITION</p>
          </div>
        </motion.div>

        {/* Dimensional Navigator */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Orbit className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-bold text-rose-300/80 uppercase tracking-wider">DIMENSIONS</span>
          </div>
          
          <div className="space-y-2">
            {dimensions.map((dimension) => (
              <motion.button
                key={dimension.id}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDimensionChange(dimension.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeDimension === dimension.id
                    ? 'glass-effect shadow-lg shadow-rose-500/20'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${dimension.color} flex items-center justify-center`}>
                  <dimension.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`font-medium ${
                  activeDimension === dimension.id 
                    ? 'text-white' 
                    : 'text-gray-300'
                }`}>
                  {dimension.label}
                </span>
                {activeDimension === dimension.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Energy Levels */}
        <div className="mt-auto space-y-6">
          {/* Hologram Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleHologram}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 hover:border-rose-500/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Satellite className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium text-white">Hologram Mode</span>
              </div>
              <div className="w-10 h-6 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 p-1">
                <motion.div
                  animate={{ x: 0 }}
                  className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>
            </div>
          </motion.button>

          {/* Quantum Signature */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900/60 to-gray-800/40 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-rose-300/80">QUANTUM SIGNATURE</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              <div className="flex justify-between">
                <span>ENERGY LEVEL</span>
                <span className="text-rose-400">98%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <motion.div
                  animate={{ width: ['0%', '98%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-rose-600 to-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 p-3 text-gray-400 hover:text-rose-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Exit Portal</span>
          </motion.button>
        </div>
      </div>

      {/* Sidebar Energy Field */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-rose-500/30 via-pink-500/30 to-transparent"
      />
    </motion.aside>
  );
}