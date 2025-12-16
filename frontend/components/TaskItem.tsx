// components/TaskItem.tsx - Creative & Themed
'use client';

import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit3, Circle, Check, Calendar, Clock, Star, Zap, Flame, Target, Sparkles } from 'lucide-react';
import { useState } from 'react';

type TaskItemProps = {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggleCompletion, onEdit, onDelete }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleCompletion = () => {
    onToggleCompletion(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this creative task?')) {
      onDelete(task.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityIcon = () => {
    const titleLength = task.title.length;
    if (titleLength > 30) return <Target className="h-4 w-4 text-rose-600" />;
    if (titleLength > 20) return <Flame className="h-4 w-4 text-amber-600" />;
    return <Star className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg ${task.is_completed
          ? 'bg-gradient-to-r from-emerald-50/80 to-green-50/60 border-emerald-100'
          : 'bg-gradient-to-r from-white to-white/90 border-slate-100 hover:border-rose-100'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      {isHovered && !task.is_completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/30 to-pink-50/20" />
      )}

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Custom Checkbox */}
          <button
            onClick={handleToggleCompletion}
            className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.is_completed
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-500'
                : 'border-slate-300 hover:border-rose-400 hover:bg-rose-50'
              }`}
          >
            {task.is_completed && (
              <Check className="h-3.5 w-3.5 text-white" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {!task.is_completed && getPriorityIcon()}
                  <h3 className={`text-base font-bold ${task.is_completed
                      ? 'line-through text-slate-500'
                      : 'text-slate-900'
                    }`}>
                    {task.title}
                  </h3>
                </div>

                {task.description && (
                  <p className={`text-sm mb-3 ${task.is_completed
                      ? 'line-through text-slate-400'
                      : 'text-slate-600'
                    }`}>
                    {task.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs flex-wrap">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium ${task.is_completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800'
                    }`}>
                    {task.is_completed ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-3 w-3" />
                        <span>Active</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(task.created_at)}</span>
                  </div>

                  {task.updated_at !== task.created_at && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>Updated {formatDate(task.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons - Always visible on mobile, hover on desktop */}
              <div className={`flex items-center gap-1 transition-opacity duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="h-9 w-9 p-0 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-9 w-9 p-0 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {!task.is_completed && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-slate-700">Progress</div>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" style={{ width: '40%' }} />
              </div>
              <div className="text-xs font-bold text-rose-700">40%</div>
            </div>
          </div>
        )}

        {/* Completed Celebration */}
        {task.is_completed && (
          <div className="mt-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">
              Great job! Completed {formatDate(task.updated_at)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}