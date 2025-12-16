// app/register/page.tsx - Updated with your theme
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/RegisterForm';
import { makeApiRequest } from '@/utils/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, CheckSquare, Rocket, Users, Shield, ArrowRight } from 'lucide-react';

function RegisterPageContent() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string) => {
    try {
      const response = await makeApiRequest('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      // If registration is successful, automatically try to sign in
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlays */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-rose-200/30 via-pink-200/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-rose-100/20 via-pink-100/15 to-transparent rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8813370a_1px,transparent_1px),linear-gradient(to_bottom,#8813370a_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-24 h-24 rounded-2xl bg-gradient-to-r from-rose-300/20 to-pink-300/10 blur-xl rotate-12"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-3xl bg-gradient-to-r from-rose-200/15 to-pink-200/10 blur-xl -rotate-12"
      />

      <motion.div
        className="w-full max-w-lg relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/20">
                <CheckSquare className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-black bg-gradient-to-r from-rose-900 via-rose-600 to-rose-900 bg-clip-text text-transparent bg-300% animate-gradient">
                  TaskZen
                </h1>
                <p className="text-xs text-slate-500">AI-Powered Todo Mastery</p>
              </div>
            </motion.div>
          </Link>

          <motion.h2
            className="text-3xl font-black text-slate-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Start Your Productivity Journey
          </motion.h2>
          <motion.p
            className="text-slate-600 font-medium max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Join thousands of teams who transformed their workflow
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: Rocket, text: '14-day free trial', color: 'bg-rose-100 text-rose-700' },
            { icon: Users, text: 'Team collaboration', color: 'bg-pink-100 text-pink-700' },
            { icon: Shield, text: 'Secure & private', color: 'bg-rose-50 text-rose-600' },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100">
              <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center mb-2`}>
                <feature.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-700">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {error && (
          <motion.div
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100 text-rose-700 font-medium text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
              {error}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <RegisterForm onRegister={handleRegister} />
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-slate-600 text-sm mb-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1 group"
            >
              Sign in here
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-50 to-white rounded-full border border-slate-200">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-slate-500">No credit card required • Cancel anytime</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-rose-100/50 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-rose-100/50 rounded-bl-3xl" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterPageContent />
    </AuthProvider>
  );
}