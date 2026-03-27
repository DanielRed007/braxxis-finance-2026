import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
        <a href="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
          Braxxis Finance
        </a>
        <nav style={{ display: 'inline', marginLeft: '2rem' }}>
          <a href="/auth/sign-in" style={{ marginRight: '1rem' }}>Sign In</a>
          <a href="/auth/sign-up">Sign Up</a>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
