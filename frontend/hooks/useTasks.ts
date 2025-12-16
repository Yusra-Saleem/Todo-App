'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import { makeApiRequest } from '@/utils/api';
import toast from 'react-hot-toast';

type UseTasksReturn = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompletion: (id: string, isCompleted: boolean) => Promise<void>;
};

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await makeApiRequest('/api/tasks');
      const data = await response.json();
      setTasks(data.data || data); // Handle both paginated and non-paginated responses
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while fetching tasks';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await makeApiRequest('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData)
      });

      const newTask = await response.json();
      setTasks(prev => [newTask, ...prev]); // Add new task to the beginning
      toast.success('Task created successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while creating the task';
      // setError(message);
      toast.error(message);
      throw err;
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      const response = await makeApiRequest(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });

      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      toast.success('Task updated successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while updating the task';
      // setError(message);
      toast.error(message);
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await makeApiRequest(`/api/tasks/${id}`, {
        method: 'DELETE'
      });

      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while deleting the task';
      // setError(message); // Don't block the UI
      toast.error(message);
      throw err;
    }
  };

  const toggleTaskCompletion = async (id: string, isCompleted: boolean) => {
    try {
      const response = await makeApiRequest(`/api/tasks/${id}/complete`, {
        method: 'PATCH'
      });

      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));

      if (isCompleted) {
        toast.success('Task marked as completed!');
      } else {
        toast.success('Task marked as incomplete!');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred while toggling task completion';
      // setError(message);
      toast.error(message);
      throw err;
    }
  };



  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  };
};