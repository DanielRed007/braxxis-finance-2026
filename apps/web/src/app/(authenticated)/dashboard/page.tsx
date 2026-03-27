'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth.store';

export default function DashboardPage(): ReactNode {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Dashboard</h1>
      <div style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Welcome back</h2>
        <p style={{ color: '#666' }}>{user?.email}</p>
        <p style={{ color: '#999', fontSize: '0.875rem', marginTop: '1rem' }}>
          Your dashboard is ready. Start building your portfolio.
        </p>
      </div>
    </div>
  );
}
