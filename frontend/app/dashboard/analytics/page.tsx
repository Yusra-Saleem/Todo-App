'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/hooks/useTasks';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Target,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Activity,
  ArrowUp,
  ArrowDown,
  Brain,
  Sparkles,
  Calendar,
  Check,
  CheckSquare
} from 'lucide-react';

// Mock data for the analytics
const mockAnalyticsData = {
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  productivityScore: 0,
  tasksPerDay: [0, 0, 0, 0, 0, 0, 0],
  productivityTrend: [0, 0, 0, 0, 0, 0, 0],
  completionTrend: [0, 0, 0, 0, 0, 0, 0],
};

function AnalyticsContent() {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const { signOut, user, loading: authLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData);
  const [showAllTasks, setShowAllTasks] = useState(false);
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

  // Set up real-time updates by re-calculating every 5 seconds for more responsive updates
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        fetchTasks(); // Refresh task data
      }, 120000); // Update every 2 min for more responsive updates

      return () => clearInterval(interval);
    }
  }, [user, fetchTasks]);

  // Calculate analytics based on real task data with real-time updates
  useEffect(() => {
    if (tasks.length > 0) {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.is_completed).length;
      const pendingTasks = tasks.filter(task => !task.is_completed && !task.is_deleted).length; // All non-completed, non-deleted tasks (including overdue)

      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Calculate tasks completed per day for the last 7 days
      const now = new Date();
      const lastSevenDays = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        lastSevenDays.push(date);
      }

      // Count completed tasks per day more accurately
      const tasksPerDay = lastSevenDays.map(date => {
        const dateStr = date.toDateString();
        return tasks.filter(task => {
          if (!task.is_completed || !task.updated_at) return false;
          const taskDate = new Date(task.updated_at);
          return taskDate.toDateString() === dateStr;
        }).length;
      });

      // Calculate productivity trend as completion rate per day
      const productivityTrend = lastSevenDays.map(date => {
        const dateStr = date.toDateString();
        const dayTasks = tasks.filter(task => {
          const taskDate = new Date(task.created_at || task.updated_at);
          return taskDate.toDateString() === dateStr;
        });
        const dayCompletedTasks = dayTasks.filter(t => t.is_completed).length;
        return dayTasks.length > 0 ? Math.round((dayCompletedTasks / dayTasks.length) * 100) : 0;
      });

      setAnalyticsData({
        totalTasks,
        completedTasks,
        pendingTasks,
        productivityScore: completionRate,
        tasksPerDay,
        productivityTrend,
        completionTrend: tasksPerDay, // Using tasks per day as the trend
      });
    } else {
      setAnalyticsData(prevData => {
        const hasChanged =
          prevData.totalTasks !== mockAnalyticsData.totalTasks ||
          prevData.completedTasks !== mockAnalyticsData.completedTasks ||
          prevData.pendingTasks !== mockAnalyticsData.pendingTasks ||
          prevData.productivityScore !== mockAnalyticsData.productivityScore ||
          JSON.stringify(prevData.tasksPerDay) !== JSON.stringify(mockAnalyticsData.tasksPerDay) ||
          JSON.stringify(prevData.productivityTrend) !== JSON.stringify(mockAnalyticsData.productivityTrend);

        return hasChanged ? mockAnalyticsData : prevData;
      });
    }
  }, [tasks]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
        <p className="text-slate-600 font-medium">Analyzing your productivity...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-rose-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mb-6 shadow-lg">
          <Brain className="w-10 h-10 text-rose-700" />
        </div>
        <p className="text-rose-700 font-medium">Error loading analytics. Please try again.</p>
      </div>
    </div>
  );

  // Calculate task completion percentage
  const completionPercentage = analyticsData.totalTasks > 0 ? Math.round((analyticsData.completedTasks / analyticsData.totalTasks) * 100) : 0;
  const pendingPercentage = analyticsData.totalTasks > 0 ? Math.round((analyticsData.pendingTasks / analyticsData.totalTasks) * 100) : 0;

  // Days for the charts - properly define within the component
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} relative z-10`}>
        {/* Dashboard Header */}
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="max-w-7xl mx-auto p-3 sm:p-4">
          {/* Analytics Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 rotate-12" />
              <div className="absolute -top-2 -right-6 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 -rotate-12" />

              <div className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-4 lg:p-5 border border-white/80 shadow-lg shadow-slate-200/50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-3 py-1.5 rounded-full mb-2">
                      <BarChart3 className="w-4 h-4 text-rose-700" />
                      <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">Analytics</span>
                    </div>
                    <h1 className="text-xl lg:text-2xl font-black text-slate-900 mb-1">
                      Your <span className="bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient">
                        Productivity Dashboard
                      </span>
                    </h1>
                    <p className="text-slate-600 text-sm">Live analytics of your task performance</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="border border-slate-200 hover:bg-slate-50 text-xs py-1.5 px-2.5"
                    >
                      <Calendar className="w-3 h-3 mr-1.5" />
                      Live Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Full Task List */}
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30 mb-6"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-100/50 to-green-100/50 rounded-full translate-x-18 -translate-y-18" />
            <Card className="relative bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-rose-500" />
                  <span>All Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <CheckSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm">No tasks available</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(showAllTasks ? tasks : tasks.slice(0, 5)).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          task.is_completed
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'border-slate-300'
                        }`}>
                          {task.is_completed && (
                            <Check className="w-2.5 h-2.5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-xs font-medium truncate ${
                              task.is_completed
                                ? 'text-emerald-700 line-through'
                                : task.is_deleted
                                ? 'text-slate-400 line-through'
                                : 'text-slate-900'
                            }`}>
                              {task.title}
                            </h3>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                              task.is_completed ? 'bg-emerald-100 text-emerald-800' :
                              task.is_deleted ? 'bg-slate-100 text-slate-800' :
                              'bg-amber-100 text-amber-800'}`}>
                              {task.is_completed ? 'Completed' :
                               task.is_deleted ? 'Deleted' :
                               'Pending'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[8px] text-slate-500">
                            {task.created_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-2.5 h-2.5" />
                                <span>{new Date(task.created_at).toLocaleDateString()}</span>
                              </div>
                            )}
                            {task.due_date && !task.is_completed && !task.is_deleted && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {tasks.length > 5 && !showAllTasks && (
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full py-1.5 text-xs border-slate-300 hover:bg-slate-100"
                          onClick={() => setShowAllTasks(true)}
                        >
                          Show {tasks.length - 5} More Tasks
                        </Button>
                      </div>
                    )}
                    {showAllTasks && tasks.length > 5 && (
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full py-1.5 text-xs border-slate-300 hover:bg-slate-100"
                          onClick={() => setShowAllTasks(false)}
                        >
                          Show Less
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-6"
          >
            {/* Total Tasks Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-rose-200/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-lg shadow-rose-900/10">
                    <Target className="h-4 w-4 text-rose-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-rose-700 uppercase tracking-wider">Total</div>
                    <div className="text-xl font-black text-slate-900">{analyticsData.totalTasks}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-medium">All tasks</div>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </CardContent>
            </Card>

            {/* Completed Tasks Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-emerald-200/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-lg shadow-emerald-900/10">
                    <CheckCircle className="h-4 w-4 text-emerald-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider">Done</div>
                    <div className="text-xl font-black text-slate-900">{analyticsData.completedTasks}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-medium">Completed</div>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: `${completionPercentage}%` }} />
                </div>
              </CardContent>
            </Card>

            {/* Productivity Card */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-white to-white/90 border border-white/80 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-sky-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center shadow-lg shadow-blue-900/10">
                    <TrendingUp className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-bold text-blue-700 uppercase tracking-wider">Productivity</div>
                    <div className="text-xl font-black text-slate-900">{analyticsData.productivityScore}%</div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-medium">Efficiency score</div>
                <div className="mt-2 flex items-center gap-1.5">
                  {analyticsData.productivityScore >= 80 ? (
                    <Sparkles className="h-3 w-3 text-emerald-600" />
                  ) : analyticsData.productivityScore >= 50 ? (
                    <Zap className="h-3 w-3 text-amber-600" />
                  ) : (
                    <Activity className="h-3 w-3 text-rose-600" />
                  )}
                  <span className="text-xs font-medium text-slate-700">
                    {analyticsData.productivityScore >= 80 ? 'High' : analyticsData.productivityScore >= 50 ? 'Medium' : 'Low'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-6">
            {/* Tasks Per Day Chart */}
            <div
              className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30"
            >
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tl from-rose-100/50 to-pink-100/50 rounded-full" />
              <Card className="relative bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 text-sm">
                    <TrendingUp className="w-4 h-4 text-rose-500" />
                    <span>Tasks Completed Per Day</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-1 pt-2">
                    {analyticsData.tasksPerDay && analyticsData.tasksPerDay.length > 0 ? (
                      analyticsData.tasksPerDay.map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full flex justify-center">
                            <motion.div
                              className="w-3/4 bg-gradient-to-t from-rose-500 to-pink-500 rounded-t-sm shadow"
                              initial={{ height: 0 }}
                              animate={{ height: `${analyticsData.tasksPerDay && Math.max(...analyticsData.tasksPerDay) > 0
                                ? (value / Math.max(...analyticsData.tasksPerDay, 1)) * 100
                                : 0}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-600 mt-1">{days[index]}</span>
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-slate-500 text-sm">No data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Productivity Trend Chart */}
            <div
              className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100/50 to-sky-100/50 rounded-full" />
              <Card className="relative bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 text-sm">
                    <Activity className="w-4 h-4 text-rose-500" />
                    <span>Productivity Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-between gap-1 pt-2">
                    {analyticsData.productivityTrend && analyticsData.productivityTrend.length > 0 ? (
                      analyticsData.productivityTrend.map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="w-full flex justify-center">
                            <motion.div
                              className="w-3/4 bg-gradient-to-t from-blue-500 to-sky-500 rounded-t-sm shadow"
                              initial={{ height: 0 }}
                              animate={{ height: `${analyticsData.productivityTrend && Math.max(...analyticsData.productivityTrend) > 0
                                ? (value / Math.max(...analyticsData.productivityTrend, 1)) * 100
                                : 0}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-600 mt-1">{days[index]}</span>
                        </div>
                      ))
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-slate-500 text-sm">No data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Task Completion Overview */}
          <div
            className="relative overflow-hidden bg-gradient-to-br from-white to-white/90 rounded-2xl border border-white/80 shadow-lg shadow-slate-200/30"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-sky-100/50 rounded-full -translate-x-16 -translate-y-16" />
            <Card className="relative bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 text-sm">Task Completion Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                      <span className="text-slate-700 font-medium text-sm">Completed</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-lg font-black text-slate-900">{analyticsData.completedTasks}</div>
                        <div className="text-xs text-slate-600">tasks</div>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 text-right">{completionPercentage}% of total</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <span className="text-slate-700 font-medium text-sm">Pending</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-lg font-black text-slate-900">{analyticsData.pendingTasks}</div>
                        <div className="text-xs text-slate-600">tasks</div>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${pendingPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 text-right">{pendingPercentage}% of total</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}