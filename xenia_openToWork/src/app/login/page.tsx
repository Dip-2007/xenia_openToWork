'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import { useUser } from '../../context/UserContext';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock User Data
    login({
      name: email.split('@')[0],
      email: email,
      id: 'USER-' + Math.random().toString(36).substr(2, 9)
    });

    setIsLoading(false);
    router.push('/');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access the grid."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              className="glass-input pl-11"
              placeholder="agent@csi-xenia.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <Link href="#" className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors">
              Forgot?
            </Link>
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              className="glass-input pl-11"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-2 group"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-200/50 text-center">
        <p className="text-sm text-slate-500">
          Don't have an identity yet?{' '}
          <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Register Now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
