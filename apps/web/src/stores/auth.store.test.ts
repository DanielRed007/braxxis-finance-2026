import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from './auth.store';

// Mock the api-client module
vi.mock('@/lib/api-client', () => ({
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
  },
  registerAuthCallbacks: vi.fn(),
}));

import { apiClient } from '@/lib/api-client';

const mockAuthResponse = {
  user: { id: 'user-123', email: 'test@example.com' },
  tokens: { accessToken: 'at', refreshToken: 'rt' },
};

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  it('should start unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should set user and tokens on signIn', async () => {
    vi.mocked(apiClient.post).mockResolvedValue(mockAuthResponse);

    await useAuthStore.getState().signIn('test@example.com', 'password');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('test@example.com');
    expect(state.accessToken).toBe('at');
  });

  it('should set error on signIn failure', async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new Error('Invalid credentials'));

    await expect(
      useAuthStore.getState().signIn('test@example.com', 'wrong'),
    ).rejects.toThrow();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid credentials');
  });

  it('should clear state on signOut', async () => {
    vi.mocked(apiClient.post).mockResolvedValue(mockAuthResponse);
    await useAuthStore.getState().signIn('test@example.com', 'password');

    useAuthStore.getState().signOut();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.accessToken).toBeNull();
  });

  it('should update tokens via setTokens', () => {
    useAuthStore.getState().setTokens({
      accessToken: 'new-at',
      refreshToken: 'new-rt',
    });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('new-at');
    expect(state.refreshToken).toBe('new-rt');
  });
});
