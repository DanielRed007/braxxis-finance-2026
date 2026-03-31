import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProfileStore } from './profile.store.js';

describe('ProfileStore', () => {
  beforeEach(() => {
    useProfileStore.getState().resetProfile();
  });

  describe('updateField', () => {
    it('should update a field and mark dirty', () => {
      useProfileStore.getState().updateField('firstName', 'John');

      const state = useProfileStore.getState();
      expect(state.profile.firstName).toBe('John');
      expect(state.isDirty).toBe(true);
    });

    it('should clear the field error on update', () => {
      // Trigger validation to create errors
      useProfileStore.getState().validate();
      expect(useProfileStore.getState().errors.firstName).toBeDefined();

      // Update field should clear its error
      useProfileStore.getState().updateField('firstName', 'John');
      expect(useProfileStore.getState().errors.firstName).toBeUndefined();
    });
  });

  describe('validate', () => {
    it('should return false when required fields are empty', () => {
      const result = useProfileStore.getState().validate();

      expect(result).toBe(false);
      expect(useProfileStore.getState().errors.firstName).toBe('First name is required');
      expect(useProfileStore.getState().errors.lastName).toBe('Last name is required');
    });

    it('should return true when required fields are provided', () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');

      const result = useProfileStore.getState().validate();

      expect(result).toBe(true);
      expect(Object.keys(useProfileStore.getState().errors)).toHaveLength(0);
    });

    it('should reject invalid phone numbers', () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');
      useProfileStore.getState().updateField('phone', 'abc');

      const result = useProfileStore.getState().validate();

      expect(result).toBe(false);
      expect(useProfileStore.getState().errors.phone).toBe('Enter a valid phone number');
    });

    it('should accept valid phone numbers', () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');
      useProfileStore.getState().updateField('phone', '+1 (555) 123-4567');

      const result = useProfileStore.getState().validate();

      expect(result).toBe(true);
    });

    it('should reject underage date of birth', () => {
      const now = new Date();
      const tenYearsAgo = `${now.getFullYear() - 10}-01-01`;

      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');
      useProfileStore.getState().updateField('dateOfBirth', tenYearsAgo);

      const result = useProfileStore.getState().validate();

      expect(result).toBe(false);
      expect(useProfileStore.getState().errors.dateOfBirth).toBe('You must be at least 18 years old');
    });

    it('should reject invalid tax IDs', () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');
      useProfileStore.getState().updateField('taxId', 'ab');

      const result = useProfileStore.getState().validate();

      expect(result).toBe(false);
      expect(useProfileStore.getState().errors.taxId).toBe('Enter a valid tax ID');
    });
  });

  describe('saveProfile', () => {
    it('should not save when validation fails', async () => {
      await useProfileStore.getState().saveProfile();

      expect(useProfileStore.getState().isSaving).toBe(false);
      expect(useProfileStore.getState().lastSaved).toBeNull();
    });

    it('should save and update state on success', async () => {
      vi.useFakeTimers();

      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');

      const savePromise = useProfileStore.getState().saveProfile();

      expect(useProfileStore.getState().isSaving).toBe(true);

      await vi.advanceTimersByTimeAsync(800);
      await savePromise;

      const state = useProfileStore.getState();
      expect(state.isSaving).toBe(false);
      expect(state.isDirty).toBe(false);
      expect(state.lastSaved).toBeTruthy();

      vi.useRealTimers();
    });
  });

  describe('resetProfile', () => {
    it('should reset all state to initial values', () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');

      useProfileStore.getState().resetProfile();

      const state = useProfileStore.getState();
      expect(state.profile.firstName).toBe('');
      expect(state.profile.lastName).toBe('');
      expect(state.isDirty).toBe(false);
      expect(state.errors).toEqual({});
    });
  });
});
