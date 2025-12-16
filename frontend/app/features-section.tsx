'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Shield,
  Sparkles,
  Layers,
  Users,
  Clock,
  BarChart3,
  Lock,
  Bell,
  Globe,
  Cloud,
  Code,
  Smartphone,
  Palette,
  Sparkle,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Mic,
  Calendar,
  Keyboard,
  Brain,
  Layout,
  Command
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function FeaturesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // Optimized: Removed unused transforms to save memory

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 md:py-32 selection:bg-rose-900 selection:text-white"
    >
      {/* Animated Background Elements - Optimized with will-change */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8813370a_1px,transparent_1px),linear-gradient(to_bottom,#8813370a_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />

        {/* Floating Orbs - Optimized */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-gradient-to-br from-rose-900/10 via-rose-800/5 to-transparent rounded-full blur-[120px] opacity-60 will-change-transform"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/3 -right-[200px] w-[500px] h-[500px] bg-gradient-to-tl from-rose-950/5 via-rose-900/5 to-transparent rounded-full blur-[120px] opacity-40 will-change-transform"
        />

        {/* Abstract Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 border border-rose-200/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 border border-rose-200/20 rounded-[60px] rotate-45" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-rose-100/50 px-4 py-2 rounded-full shadow-sm mb-6">
            <Sparkle className="w-4 h-4 text-rose-700" />
            <span className="text-sm font-bold text-rose-900 uppercase tracking-wider">
              Powerful Features
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight">
            <span className="block">Everything you need</span>
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient">
                and more.
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
                className="absolute -bottom-2 left-0 w-full h-3 bg-rose-200/50 -z-0 -rotate-1 rounded-sm mix-blend-multiply origin-left"
              />
            </span>
          </h2>

          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Packed with innovative features that make task management delightful, productive, and collaborative.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 - Interactive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-slate-50 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 transition-all duration-500 group-hover:shadow-rose-200/30" />

            <div className="relative p-8 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-900 to-rose-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 flex items-center gap-2">
                  Smart Automation
                  <span className="px-2 py-1 text-xs bg-rose-100 text-rose-700 rounded-full font-bold">AI-Powered</span>
                </h3>

                <p className="text-slate-600 mb-6">
                  Let AI handle repetitive tasks. Auto-categorize, prioritize, and schedule tasks based on your workflow patterns.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Automatic task categorization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Smart priority suggestions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span>Workflow pattern recognition</span>
                </div>
              </div>

              {/* Interactive Element */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-white border border-rose-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Auto-schedule enabled</p>
                    <p className="text-xs text-slate-500">Saves ~2h/week</p>
                  </div>
                  <div className="relative">
                    <div className="w-12 h-6 bg-rose-500 rounded-full" />
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 - Central with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-rose-50/50 to-white rounded-[2.5rem] border-2 border-rose-100 shadow-2xl shadow-rose-200/20 transition-all duration-500 group-hover:shadow-rose-300/30" />

            <div className="relative p-8 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-800 to-rose-600 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">Team Collaboration</h3>

                <p className="text-slate-600 mb-6">
                  Work seamlessly with your team. Real-time updates, comments, and task delegation made simple.
                </p>
              </div>

              {/* Animated Team Avatars */}
              <div className="mb-8">
                <div className="flex -space-x-3 mb-4">
                  {['bg-gradient-to-br from-rose-500 to-rose-400', 'bg-gradient-to-br from-amber-500 to-amber-400', 'bg-gradient-to-br from-sky-500 to-sky-400', 'bg-gradient-to-br from-emerald-500 to-emerald-400'].map((gradient, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className={`w-12 h-12 rounded-full ${gradient} border-2 border-white shadow-lg flex items-center justify-center text-white font-bold`}
                    >
                      {['JD', 'MJ', 'RK', 'ST'][i]}
                    </motion.div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-lg flex items-center justify-center">
                    <PlusIcon />
                  </div>
                </div>
                <p className="text-sm text-slate-500">Active team members</p>
              </div>

              {/* Collaboration Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-white border border-slate-100">
                  <p className="text-2xl font-black text-slate-900">24/7</p>
                  <p className="text-xs text-slate-500">Real-time sync</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white border border-slate-100">
                  <p className="text-2xl font-black text-slate-900">99.9%</p>
                  <p className="text-xs text-slate-500">Uptime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-rose-50 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/50 transition-all duration-500 group-hover:shadow-rose-200/30" />

            <div className="relative p-8 h-full">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-700 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3">Advanced Analytics</h3>

                <p className="text-slate-600 mb-6">
                  Get deep insights into your productivity. Track progress, identify bottlenecks, and optimize your workflow.
                </p>
              </div>

              {/* Mini Analytics Chart */}
              <div className="mb-8">
                <div className="flex items-end justify-between h-20 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-white border border-rose-100">
                  {[40, 60, 75, 90, 65, 85, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * i }}
                      className="w-3 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-full"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-slate-500 mt-2">Weekly productivity trend</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-slate-900">+42%</p>
                  <p className="text-xs text-slate-500">Productivity gain</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Features Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-black text-center text-slate-900 mb-12">
            And many more features...
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-6 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-rose-700" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-32"
        >
          {/* Main Container with Glassmorphism & Gradient */}
          <div className="relative rounded-[3rem] overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-purple-900/20 to-slate-900" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale" />

              {/* Animated Orbs */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-rose-600/30 rounded-full blur-[120px]"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"
              />
            </div>

            <div className="relative z-10 p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-rose-200 text-sm font-medium mb-8"
                >
                  <Sparkles className="w-4 h-4 text-rose-300" />
                  <span>Limited time: 30-day extended trial</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                  Ready to gain <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200">superpowers?</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join 50,000+ productivity enthusiasts who have replaced chaos with clarity.
                  Beautifully simple, endlessly powerful.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="h-16 px-8 bg-white text-slate-900 hover:bg-rose-50 text-lg rounded-2xl font-bold shadow-xl shadow-rose-900/20 hover:shadow-2xl hover:shadow-rose-900/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href="/register" className="flex items-center gap-3">
                      Start my free trial
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-16 px-8 text-white hover:bg-white/10 text-lg rounded-2xl font-bold border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <Link href="#demo" className="flex items-center gap-3">
                      <PlayIcon />
                      See it in action
                    </Link>
                  </Button>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    No credit card
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Cancel anytime
                  </span>
                </div>
              </div>

              {/* Visual Element - 3D Mockup Composition */}
              <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none perspective-1000">
                <motion.div
                  initial={{ rotateY: 15, rotateX: 5, opacity: 0 }}
                  whileInView={{ rotateY: -10, rotateX: 5, opacity: 1 }}
                  transition={{ duration: 1, type: "spring" }}
                  whileHover={{ rotateY: -5, rotateX: 0 }}
                  className="relative z-10"
                >
                  {/* Main Glass Card */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="h-2 w-20 bg-white/10 rounded-full" />
                    </div>

                    {/* Fake Chat UI */}
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-xs font-bold text-white">AI</div>
                        <div className="bg-white/10 rounded-2xl p-3 text-slate-200 text-sm max-w-[80%] rounded-tl-none">
                          Good morning! You have 3 high-priority tasks today. Want me to schedule deep work blocks?
                        </div>
                      </div>
                      <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">ME</div>
                        <div className="bg-rose-500 text-white rounded-2xl p-3 text-sm max-w-[80%] rounded-tr-none">
                          Yes, please. Move meetings to the afternoon.
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-xs font-bold text-white">AI</div>
                        <div className="bg-white/10 rounded-2xl p-3 text-slate-200 text-sm max-w-[80%] rounded-tl-none">
                          Done. I've cleared 9 AM - 12 PM for focus time. 🚀
                        </div>
                      </div>
                    </div>

                    {/* Floating Action Button within Card */}
                    <div className="mt-6 flex justify-center">
                      <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl p-3 w-full text-center text-slate-400 text-xs cursor-pointer">
                        Type a command or ask anything...
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements Behinds/Around */}
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl w-40 z-20 hidden sm:block"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                      <div className="text-xs font-bold text-slate-800">Task Complete</div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-green-500 rounded-full" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const secondaryFeatures = [
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Chat with your tasks. Ask 'What's next?' or 'Plan my day' for instant help."
  },
  {
    icon: Command,
    title: "Command Palette",
    description: "Navigate anywhere, create anything. Total control without lifting your hands."
  },
  {
    icon: Brain,
    title: "Smart Context",
    description: "AI understands your habits and suggests tasks based on energy and location."
  },
  {
    icon: Mic,
    title: "Voice Capture",
    description: "Capture thoughts on the go. We transcribe and organize them automatically."
  },
  {
    icon: Calendar,
    title: "Unified Calendar",
    description: "Two-way sync with Google & Outlook. Never double-book yourself again."
  },
  {
    icon: Layout,
    title: "Focus Mode",
    description: "Block distractions and enter deep work sessions with built-in timers."
  },
  {
    icon: Keyboard,
    title: "Natural Language",
    description: "Type 'Call mom in 20 mins' and we handle the reminders instantly."
  },
  {
    icon: Layers,
    title: "Project Templates",
    description: "Start fast with pre-built workflows for launches, habits, and more."
  }
];

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4V16M4 10H16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 4.5L15.25 10L6.25 15.5V4.5Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}