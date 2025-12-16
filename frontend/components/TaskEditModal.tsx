// components/TaskEditModal.tsx - Creative & Themed
'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Sparkles, Target, Clock, Zap, CheckCircle } from 'lucide-react';

type TaskEditModalProps = {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
  onClose: () => void;
};

export default function TaskEditModal({ task, onUpdate, onClose }: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [isCompleted, setIsCompleted] = useState(task.is_completed);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onUpdate(task.id, {
        title,
        description: description || undefined,
        is_completed: isCompleted
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0 p-0 overflow-hidden bg-gradient-to-br from-white to-white/90">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-100/50 to-pink-100/50 rounded-full -translate-x-16 -translate-y-16" />
        <div className="relative">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black text-slate-900">Edit Creative Task</DialogTitle>
                <p className="text-sm text-slate-600">Refine and update your masterpiece</p>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
            {/* Title Field */}
            <div>
              <Label htmlFor="edit-title" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-rose-600" />
                Task Title *
              </Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={1}
                maxLength={255}
                className="h-12 px-4 border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            {/* Description Field */}
            <div>
              <Label htmlFor="edit-description" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-600" />
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={1000}
                className="min-h-[120px] border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                {description.length}/1000 characters
              </p>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-emerald-100 to-green-100' 
                    : 'bg-gradient-to-r from-rose-100 to-pink-100'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Zap className="h-5 w-5 text-rose-600" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {isCompleted ? 'Completed' : 'In Progress'}
                  </div>
                  <div className="text-xs text-slate-600">
                    {isCompleted ? 'Task is done' : 'Still working on it'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCompleted(!isCompleted)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isCompleted ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isCompleted ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50 rounded-xl px-6 py-3"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white shadow-xl hover:shadow-2xl hover:shadow-rose-900/30 rounded-xl px-8 py-3 font-bold"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Update Task
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}