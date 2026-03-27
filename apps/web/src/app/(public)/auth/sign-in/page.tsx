import type { ReactNode } from 'react';
import { SignInForm } from '@/components/auth/sign-in-form';

export default function SignInPage(): ReactNode {
  return (
    <section style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Sign In
      </h1>
      <SignInForm />
    </section>
  );
}
