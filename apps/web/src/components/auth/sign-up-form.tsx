'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

export function SignUpForm(): ReactNode {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const isLoading = useAuthStore((s) => s.isLoading);
  const storeError = useAuthStore((s) => s.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      router.push('/dashboard');
    } catch {
      // Error is set in the store
    }
  }

  const error = localError || storeError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div
          role="alert"
          className="px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#f87171',
          }}
        >
          {error}
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--color-border-card)',
          }}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--color-border-card)',
          }}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
          Confirm Password
        </span>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--color-border-card)',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{ background: 'var(--color-purple-primary)' }}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Already have an account?{' '}
        <a
          href="/auth/sign-in"
          className="font-medium transition-colors duration-200 hover:text-white"
          style={{ color: 'var(--color-purple-light)' }}
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
