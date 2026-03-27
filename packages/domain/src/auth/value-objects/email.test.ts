import { describe, it, expect } from 'vitest';
import { Email } from './email.js';
import { InvalidEmailError } from '../errors/invalid-email.error.js';

describe('Email', () => {
  it('should create a valid email', () => {
    const email = Email.create('User@Example.COM');
    expect(email.value).toBe('user@example.com');
  });

  it('should trim whitespace', () => {
    const email = Email.create('  test@email.com  ');
    expect(email.value).toBe('test@email.com');
  });

  it('should throw InvalidEmailError for missing @', () => {
    expect(() => Email.create('not-an-email')).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for empty string', () => {
    expect(() => Email.create('')).toThrow(InvalidEmailError);
  });

  it('should throw InvalidEmailError for missing domain', () => {
    expect(() => Email.create('user@')).toThrow(InvalidEmailError);
  });

  it('should support equality by value', () => {
    const a = Email.create('test@example.com');
    const b = Email.create('TEST@EXAMPLE.COM');
    expect(a.equals(b)).toBe(true);
  });
});
