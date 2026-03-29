'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

export function SignInForm(): ReactNode {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const isLoading = useAuthStore((s) => s.isLoading);
  const storeError = useAuthStore((s) => s.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/dashboard');
    } catch {
      // Error is set in the store
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {storeError && (
        <div
          role="alert"
          className="px-4 py-3 rounded-xl text-sm"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#f87171',
          }}
        >
          {storeError}
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
          className="w-full px-4 py-3 rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-primary)]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
          style={{
            background: 'var(--color-input-bg)',
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
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-primary)]/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-accent/40"
          style={{
            background: 'var(--color-input-bg)',
            border: '1px solid var(--color-border-card)',
          }}
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-semibold text-sm text-[var(--color-text-primary)] transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        style={{ background: 'var(--color-purple-primary)' }}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
        Don&apos;t have an account?{' '}
        <a
          href="/auth/sign-up"
          className="font-medium transition-colors duration-200 hover:text-[var(--color-text-primary)]"
          style={{ color: 'var(--color-purple-light)' }}
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
