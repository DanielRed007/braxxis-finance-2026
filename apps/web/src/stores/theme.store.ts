'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark',

        setTheme: (theme: Theme): void => {
          set({ theme });
        },

        toggleTheme: (): void => {
          set({ theme: get().theme === 'dark' ? 'light' : 'dark' });
        },
      }),
      {
        name: 'braxxis-theme',
        partialize: (state) => ({ theme: state.theme }),
      },
    ),
    { name: 'ThemeStore' },
  ),
);
