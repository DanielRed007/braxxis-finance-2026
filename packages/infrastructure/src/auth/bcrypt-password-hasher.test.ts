import { describe, it, expect } from 'vitest';
import { BcryptPasswordHasher } from './bcrypt-password-hasher.js';
import { Password, HashedPassword } from '@braxxis/domain';

describe('BcryptPasswordHasher', () => {
  const hasher = new BcryptPasswordHasher();

  it('should hash a password and verify it', async () => {
    const password = Password.create('StrongP4ss');
    const hashed = await hasher.hash(password);

    expect(hashed).toBeInstanceOf(HashedPassword);
    expect(hashed.value).not.toBe('StrongP4ss');

    const isValid = await hasher.compare('StrongP4ss', hashed);
    expect(isValid).toBe(true);
  });

  it('should return false for wrong password', async () => {
    const password = Password.create('StrongP4ss');
    const hashed = await hasher.hash(password);

    const isValid = await hasher.compare('WrongP4ss', hashed);
    expect(isValid).toBe(false);
  });
});
