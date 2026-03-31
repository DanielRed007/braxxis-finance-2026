import { describe, it, expect } from 'vitest';
import { Profile } from './profile.entity.js';
import { UserId } from '../auth/user-id.js';

describe('Profile', () => {
  const userId = UserId.fromString('user-123');

  it('should create a profile with required fields', () => {
    const profile = Profile.create({
      userId,
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(profile.id.value).toBe('user-123');
    expect(profile.firstName).toBe('John');
    expect(profile.lastName).toBe('Doe');
    expect(profile.phone).toBe('');
    expect(profile.investmentExperience).toBe('');
  });

  it('should create a profile with all optional fields', () => {
    const profile = Profile.create({
      userId,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567890',
      country: 'US',
      riskTolerance: 'aggressive',
      annualIncome: '100k-250k',
    });

    expect(profile.phone).toBe('+1234567890');
    expect(profile.country).toBe('US');
    expect(profile.riskTolerance).toBe('aggressive');
    expect(profile.annualIncome).toBe('100k-250k');
  });

  it('should update fields and set updatedAt', () => {
    const profile = Profile.create({
      userId,
      firstName: 'John',
      lastName: 'Doe',
    });

    const beforeUpdate = profile.updatedAt;

    // Small delay to ensure different timestamp
    profile.update({ firstName: 'Jane', riskTolerance: 'moderate' });

    expect(profile.firstName).toBe('Jane');
    expect(profile.riskTolerance).toBe('moderate');
    expect(profile.lastName).toBe('Doe'); // unchanged
    expect(profile.updatedAt.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
  });

  it('should reconstitute without side effects', () => {
    const now = new Date();
    const profile = Profile.reconstitute({
      userId,
      firstName: 'Alice',
      lastName: 'Wonder',
      phone: '',
      dateOfBirth: '1990-01-01',
      country: 'UK',
      city: 'London',
      address: '221B Baker St',
      postalCode: 'NW1 6XE',
      taxId: '',
      employmentStatus: 'employed',
      employer: 'ACME',
      jobTitle: 'Engineer',
      investmentExperience: 'advanced',
      riskTolerance: 'moderate',
      annualIncome: '100k-250k',
      netWorth: '500k-1m',
      investmentGoal: 'growth',
      sourceOfFunds: 'salary',
      createdAt: now,
      updatedAt: now,
    });

    expect(profile.firstName).toBe('Alice');
    expect(profile.createdAt).toBe(now);
    expect(profile.domainEvents).toHaveLength(0);
  });
});
