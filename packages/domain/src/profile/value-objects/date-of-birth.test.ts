import { describe, it, expect } from 'vitest';
import { DateOfBirth } from './date-of-birth.js';
import { UnderageInvestorError } from '../errors/underage-investor.error.js';

describe('DateOfBirth', () => {
  it('should create for an adult', () => {
    const dob = DateOfBirth.create('1990-05-15');
    expect(dob.value).toBe('1990-05-15');
  });

  it('should accept exactly 18 years old', () => {
    const now = new Date();
    const eighteenYearsAgo = `${now.getFullYear() - 18}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    expect(() => DateOfBirth.create(eighteenYearsAgo)).not.toThrow();
  });

  it('should throw UnderageInvestorError for minors', () => {
    const now = new Date();
    const tenYearsAgo = `${now.getFullYear() - 10}-01-01`;
    expect(() => DateOfBirth.create(tenYearsAgo)).toThrow(UnderageInvestorError);
  });

  it('should throw for a future date implying under 18', () => {
    const now = new Date();
    const nextYear = `${now.getFullYear() + 1}-01-01`;
    expect(() => DateOfBirth.create(nextYear)).toThrow(UnderageInvestorError);
  });
});
