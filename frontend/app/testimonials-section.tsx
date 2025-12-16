'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  MessageSquare, 
  Zap, 
  Sparkles, 
  ChevronRight,
  Bot,
  Clock,
  Star,
  TrendingUp,
  Users,
  Brain,
  ThumbsUp,
  Quote
} from 'lucide-react';

// Optimized: Memoize testimonials to prevent re-renders
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Product Manager",
    company: "TechFlow AI",
    content: "Our chatbot reduced customer support tickets by 70%. The AI understands context perfectly and handles complex queries autonomously.",
    metrics: "70% ticket reduction",
    icon: "🚀",
    category: "Support"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UX Lead",
    company: "DesignHub",
    content: "Navigation feels like magic. The chatbot predicts where I need to go before I even realize it. Team productivity doubled.",
    metrics: "2x faster navigation",
    icon: "✨",
    category: "UX"
  },
  {
    id: 3,
    name: "Marcus Lee",
    role: "CTO",
    company: "StartupXYZ",
    content: "The AI assistant transformed how our team works. Natural conversations instead of complex menus. Onboarding time cut by 60%.",
    metrics: "60% faster onboarding",
    icon: "🤖",
    category: "Productivity"
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Customer Success",
    company: "Global Support",
    content: "Our agents now handle 3x more chats. The AI suggests responses and routes queries intelligently. Customer satisfaction at 98%.",
    metrics: "3x capacity increase",
    icon: "💬",
    category: "Efficiency"
  },
  {
    id: 5,
    name: "David Kim",
    role: "Operations Director",
    company: "Enterprise Corp",
    content: "The chatbot navigation eliminated our training documentation. New hires learn by conversation. Game-changing for scale.",
    metrics: "Zero training docs",
    icon: "🎯",
    category: "Scale"
  }
];

const CATEGORIES = ["All", "Support", "UX", "Productivity", "Efficiency", "Scale"];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [autoplay, setAutoplay] = useState(true);
  
  // Filter testimonials by category - memoized for performance
  const filteredTestimonials = useMemo(() => {
    return activeCategory === "All" 
      ? TESTIMONIALS 
      : TESTIMONIALS.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  // Optimized navigation with useCallback
  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  }, [filteredTestimonials.length]);

  // Optimized autoplay with cleanup
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, [autoplay, nextTestimonial]);

  // Parallax effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Predefined animation variants for performance
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
      {/* Minimal background - optimized for speed */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-rose-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-rose-100/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="w-4 h-4 text-rose-700" />
            <span className="text-sm font-bold text-rose-900">AI Chatbot Experiences</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4">
            <span className="block">Teams love our</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient">
                AI Navigation
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-rose-200/50 -z-0 -rotate-1 rounded-full" />
            </span>
          </h2>
          
          <p className="text-lg text-slate-600">
            See how AI-powered chat transforms task management and navigation for teams worldwide.
          </p>
        </motion.div>

        {/* Category Filter - Optimized */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setActiveIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-rose-900 to-rose-700 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Testimonial Card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredTestimonials[activeIndex]?.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={scaleIn}
                className="relative"
              >
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-xl">
                        {filteredTestimonials[activeIndex]?.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{filteredTestimonials[activeIndex]?.name}</h3>
                        <p className="text-sm text-slate-600">{filteredTestimonials[activeIndex]?.role} • {filteredTestimonials[activeIndex]?.company}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-amber-100 to-amber-50 px-3 py-1 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-rose-200/50" />
                    <p className="text-xl font-medium text-slate-800 pl-4">
                      "{filteredTestimonials[activeIndex]?.content}"
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                      <Zap className="w-4 h-4 text-rose-700" />
                      <span className="font-bold text-rose-900">{filteredTestimonials[activeIndex]?.metrics}</span>
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                      {filteredTestimonials[activeIndex]?.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setAutoplay(!autoplay)}
                className={`p-2 rounded-full transition-colors ${
                  autoplay 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'bg-slate-100 text-slate-600'
                }`}
                aria-label={autoplay ? "Pause rotation" : "Play rotation"}
              >
                {autoplay ? "⏸" : "▶"}
              </button>
              
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              
              <div className="flex gap-2">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeIndex 
                        ? 'bg-gradient-to-r from-rose-900 to-rose-700 w-8' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gradient-to-r from-rose-900 to-rose-700 text-white hover:shadow-lg hover:shadow-rose-900/20 transition-all"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>

          {/* Right: AI Chat Visualization */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rose-950 to-rose-900 rounded-3xl p-6 md:p-8 h-full shadow-2xl shadow-rose-900/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Live AI Assistant</h3>
                  <p className="text-rose-200/80 text-sm">Powered by conversational intelligence</p>
                </div>
              </div>

              {/* Chat Simulation */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                    <p className="text-white">Hi! How can I help organize your tasks today?</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-gradient-to-r from-rose-400 to-pink-400 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                    <p className="text-white">"Show me urgent tasks for this week"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* AI Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-rose-300" />
                    <span className="text-xs text-rose-200/80">Response Time</span>
                  </div>
                  <p className="text-2xl font-black text-white">0.2s</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ThumbsUp className="w-4 h-4 text-rose-300" />
                    <span className="text-xs text-rose-200/80">Accuracy</span>
                  </div>
                  <p className="text-2xl font-black text-white">98%</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-rose-300" />
                    <span className="text-xs text-rose-200/80">Teams Using</span>
                  </div>
                  <p className="text-2xl font-black text-white">10K+</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-rose-300" />
                    <span className="text-xs text-rose-200/80">Satisfaction</span>
                  </div>
                  <p className="text-2xl font-black text-white">4.9/5</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

         {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-rose-50 to-white rounded-2xl p-8 border border-rose-100 shadow-lg shadow-rose-100/30">
            <div className="text-left">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Ready to join them?
              </h3>
              <p className="text-slate-600">
                Start your free trial today. No credit card required.
              </p>
            </div>
            <button className="px-8 py-3 bg-gradient-to-r from-rose-900 to-rose-700 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-rose-900/20 transition-all hover:-translate-y-0.5 active:scale-95">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Extremely lightweight icon component
function LightIcon({ icon }: { icon: string }) {
  return (
    <span className="text-2xl" aria-hidden="true">
      {icon}
    </span>
  );
}