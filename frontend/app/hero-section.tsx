'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Plus, Star, ArrowRight, Settings, Play, Zap, Shield, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section ref={containerRef} className="min-h-[100dvh] relative overflow-hidden bg-slate-50 selection:bg-rose-900 selection:text-white">
      {/* Animated Deep Background - Mobile Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8813370a_1px,transparent_1px),linear-gradient(to_bottom,#8813370a_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:32px_32px] lg:bg-[size:64px_64px]" />

        {/* Dynamic Orbs - Responsive Sizes */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[15%] -right-[15%] w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] lg:w-[800px] lg:h-[800px] bg-gradient-to-br from-rose-900/10 via-rose-800/5 to-transparent rounded-full blur-[60px] md:blur-[80px] lg:blur-[120px] opacity-60 will-change-transform"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[30%] -left-[15%] w-[130vw] h-[130vw] md:w-[90vw] md:h-[90vw] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr from-rose-950/5 via-rose-900/5 to-transparent rounded-full blur-[40px] md:blur-[60px] lg:blur-[100px] will-change-transform"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-6 pb-20 md:pt-8 md:pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Content Area */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Animated Badge - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-3 bg-white/60 backdrop-blur-md border border-rose-100/50 pl-1.5 pr-3 py-1 md:pl-2 md:pr-4 md:py-1.5 rounded-full shadow-sm mb-4 sm:mb-6 md:mb-8 hover:bg-white/80 transition-colors cursor-pointer group"
            >
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-rose-100 text-rose-700 group-hover:scale-110 transition-transform">
                <SparkleIcon />
              </span>
              <span className="text-[10px] xs:text-xs sm:text-sm font-bold tracking-wide text-rose-900 uppercase">
                New v2.0 Release
              </span>
            </motion.div>

            {/* Main Headline - Responsive */}
            <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 mb-6 sm:mb-8 md:mb-10 max-w-2xl lg:max-w-none">
              <h1 className="text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.05]">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="block"
                >
                  Organize life
                </motion.span>
                <div className="block mt-0.5 xs:mt-1 sm:mt-1.5 md:mt-2 relative">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                  >
                    beautifully.
                  </motion.span>
                  {/* Underline decorative element */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
                    className="absolute -bottom-0.5 xs:-bottom-1 sm:-bottom-1 md:bottom-0 left-0 w-full h-1.5 xs:h-2 sm:h-3 md:h-4 bg-rose-200/50 -z-0 -rotate-1 rounded-sm mix-blend-multiply origin-left"
                  />
                </div>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 xs:px-0"
              >
                The task manager that balances <span className="text-rose-900 font-bold underline decoration-rose-200 decoration-2 xs:decoration-3 sm:decoration-4 underline-offset-2 xs:underline-offset-3 sm:underline-offset-4">power</span> and <span className="text-rose-900 font-bold underline decoration-rose-200 decoration-2 xs:decoration-3 sm:decoration-4 underline-offset-2 xs:underline-offset-3 sm:underline-offset-4">simplicity</span>. Designed for modern teams who move fast.
              </motion.p>
            </div>

            {/* CTA Buttons - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 xs:gap-4 w-full sm:w-auto"
            >
              <Button
                asChild
                size="lg"
                className="h-12 xs:h-14 sm:h-14 md:h-16 px-6 xs:px-8 sm:px-8 md:px-10 bg-rose-950 hover:bg-rose-900 text-white text-sm xs:text-base sm:text-base md:text-lg rounded-xl xs:rounded-2xl font-bold shadow-lg shadow-rose-900/20 hover:shadow-xl hover:shadow-rose-900/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                <Link href="/register" className="flex items-center justify-center gap-2 xs:gap-3">
                  Start for free
                  <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 xs:h-14 sm:h-14 md:h-16 px-6 xs:px-8 sm:px-8 md:px-10 border-2 border-slate-200 hover:border-rose-200 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-900 text-sm xs:text-base sm:text-base md:text-lg rounded-xl xs:rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="#demo" className="flex items-center justify-center gap-2 xs:gap-3">
                  <Play className="w-4 h-4 xs:w-5 xs:h-5 fill-current" />
                  See how it works
                </Link>
              </Button>
            </motion.div>

            {/* Trust Badges - Responsive */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 pt-6 xs:pt-8 border-t border-slate-200/60 w-full max-w-2xl lg:max-w-none"
            >
              <p className="text-[10px] xs:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 xs:mb-4">Trusted by 10,000+ teams</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 xs:gap-x-6 sm:gap-x-8 gap-y-2 xs:gap-y-3 sm:gap-y-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'GlobalBank', 'TechStart', 'Future Labs'].map((brand, i) => (
                  <span key={i} className="text-sm xs:text-base sm:text-lg font-bold text-slate-800">{brand}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Responsive 3D Floating Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="lg:col-span-5 relative mt-8 xs:mt-10 sm:mt-12 lg:mt-0 perspective-1000"
          >
            {/* Decorative Elements around visual */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 xs:-top-8 sm:-top-10 -right-3 xs:-right-4 lg:-right-12 z-0"
            >
              <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-rose-400/20 backdrop-blur-md rounded-2xl xs:rounded-3xl rotate-12" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 xs:-bottom-6 sm:-bottom-8 -left-4 xs:-left-6 sm:-left-8 z-0"
            >
              <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 bg-slate-300/20 backdrop-blur-md rounded-full" />
            </motion.div>

            {/* Main Card UI - Responsive */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[1.5rem] xs:rounded-[2rem] sm:rounded-[2.5rem] shadow-xl xs:shadow-2xl shadow-slate-200/50 p-2 xs:p-3 sm:p-4 rotate-x-2 transform transition-transform hover:scale-[1.01] duration-500">
              <div className="bg-white rounded-[1.25rem] xs:rounded-[1.75rem] sm:rounded-[2rem] border border-slate-100 overflow-hidden shadow-inner">
                {/* Mockup Header */}
                <div className="h-10 xs:h-12 sm:h-14 md:h-16 border-b border-slate-50 flex items-center justify-between px-4 xs:px-5 sm:px-6 md:px-8 bg-white">
                  <div className="flex gap-1.5 xs:gap-2">
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-0.5 xs:py-1 bg-slate-50 rounded-full border border-slate-100">
                    <Shield className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-slate-400" />
                    <span className="text-[9px] xs:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secure</span>
                  </div>
                </div>

                {/* Mockup Body */}
                <div className="p-4 xs:p-5 sm:p-6 md:p-8 bg-slate-50/50 min-h-[300px] xs:min-h-[350px] sm:min-h-[400px]">
                  <div className="flex justify-between items-end mb-4 xs:mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-black text-slate-800">My Tasks</h3>
                      <p className="text-xs xs:text-sm font-medium text-slate-500 mt-0.5 xs:mt-1">5 tasks remaining today</p>
                    </div>
                    <button className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg xs:rounded-xl bg-rose-900 text-white flex items-center justify-center hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/20">
                      <Plus className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Task List mockup */}
                  <div className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                    <TaskItem
                      title="Q4 Marketing Strategy"
                      tag="Priority"
                      tagColor="bg-rose-100 text-rose-700"
                      time="10:00 AM"
                      done={true}
                    />
                    <TaskItem
                      title="Design System Review"
                      tag="Design"
                      tagColor="bg-sky-100 text-sky-700"
                      time="2:30 PM"
                      active={true}
                    />
                    <TaskItem
                      title="Client Meeting"
                      tag="Sales"
                      tagColor="bg-amber-100 text-amber-700"
                      time="4:00 PM"
                    />
                  </div>

                  {/* Floating notification within mockup */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-4 xs:mt-5 sm:mt-6 p-3 xs:p-4 rounded-lg xs:rounded-xl bg-gradient-to-r from-rose-900 to-rose-800 text-white shadow-lg flex items-center gap-2 xs:gap-3"
                  >
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] xs:text-xs text-white/60 font-medium">Productivity Insight</p>
                      <p className="text-xs xs:text-sm font-bold">You're 20% faster than yesterday!</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Mobile Mockup Element */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 xs:-bottom-6 sm:-bottom-8 -right-2 xs:-right-4 sm:-right-8 w-32 xs:w-36 sm:w-40 md:w-48 lg:w-56 bg-white rounded-[1.5rem] xs:rounded-[1.75rem] sm:rounded-[2rem] shadow-lg xs:shadow-xl sm:shadow-2xl border-2 xs:border-3 sm:border-4 border-white p-1.5 xs:p-2 hidden sm:block"
            >
              <div className="bg-slate-900 rounded-[1rem] xs:rounded-[1.25rem] sm:rounded-[1.5rem] p-2 xs:p-3 sm:p-4 overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-12 xs:h-14 sm:h-16 md:h-20 bg-gradient-to-b from-rose-500/20 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center mb-2 xs:mb-3 sm:mb-4 text-white/50">
                  <Smartphone className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px]">Mobile App</span>
                </div>
                <div className="space-y-1.5 xs:space-y-2">
                  <div className="h-1.5 xs:h-2 w-2/3 bg-white/20 rounded-full" />
                  <div className="h-1.5 xs:h-2 w-1/2 bg-white/10 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface TaskItemProps {
  title: string;
  tag: string;
  tagColor: string;
  time: string;
  done?: boolean;
  active?: boolean;
}

function TaskItem({ title, tag, tagColor, time, done = false, active = false }: TaskItemProps) {
  return (
    <div className={`p-2.5 xs:p-3 sm:p-4 rounded-xl xs:rounded-2xl flex items-center gap-2 xs:gap-2.5 sm:gap-3 transition-all duration-300 ${active ? 'bg-white shadow-md border border-rose-100 scale-[1.02] xs:scale-[1.03]' : 'bg-white/60 hover:bg-white border border-transparent hover:border-slate-100'}`}>
      <div className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${done ? 'bg-rose-500 border-rose-500' : 'border-slate-300'}`}>
        {done && <Check className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3.5 sm:h-3.5 text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm xs:text-base font-bold truncate ${done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{title}</p>
        <p className="text-[10px] xs:text-xs text-slate-400 font-medium mt-0.5">{time}</p>
      </div>
      <span className={`px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-md xs:rounded-lg text-[8px] xs:text-[9px] sm:text-[10px] font-bold uppercase tracking-wide ${tagColor}`}>
        {tag}
      </span>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 0C7.5 0 8.5 4 11 6.5C13.5 9 15 9 15 9C15 9 11 10.5 8.5 13C6 15.5 5 15 5 15C5 15 5.5 11 3 8.5C0.5 6 0 6 0 6C0 6 4 5 6.5 2.5C9 0 7.5 0 7.5 0Z" fill="currentColor" />
    </svg>
  );
}