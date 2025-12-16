// components/RegisterForm.tsx - Updated with your theme
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

type RegisterFormProps = {
  onRegister: (email: string, password: string) => Promise<void>;
};

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please enter all fields');
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await onRegister(email, password);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-2xl shadow-slate-200/50 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 backdrop-blur-sm">
        {/* Card Background Decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-rose-50/50 to-transparent rounded-full -translate-y-24 translate-x-24" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-rose-100/30 to-transparent rounded-full -translate-x-24 translate-y-24" />
        
        <CardContent className="p-8 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 pr-4 h-12 bg-white border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-slate-500 hover:text-rose-700 font-medium transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-white border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password.length >= 6 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-emerald-600"
                >
                  <CheckCircle className="w-3 h-3" />
                  Password meets requirements
                </motion.div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Confirm Password
                </Label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-xs text-slate-500 hover:text-rose-700 font-medium transition-colors"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 bg-white border-slate-200 rounded-xl focus:border-rose-300 focus:ring-2 focus:ring-rose-500/20 transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && confirmPassword && password === confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-emerald-600"
                >
                  <CheckCircle className="w-3 h-3" />
                  Passwords match
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-rose-900 to-rose-600 hover:from-rose-800 hover:to-rose-500 text-white rounded-xl font-bold text-base shadow-lg shadow-rose-900/20 hover:shadow-xl hover:shadow-rose-900/30 transition-all duration-300 group"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>

        <CardFooter className="px-8 pb-8 pt-0">
          <div className="w-full">
            <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-800 mb-1">What you get with TaskZen:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• 14-day free trial with all premium features</li>
                    <li>• AI-powered task prioritization</li>
                    <li>• Team collaboration tools</li>
                    <li>• Mobile app access</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center text-xs text-slate-500">
              By signing up, you agree to our{' '}
              <button className="text-rose-700 hover:text-rose-900 font-medium">Terms</button>{' '}
              and{' '}
              <button className="text-rose-700 hover:text-rose-900 font-medium">Privacy Policy</button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}