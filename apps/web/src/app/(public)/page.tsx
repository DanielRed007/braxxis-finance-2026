import type { ReactNode } from 'react';

export default function HomePage(): ReactNode {
  return (
    <section style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Braxxis Finance</h1>
      <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem' }}>
        Your modern investing platform. Track portfolios, analyze markets, and grow your wealth.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a
          href="/auth/sign-up"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
          }}
        >
          Get Started
        </a>
        <a
          href="/auth/sign-in"
          style={{
            padding: '0.75rem 1.5rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Sign In
        </a>
      </div>
    </section>
  );
}
