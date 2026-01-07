'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import { useUser } from '../../context/UserContext';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useUser();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    register({
      name,
      email,
      id: 'USER-' + Math.random().toString(36).substr(2, 9)
    });

    setIsLoading(false);
    router.push('/');
  };

  return (
    <AuthLayout
      title="Join the Network"
      subtitle="Create your digital identity to participate in Xenia 2026."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              className="glass-input pl-11"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              className="glass-input pl-11"
              placeholder="Create a strong password"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              className="glass-input pl-11"
              placeholder="Repeat password"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Initialize Identity
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-200/50 text-center">
        <p className="text-sm text-slate-500">
          Already have an identity?{' '}
          <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
