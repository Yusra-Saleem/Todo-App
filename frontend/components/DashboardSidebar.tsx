// components/DashboardSidebar.tsx - Creative & Themed
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, Settings, BarChart3, Bell, User, LogOut, CheckSquare, Calendar, FileText, Users, ChevronLeft, ChevronRight, Sparkles, Zap, Target, Brain, LayoutDashboard, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

export default function DashboardSidebar({
  isCollapsed,
  toggleCollapse,
  signOut,
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  signOut: () => Promise<void>;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-slate-900 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl overflow-y-auto"
            >
              <div className="h-full flex flex-col bg-gradient-to-b from-white to-slate-50">
                {/* Mobile Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-900 via-rose-700 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/20">
                      <CheckSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-black bg-gradient-to-r from-rose-950 to-rose-600 bg-clip-text text-transparent font-serif">TaskZen</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}>
                    <ChevronLeft className="h-5 w-5 text-slate-500" />
                  </Button>
                </div>

                {/* Mobile Nav Items */}
                <div className="flex-1 px-3 py-6">
                  <ul className="space-y-1">
                    {sidebarItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link href={item.href} onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start rounded-xl mb-1 h-12 relative overflow-hidden ${isActive
                                ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border-l-4 border-rose-500'
                                : 'text-slate-600'
                                }`}
                            >
                              <span className={`mr-3 ${isActive ? 'text-rose-600' : 'text-slate-500'}`}>{item.icon}</span>
                              <span className="font-medium">{item.title}</span>
                            </Button>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Mobile User Section */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {mounted && typeof window !== 'undefined' ? 'U' : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Creative User</p>
                      <p className="text-xs text-slate-500">Pro Plan</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-rose-600 h-10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className={`bg-gradient-to-b from-white to-slate-50/50 border-r border-slate-100 h-screen top-0 fixed z-40 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'
        } hidden md:block shadow-xl shadow-slate-200/30`}>
        <div className="h-full flex flex-col">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-white via-white to-rose-50/30">
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              {!isCollapsed && (
                <div className="flex items-center gap-4">
                  <Link href="/" className="group flex items-center gap-3">
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
              )}
              {isCollapsed && (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/20 mx-auto p-2">
                  <img src="/taskzen-logo.png" alt="TaskZen" className="w-full h-full object-contain" />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapse}
                className="h-9 w-9 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6">
            <div className="mb-6">
              {!isCollapsed && (
                <div className="px-3 mb-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-3 py-1.5 rounded-lg">
                    <Sparkles className="h-4 w-4 text-rose-700" />
                    <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">AI-Powered</span>
                  </div>
                </div>
              )}

              <ul className="space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start rounded-xl mb-1 h-12 relative overflow-hidden group ${isActive
                            ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border-l-4 border-rose-500 shadow-sm shadow-rose-900/5'
                            : 'text-slate-600 hover:text-rose-700 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50'
                            }`}
                        >
                          <div className="flex items-center">
                            <span className={`transition-colors ${isActive ? 'text-rose-600' : 'text-slate-500 group-hover:text-rose-600'}`}>
                              {item.icon}
                            </span>
                            {!isCollapsed && (
                              <span className="ml-3 font-medium">{item.title}</span>
                            )}
                          </div>
                          {item.badge && !isCollapsed && (
                            <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${isActive
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700'
                              }`}>
                              {item.badge}
                            </span>
                          )}
                        </Button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Productivity Stats */}
            {!isCollapsed && (
              <div className="mx-3 mt-8 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-rose-700" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Productivity</div>
                    <div className="text-xs text-slate-500">Today's score</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full w-3/4" />
                </div>
              </div>
            )}
          </nav>

          {/* User Profile & Sign Out */}
          <div className="mt-auto p-4 border-t border-slate-100 bg-gradient-to-r from-white via-white to-rose-50/30">
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-900/20">
                      {mounted && typeof window !== 'undefined' ? 'U' : 'U'}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Creative User</p>
                    <p className="text-xs text-slate-500">Pro Plan</p>
                  </div>
                </div>
                <Star className="h-5 w-5 text-amber-500" />
              </div>
            )}

            {isCollapsed && (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-900/20 mx-auto mb-4">
                {mounted && typeof window !== 'undefined' ? 'U' : 'U'}
              </div>
            )}

            <Button
              variant="ghost"
              className={`w-full justify-start rounded-xl text-rose-600 hover:text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 ${isCollapsed ? 'h-11 justify-center' : 'h-11'
                }`}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              {/* Fix: This was closing the conditional improperly in the original code logic if not careful, but looks safe here */}
              {!isCollapsed && <span className="ml-3 font-medium">Sign Out</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}