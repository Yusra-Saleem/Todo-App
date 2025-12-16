'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  CheckCircle,
  User,
  LogOut,
  Bell,
  Search,
  Plus,
  LayoutDashboard,
  Calendar,
  Settings,
  BarChart3,
  CheckSquare,
  ListTodo,
  ArrowRight,
  Star,
  Home as HomeIcon,
  BookOpen,
  DollarSign,
  HelpCircle,
  MessageSquare,
  Globe,
  Heart,
  Coffee
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Fix: Proper dynamic imports
const HeroSection = dynamic(() => import('./hero-section').then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-[100dvh] bg-gradient-to-b from-slate-50 to-white" />
});

const FeaturesSection = dynamic(() => import('./features-section').then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="min-h-[50vh] bg-gradient-to-b from-white to-slate-50" />
});

const TestimonialsSection = dynamic(() => import('./testimonials-section').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="min-h-[50vh] bg-gradient-to-b from-slate-50 to-white" />
});

const TaskDashboard = dynamic(() => import('@/components/TaskDashboard'), {
  loading: () => (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4">
          <CheckSquare className="w-6 h-6 text-rose-700 animate-pulse" />
        </div>
        <p className="text-slate-600">Loading your tasks...</p>
      </div>
    </div>
  )
});

// Footer Component
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-rose-50/30 pt-16 pb-8">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-10 w-64 h-64 bg-gradient-to-br from-rose-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-gradient-to-tl from-rose-100/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black bg-gradient-to-r from-rose-900 to-rose-700 bg-clip-text text-transparent">
                  TaskZen
                </h2>
                <p className="text-sm text-slate-600">AI-Powered Productivity</p>
              </div>
            </div>
            <p className="text-slate-600 mb-8 max-w-md">
              The task manager that balances power and simplicity. Designed for modern teams who move fast.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: Globe, label: 'Website' },
                { icon: MessageSquare, label: 'Twitter' },
                { icon: BookOpen, label: 'Blog' },
                { icon: HelpCircle, label: 'Help' },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'How It Works', 'AI Assistant', 'Mobile App', 'Integrations'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 hover:text-rose-700 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 hover:text-rose-700 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'API', 'Community', 'Help Center', 'Status'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 hover:text-rose-700 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'Cookies', 'GDPR'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 hover:text-rose-700 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <span>© {new Date().getFullYear()} TaskZen. All rights reserved.</span>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500" />
                <Coffee className="w-3 h-3 text-amber-600" />
              </div>
            </div>
            <div className="text-sm text-slate-600">
              <span>Made with care for productive teams worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Optimized Navbar with Perfect Size
function Navigation({ signOut }: { signOut: () => Promise<void> }) {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${scrolled
        ? 'shadow-sm'
        : ''
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo - Perfect Size */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 12 }}
              className="relative"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-black bg-gradient-to-r from-rose-900 to-rose-700 bg-clip-text text-transparent leading-none">
                TaskZen
              </span>
              <span className="text-[10px] font-medium text-slate-500 leading-none mt-0.5">AI-Powered Todo</span>
            </div>
          </Link>

          {/* Right Section - Compact */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:block px-4 py-2 bg-gradient-to-r from-rose-900 to-rose-600 text-white text-sm rounded-lg font-medium hover:shadow-md transition-shadow"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                  }}
                  className="hidden md:block px-3 py-2 text-slate-600 hover:text-rose-900 text-sm font-medium rounded-lg hover:bg-rose-50 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="hidden md:flex border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 px-4 py-2 h-9 text-sm rounded-lg font-medium transition-all"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="hidden md:flex bg-gradient-to-r from-rose-900 to-rose-600 hover:shadow-md px-4 py-2 h-9 text-sm rounded-lg font-medium transition-all"
                >
                  <Link href="/register" className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Sign Up Free
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-4 h-4 text-rose-700" /> : <Menu className="w-4 h-4 text-rose-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Sidebar Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
              />

              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="md:hidden fixed inset-y-0 right-0 z-50 w-[280px] bg-white shadow-2xl border-l border-rose-100 flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                      <CheckSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-black text-lg text-slate-900">TaskZen</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 p-5 overflow-y-auto">
                  <div className="space-y-6">
                    {!user ? (
                      <>
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Get Started</p>
                          <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-medium transition-all group"
                          >
                            <User className="w-5 h-5 text-slate-400 group-hover:text-rose-600" />
                            Sign In
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-900 to-rose-600 text-white font-bold shadow-lg shadow-rose-900/20 hover:shadow-rose-900/30 transition-all"
                          >
                            <Sparkles className="w-5 h-5" />
                            Sign Up Free
                          </Link>
                        </div>

                        <div className="pt-6 border-t border-slate-100 space-y-3">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Menu</p>
                          {['Features', 'Testimonials'].map((item) => (
                            <Link
                              key={item}
                              href={`#${item.toLowerCase()}`}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2.5 rounded-xl text-slate-600 hover:text-rose-900 hover:bg-slate-50 font-medium transition-colors"
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-rose-700 font-bold shadow-sm">
                              {user.email?.[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{user.email?.split('@')[0]}</p>
                              <p className="text-xs text-slate-500">Free Plan</p>
                            </div>
                          </div>
                          <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white rounded-xl text-sm font-bold text-rose-700 shadow-sm hover:shadow-md transition-all"
                          >
                            Go to Dashboard
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={async () => {
                              await signOut();
                              setIsOpen(false);
                            }}
                            className="flex items-center w-full gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-rose-700 font-medium transition-all group"
                          >
                            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-600" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                  <p className="text-xs text-center text-slate-400">© 2024 TaskZen Inc.</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Main home page component
function HomePageContent() {
  const { user, loading, signOut } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = { passive: true } as AddEventListenerOptions;
    const handleScroll = () => { };
    window.addEventListener('scroll', handleScroll, options);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4"
          >
            <CheckSquare className="w-6 h-6 text-rose-700" />
          </motion.div>
          <p className="text-slate-600 text-sm">Loading TaskZen...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Navigation signOut={signOut} />

      <div className="pt-16">
        {!user ? (
          <>
            <Suspense fallback={
              <div className="min-h-[100dvh] bg-gradient-to-b from-rose-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4"
                  >
                    <CheckSquare className="w-8 h-8 text-rose-700" />
                  </motion.div>
                  <p className="text-slate-600">Loading TaskZen...</p>
                </div>
              </div>
            }>
              <HeroSection />
            </Suspense>

            <div id="features">
              <Suspense fallback={
                <div className="min-h-[50vh] py-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 text-rose-700 animate-pulse" />
                    </div>
                    <p className="text-slate-600 text-sm">Loading features...</p>
                  </div>
                </div>
              }>
                <FeaturesSection />
              </Suspense>
            </div>

            <div id="testimonials">
              <Suspense fallback={
                <div className="min-h-[50vh] py-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-3">
                      <Star className="w-5 h-5 text-rose-700 animate-pulse" />
                    </div>
                    <p className="text-slate-600 text-sm">Loading testimonials...</p>
                  </div>
                </div>
              }>
                <TestimonialsSection />
              </Suspense>
            </div>

            {/* Added Footer */}
            <Footer />
          </>
        ) : (
          <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
            <Suspense fallback={
              <div className="min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4"
                  >
                    <CheckSquare className="w-6 h-6 text-rose-700" />
                  </motion.div>
                  <p className="text-slate-600 text-sm">Preparing your workspace...</p>
                </div>
              </div>
            }>
              <TaskDashboard />
            </Suspense>
          </main>
        )}
      </div>

      {/* Floating Action Button */}
      {user && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-rose-900 to-rose-600 shadow-lg shadow-rose-900/30 flex items-center justify-center"
          aria-label="Quick add task"
        >
          <Plus className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </div>
  );
}

// Main page component
export default function Home() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  );
}