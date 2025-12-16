// app/dashboard/page.tsx - Creative & Themed
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CheckCircle, Circle, Calendar, Filter, TrendingUp, Clock, Zap, Sparkles, Target, Brain, Rocket, Award, Star, TrendingUpIcon, Flame } from 'lucide-react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { motion } from 'framer-motion';

function DashboardContent() {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const { signOut, user, loading: authLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleCreateTask = async (taskData: { title: string; description?: string }) => {
    try {
      await createTask({
        ...taskData,
        is_completed: false,
      });
      await fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleCompletion = async (id: string) => {
    try {
      await toggleTaskCompletion(id, !tasks.find(t => t.id === id)?.is_completed);
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-6 shadow-lg">
            <Brain className="w-10 h-10 text-rose-700 animate-pulse" />
          </div>
          <p className="text-slate-600 font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-rose-700 animate-pulse" />
        </div>
        <p className="text-slate-600 font-medium">Preparing your creative space...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-rose-700" />
        </div>
        <p className="text-rose-700 font-medium">Error loading tasks. Please try again.</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 via-white to-rose-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-rose-100/15 to-pink-100/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-rose-50/5 via-transparent to-rose-50/5 rounded-full" />
      </div>

      {/* Sidebar */}
      <DashboardSidebar
        isCollapsed={sidebarCollapsed}
        toggleCollapse={toggleSidebar}
        signOut={signOut}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-72'} relative z-10`}>
        {/* Dashboard Header */}
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Welcome Header with Creative Design */}
          <div className="mb-8 lg:mb-12">
            <div className="relative mb-12 lg:mb-16">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 rotate-12" />
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 -rotate-12" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/80 shadow-lg shadow-slate-200/50">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-2 rounded-full mb-3">
                    <Sparkles className="w-4 h-4 text-rose-700" />
                    <span className="text-sm font-bold text-rose-900 uppercase tracking-wider">Welcome Back</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">
                    Hello, <span className="bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient">
                      {user?.email?.split('@')[0] || 'Creative'}
                    </span>!
                  </h1>
                  <p className="text-slate-600 font-medium">Your creative workspace is ready for amazing things today</p>
                </div>

                <Button
                  onClick={() => setShowForm(true)}
                  className="group relative overflow-hidden bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white shadow-xl hover:shadow-2xl hover:shadow-rose-900/30 transition-all duration-300 px-8 py-6 rounded-2xl font-bold text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Plus className="mr-3 h-5 w-5" />
                  Create New Task
                </Button>
              </div>
            </div>

            {/* Statistics Cards - Creative Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
              {/* Total Tasks Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-rose-200/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-lg shadow-rose-900/10">
                      <Target className="h-7 w-7 text-rose-700" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">Tasks</div>
                      <div className="text-4xl font-black text-slate-900">{totalTasks}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Active goals in progress</div>
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>

              {/* Completed Tasks Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-emerald-200/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-lg shadow-emerald-900/10">
                      <CheckCircle className="h-7 w-7 text-emerald-700" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Done</div>
                      <div className="text-4xl font-black text-slate-900">{completedTasks}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Successfully completed</div>
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: `${completionRate}%` }} />
                  </div>
                </div>
              </div>

              {/* Pending Tasks Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-amber-200/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center shadow-lg shadow-amber-900/10">
                      <Clock className="h-7 w-7 text-amber-700" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pending</div>
                      <div className="text-4xl font-black text-slate-900">{pendingTasks}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Awaiting your magic</div>
                  <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: `${100 - completionRate}%` }} />
                  </div>
                </div>
              </div>

              {/* Productivity Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center shadow-lg shadow-blue-900/10">
                      <TrendingUp className="h-7 w-7 text-blue-700" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Productivity</div>
                      <div className="text-4xl font-black text-slate-900">{completionRate}%</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Today's efficiency score</div>
                  <div className="mt-3 flex items-center gap-2">
                    {completionRate >= 80 ? (
                      <Rocket className="h-4 w-4 text-emerald-600" />
                    ) : completionRate >= 50 ? (
                      <Zap className="h-4 w-4 text-amber-600" />
                    ) : (
                      <Flame className="h-4 w-4 text-rose-600" />
                    )}
                    <span className="text-xs font-medium text-slate-700">
                      {completionRate >= 80 ? 'Super productive!' : completionRate >= 50 ? 'Good progress' : 'Keep going!'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Left Column - Task Form & List */}
              <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                {/* Task Form */}
                {showForm && (
                  <div className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-xl shadow-slate-200/50 p-1">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-full -translate-x-16 -translate-y-16" />
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-slate-900">Create New Magic</h2>
                          <p className="text-slate-600">Add a new task to your creative journey</p>
                        </div>
                      </div>
                      <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => setShowForm(false)}
                      />
                    </div>
                  </div>
                )}

                {/* Task List */}
                <div className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-xl shadow-slate-200/50">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-rose-50/50 to-pink-50/50 rounded-full translate-x-24 -translate-y-24" />
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl">
                    <div className="p-6 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-rose-700" />
                          </div>
                          <div>
                            <h2 className="text-xl font-black text-slate-900">Your Creative Tasks</h2>
                            <p className="text-sm text-slate-600">{tasks.length} active items</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-white rounded-full border border-slate-200">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium text-slate-700">AI-Powered</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <TaskList
                        tasks={tasks}
                        onToggleCompletion={handleToggleCompletion}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Creative Sidebar */}
              <div className="space-y-6 lg:space-y-8">
                {/* Productivity Stats */}
                <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/80 to-pink-50/80 rounded-2xl border border-rose-100/50 shadow-lg shadow-rose-200/20">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-200/30 to-pink-200/20 rounded-full translate-x-12 -translate-y-12" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">Productivity Pulse</h3>
                        <p className="text-sm text-slate-600">Daily insights</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-700 font-medium">Today's Progress</span>
                          <span className="font-bold text-rose-900">{completionRate}%</span>
                        </div>
                        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg shadow-rose-500/30"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-white/50 rounded-xl p-3 border border-white/50">
                          <div className="text-xs text-slate-600 mb-1">Avg. Completion</div>
                          <div className="text-lg font-black text-slate-900">2.1 days</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



                {/* Creative Tips */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/80 to-yellow-50/80 rounded-2xl border border-amber-100/50 shadow-lg shadow-amber-200/20">
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-amber-200/30 to-yellow-200/20 rounded-full" />
                  <div className="relative p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-6 w-6 text-amber-700" />
                      <h3 className="text-lg font-black text-slate-900">Pro Tip</h3>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Complete your most creative tasks during your peak focus hours to increase productivity by <span className="font-bold text-amber-700">47%</span>.
                    </p>
                    <div className="mt-4 pt-4 border-t border-amber-100">
                      <div className="text-xs text-slate-600">Your peak hours: 9 AM - 12 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return <DashboardContent />;
}