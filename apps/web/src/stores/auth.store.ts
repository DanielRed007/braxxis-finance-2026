'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthenticatedUser, AuthResponse, AuthTokens } from '@braxxis/shared';
import { apiClient, registerAuthCallbacks } from '@/lib/api-client';

interface AuthState {
  user: AuthenticatedUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setTokens: (tokens: AuthTokens) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        signIn: async (email: string, password: string): Promise<void> => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<AuthResponse>('/auth/sign-in', {
              email,
              password,
            });
            set({
              user: response.user,
              accessToken: response.tokens.accessToken,
              refreshToken: response.tokens.refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (err) {
            set({
              isLoading: false,
              error: err instanceof Error ? err.message : 'Sign in failed',
            });
            throw err;
          }
        },

        signUp: async (email: string, password: string): Promise<void> => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<AuthResponse>('/auth/sign-up', {
              email,
              password,
            });
            set({
              user: response.user,
              accessToken: response.tokens.accessToken,
              refreshToken: response.tokens.refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (err) {
            set({
              isLoading: false,
              error: err instanceof Error ? err.message : 'Sign up failed',
            });
            throw err;
          }
        },

        signOut: (): void => {
          set(initialState);
        },

        setTokens: (tokens: AuthTokens): void => {
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        },

        clearError: (): void => {
          set({ error: null });
        },
      }),
      {
        name: 'braxxis-auth',
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
);

// Wire up API client callbacks
registerAuthCallbacks({
  getTokens: () => ({
    accessToken: useAuthStore.getState().accessToken,
    refreshToken: useAuthStore.getState().refreshToken,
  }),
  onRefreshed: (tokens) => useAuthStore.getState().setTokens(tokens),
  onFailed: () => useAuthStore.getState().signOut(),
});
