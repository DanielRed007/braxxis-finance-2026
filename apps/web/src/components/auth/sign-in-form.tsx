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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {storeError && (
        <div role="alert" style={{ padding: '0.75rem', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
          {storeError}
        </div>
      )}
      <label>
        <span style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </label>
      <label>
        <span style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        style={{
          padding: '0.75rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
        Don&apos;t have an account? <a href="/auth/sign-up">Sign up</a>
      </p>
    </form>
  );
}
