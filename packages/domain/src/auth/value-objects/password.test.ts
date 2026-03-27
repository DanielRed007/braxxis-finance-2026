import { describe, it, expect } from 'vitest';
import { Password } from './password.js';
import { WeakPasswordError } from '../errors/weak-password.error.js';

describe('Password', () => {
  it('should create a valid password', () => {
    const password = Password.create('StrongP4ss');
    expect(password.value).toBe('StrongP4ss');
  });

  it('should throw WeakPasswordError for short password', () => {
    expect(() => Password.create('Aa1')).toThrow(WeakPasswordError);
  });

  it('should throw WeakPasswordError for missing uppercase', () => {
    expect(() => Password.create('lowercase1')).toThrow(WeakPasswordError);
  });

  it('should throw WeakPasswordError for missing lowercase', () => {
    expect(() => Password.create('UPPERCASE1')).toThrow(WeakPasswordError);
  });

  it('should throw WeakPasswordError for missing digit', () => {
    expect(() => Password.create('NoDigitHere')).toThrow(WeakPasswordError);
  });

  it('should accept exactly 8 character valid password', () => {
    const password = Password.create('Abcdefg1');
    expect(password.value).toBe('Abcdefg1');
  });
});
