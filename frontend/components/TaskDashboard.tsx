// components/TaskDashboard.tsx - Updated with your theme
'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CheckCircle, Circle, Calendar, TrendingUp, Clock } from 'lucide-react';

export default function TaskDashboard() {
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data: { title: string; description?: string }) => {
    try {
      await createTask({
        ...data,
        is_completed: false
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

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4">
          <Circle className="w-6 h-6 text-rose-700 animate-pulse" />
        </div>
        <p className="text-slate-600">Loading tasks...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center py-10">
      <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-4">
        <Circle className="w-6 h-6 text-rose-700" />
      </div>
      <p className="text-rose-700 font-medium">Error loading tasks. Please try again.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-rose-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Tasks</p>
                <h3 className="text-xl font-black text-slate-900">{totalTasks}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <h3 className="text-xl font-black text-slate-900">{completedTasks}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending</p>
                <h3 className="text-xl font-black text-slate-900">{pendingTasks}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-sky-100 flex items-center justify-center mr-3">
                <TrendingUp className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Completion</p>
                <h3 className="text-xl font-black text-slate-900">{completionRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-900">Task Overview</h2>
          <p className="text-slate-600 text-sm">Manage and track your daily tasks</p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Task Form */}
      {showForm && (
        <Card className="border border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-black text-slate-900">Create New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onToggleCompletion={handleToggleCompletion}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
}