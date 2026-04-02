'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { DEFAULT_ENABLED_WIDGETS, WIDGET_MAP } from '@/config/widget-registry';

interface WidgetState {
  enabledWidgets: string[];
}

interface WidgetActions {
  toggleWidget: (id: string) => void;
  resetToDefaults: () => void;
}

type WidgetStore = WidgetState & WidgetActions;

export const useWidgetStore = create<WidgetStore>()(
  devtools(
    persist(
      (set, get) => ({
        enabledWidgets: [...DEFAULT_ENABLED_WIDGETS],

        toggleWidget: (id: string): void => {
          if (!WIDGET_MAP[id]) return;

          const current = get().enabledWidgets;
          const exists = current.includes(id);

          set({
            enabledWidgets: exists
              ? current.filter((wid) => wid !== id)
              : [...current, id],
          });
        },

        resetToDefaults: (): void => {
          set({ enabledWidgets: [...DEFAULT_ENABLED_WIDGETS] });
        },
      }),
      {
        name: 'braxxis-widgets',
        partialize: (state) => ({ enabledWidgets: state.enabledWidgets }),
      },
    ),
    { name: 'WidgetStore' },
  ),
);
