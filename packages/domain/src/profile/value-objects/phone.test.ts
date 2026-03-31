import { describe, it, expect } from 'vitest';
import { Phone } from './phone.js';
import { InvalidPhoneError } from '../errors/invalid-phone.error.js';

describe('Phone', () => {
  it('should create a valid phone number', () => {
    const phone = Phone.create('+1 (555) 123-4567');
    expect(phone.value).toBe('+1 (555) 123-4567');
  });

  it('should trim whitespace', () => {
    const phone = Phone.create('  +1234567890  ');
    expect(phone.value).toBe('+1234567890');
  });

  it('should accept international formats', () => {
    expect(() => Phone.create('+44 20 7946 0958')).not.toThrow();
    expect(() => Phone.create('(212) 555-0123')).not.toThrow();
  });

  it('should throw InvalidPhoneError for too short', () => {
    expect(() => Phone.create('123')).toThrow(InvalidPhoneError);
  });

  it('should throw InvalidPhoneError for letters', () => {
    expect(() => Phone.create('abc-defg-hijk')).toThrow(InvalidPhoneError);
  });

  it('should support equality by value', () => {
    const a = Phone.create('+1234567890');
    const b = Phone.create('+1234567890');
    expect(a.equals(b)).toBe(true);
  });
});
