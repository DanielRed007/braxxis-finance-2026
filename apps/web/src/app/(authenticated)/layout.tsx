'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function AuthenticatedLayout({ children }: { children: ReactNode }): ReactNode {
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <AuthGuard>
      <div style={{ minHeight: '100vh', display: 'flex' }}>
        <aside style={{ width: '240px', padding: '1rem', borderRight: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Braxxis Finance</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/dashboard">Dashboard</a>
          </nav>
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>{user?.email}</p>
            <button
              onClick={signOut}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'none',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </div>
        </aside>
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
