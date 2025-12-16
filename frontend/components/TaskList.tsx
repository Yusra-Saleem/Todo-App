// components/TaskList.tsx - Creative & Themed
'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import TaskItem from '@/components/TaskItem';
import TaskEditModal from '@/components/TaskEditModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Search, Sparkles, Zap, Target, Brain, TrendingUp } from 'lucide-react';

type TaskListProps = {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onUpdateTask: (id: string, data: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
};

type SortField = 'title' | 'created_at' | 'updated_at' | 'is_completed';
type SortDirection = 'asc' | 'desc';

export default function TaskList({ tasks, onToggleCompletion, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterText, setFilterText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const handleUpdateTask = async (id: string, data: Partial<Task>) => {
    await onUpdateTask(id, data);
    setEditingTask(null);
  };

  // Filter tasks based on search text
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filterText.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // Handle Title (Case Insensitive)
    if (sortField === 'title') {
      return sortDirection === 'asc'
        ? (aValue as string).localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue as string);
    }

    // Handle Dates
    if (sortField === 'created_at' || sortField === 'updated_at') {
      const dateA = new Date(aValue as string).getTime();
      const dateB = new Date(bValue as string).getTime();

      // Fallback to string comparison if dates are invalid
      if (isNaN(dateA) || isNaN(dateB)) {
        return sortDirection === 'asc'
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string);
      }

      aValue = dateA;
      bValue = dateB;
    }

    // Handle Boolean
    if (sortField === 'is_completed') {
      aValue = aValue ? 1 : 0;
      bValue = bValue ? 1 : 0;
    }

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const priorityTasks = sortedTasks.filter(task => !task.is_completed).slice(0, 3);
  const recentCompleted = sortedTasks.filter(task => task.is_completed).slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar - Creative Design */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-pink-50/50 rounded-xl blur-sm" />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rose-400" />
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search your creative tasks..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-rose-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 text-sm placeholder:text-slate-400"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-rose-100 text-slate-700 hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50 rounded-xl"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <Sparkles className={`ml-2 h-4 w-4 ${showFilters ? 'text-rose-500' : 'text-slate-400'}`} />
          </Button>
          <Button
            onClick={() => {
              setSortField('created_at');
              setSortDirection('desc');
              setFilterText('');
              setShowFilters(true); // Show user what happened
            }}
            className="bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white rounded-xl shadow-lg shadow-rose-900/20"
          >
            <Brain className="mr-2 h-4 w-4" />
            AI Sort
          </Button>
        </div>
      </div>



      {/* All Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-rose-600" />
            <h3 className="text-lg font-black text-slate-900">All Tasks ({sortedTasks.length})</h3>
          </div>
          <div className="text-sm text-slate-500">
            {sortedTasks.filter(t => !t.is_completed).length} pending
          </div>
        </div>

        {/* Filters Dropdown */}
        {showFilters && (
          <Card className="border border-rose-100 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-rose-500" />
                    Sort By
                  </label>
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="w-full p-3 bg-white border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 text-sm"
                  >
                    <option value="created_at">Date Created</option>
                    <option value="title">Title</option>
                    <option value="is_completed">Status</option>
                    <option value="updated_at">Last Updated</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Order</label>
                  <select
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as SortDirection)}
                    className="w-full p-3 bg-white border border-rose-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-300 text-sm"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task List */}
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-gradient-to-br from-white to-white/90 border border-white/80 shadow-lg">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center mb-6 shadow-lg">
              <Search className="h-10 w-10 text-rose-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">
              {filterText ? 'No creative tasks found' : 'Start your creative journey'}
            </h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              {filterText
                ? "Try a different search or create something new!"
                : 'Create your first task and watch your productivity soar.'}
            </p>
            {filterText && (
              <Button
                variant="outline"
                onClick={() => setFilterText('')}
                className="border-rose-100 text-slate-700 hover:border-rose-200 hover:text-rose-700"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleCompletion={onToggleCompletion}
                onEdit={() => handleEditTask(task)}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recent Completed */}
      {recentCompleted.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">Recent Wins</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentCompleted.map((task) => (
              <div key={task.id} className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-xl border border-emerald-100/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-900 line-through">{task.title}</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">Completed today</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-100 to-green-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Edit Modal */}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onUpdate={handleUpdateTask}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}