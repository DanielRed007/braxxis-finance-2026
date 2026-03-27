import type { ReactNode } from 'react';
import { SignUpForm } from '@/components/auth/sign-up-form';

export default function SignUpPage(): ReactNode {
  return (
    <section style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        Create Account
      </h1>
      <SignUpForm />
    </section>
  );
}
