// app/login/page.tsx - Updated with your theme
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/LoginForm';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, CheckSquare, ArrowRight } from 'lucide-react';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [error, setError] = useState('');

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message || 'Sign in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-rose-100/20 to-pink-100/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8813370a_1px,transparent_1px),linear-gradient(to_bottom,#8813370a_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-rose-300/20 to-pink-300/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-rose-200/15 to-pink-200/10 blur-2xl"
      />

      <motion.div
        className="w-full max-w-md relative z-10"
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
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-900 via-rose-700 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/20 group-hover:shadow-rose-900/40 transition-all duration-300"
                            >
                              <CheckSquare className="w-6 h-6 text-white" />
                            </motion.div>
              {/* <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-900 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/20 p-2.5">
                <img src="/taskzen-logo.png" alt="TaskZen" className="w-full h-full object-contain" />
              </div> */}
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
            Welcome Back
          </motion.h2>
          <motion.p
            className="text-slate-600 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Sign in to your productive workspace
          </motion.p>
        </div>

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
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <LoginForm onSignIn={handleSignIn} />
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-slate-600 text-sm mb-4">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-bold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1 group"
            >
              Sign up free
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-50 to-white rounded-full border border-slate-200">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-slate-500">Join 10,000+ productive teams</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-rose-100/50 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-rose-100/50 rounded-br-3xl" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageContent />
    </AuthProvider>
  );
}