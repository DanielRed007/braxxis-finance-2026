import type { ReactNode } from 'react';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { GradientText } from '@/components/ui/gradient-text';

export default function SignUpPage(): ReactNode {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      {/* Background gradient blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 500px 400px at 50% 40%, rgba(134,96,250,0.08), transparent)',
            'radial-gradient(ellipse 300px 300px at 70% 60%, rgba(168,85,247,0.05), transparent)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                fill="#8660fa"
                opacity="0.3"
              />
              <path
                d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                stroke="#8660fa"
                strokeWidth="1.5"
                fill="none"
              />
              <path d="M9 12l2 2 4-4" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white font-bold">Braxxis</span>
          </a>
        </div>

        {/* Card */}
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'var(--color-surface)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border-card)',
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">
              <GradientText>Start investing</GradientText>
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Create your free account
            </p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
