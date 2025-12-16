'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { makeApiRequest } from '@/utils/api';

// Define types
type User = {
  id: string;
  email: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      verifyToken(token)
        .then(userInfo => {
          setUser(userInfo);
        })
        .catch(() => {
          // If token is invalid, clear it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Call the backend authentication API
      const response = await makeApiRequest('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      const { access_token } = data;

      // Store the token in localStorage
      localStorage.setItem('token', access_token);

      // Get user profile data
      const profileResponse = await makeApiRequest('/user/profile', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await profileResponse.json();
      const user: User = {
        id: userData.id,
        email: userData.email,
      };

      setUser(user);
      toast.success('Successfully signed in!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed. Please try again.');
      throw error; // Re-throw so the calling component can handle it
    }
  };

  const signOut = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      setUser(null);

      toast.success('Successfully signed out!');
      router.push('/');
    } catch (error) {
      toast.error('Sign out failed. Please try again.');
    }
  };

  const verifyToken = async (token: string): Promise<User> => {
    try {
      const response = await makeApiRequest('/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const userData = await response.json();
      return { id: userData.id, email: userData.email };
    } catch (error) {
      throw new Error('Token verification failed');
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};