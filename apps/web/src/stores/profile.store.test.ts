import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn().mockRejectedValue(new Error('Not found')),
    put: vi.fn().mockImplementation((_path: string, body: unknown) =>
      Promise.resolve(body),
    ),
  },
}));

const { apiClient } = await import('@/lib/api-client');
const { useProfileStore } = await import('./profile.store.js');

describe('ProfileStore', () => {
  beforeEach(() => {
    vi.mocked(apiClient.put).mockImplementation((_path: string, body: unknown) =>
      Promise.resolve(body),
    );
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
      useProfileStore.getState().validate();
      expect(useProfileStore.getState().errors.firstName).toBeDefined();

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
    it('should return false when validation fails', async () => {
      const result = await useProfileStore.getState().saveProfile();

      expect(result).toBe(false);
      expect(useProfileStore.getState().isSaving).toBe(false);
      expect(useProfileStore.getState().lastSaved).toBeNull();
    });

    it('should call API and return true on success', async () => {
      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');

      const result = await useProfileStore.getState().saveProfile();

      expect(result).toBe(true);
      expect(apiClient.put).toHaveBeenCalledWith('/profile', expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
      }));
      const state = useProfileStore.getState();
      expect(state.isSaving).toBe(false);
      expect(state.isDirty).toBe(false);
      expect(state.lastSaved).toBeTruthy();
      expect(state.saveError).toBeNull();
    });

    it('should set saveError and return false on API failure', async () => {
      vi.mocked(apiClient.put).mockRejectedValue(new Error('Network error'));

      useProfileStore.getState().updateField('firstName', 'John');
      useProfileStore.getState().updateField('lastName', 'Doe');

      const result = await useProfileStore.getState().saveProfile();

      expect(result).toBe(false);
      const state = useProfileStore.getState();
      expect(state.isSaving).toBe(false);
      expect(state.saveError).toBe('Network error');
    });
  });

  describe('loadProfile', () => {
    it('should populate profile from API', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567890',
      });

      await useProfileStore.getState().loadProfile();

      const state = useProfileStore.getState();
      expect(state.profile.firstName).toBe('Jane');
      expect(state.isDirty).toBe(false);
    });

    it('should keep empty state when API returns error', async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Not found'));

      await useProfileStore.getState().loadProfile();

      expect(useProfileStore.getState().profile.firstName).toBe('');
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
