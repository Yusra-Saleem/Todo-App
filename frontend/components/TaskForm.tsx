// components/TaskForm.tsx - Creative & Themed
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, Zap, Target, Clock } from 'lucide-react';

type TaskFormProps = {
  onSubmit: (data: { title: string; description?: string }) => Promise<void>;
  onCancel: () => void;
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit({ title, description: description || undefined });
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        {/* Title Field */}
        <div>
          <Label htmlFor="title" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-600" />
            Task Title *
          </Label>
          <div className="relative">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={1}
              maxLength={255}
              placeholder="What creative task are you working on?"
              className="h-12 px-4 border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 pl-12"
              autoFocus
            />
            <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rose-400" />
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Make it descriptive and inspiring
          </p>
        </div>

        {/* Description Field */}
        <div>
          <Label htmlFor="description" className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-rose-600" />
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            placeholder="Add details, inspiration, or notes about this creative task..."
            className="min-h-[120px] border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-500">
              {description.length}/1000 characters
            </p>
            {description.length > 800 && (
              <p className="text-xs text-amber-600 font-medium">
                Almost full!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-slate-100">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full sm:w-auto border-slate-200 text-slate-700 hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50 rounded-xl px-6 py-6 sm:py-3 h-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white shadow-xl hover:shadow-2xl hover:shadow-rose-900/30 rounded-xl px-8 py-6 sm:py-3 h-auto font-bold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Create Creative Task
        </Button>
      </div>
    </form>
  );
}