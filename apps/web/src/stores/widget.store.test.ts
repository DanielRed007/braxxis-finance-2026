import { describe, it, expect, beforeEach } from 'vitest';
import { useWidgetStore } from './widget.store.js';
import { DEFAULT_ENABLED_WIDGETS } from '@/config/widget-registry';

describe('WidgetStore', () => {
  beforeEach(() => {
    useWidgetStore.getState().resetToDefaults();
  });

  it('should have correct default enabled widgets', () => {
    const { enabledWidgets } = useWidgetStore.getState();
    expect(enabledWidgets).toEqual(DEFAULT_ENABLED_WIDGETS);
    expect(enabledWidgets).toContain('stats-grid');
    expect(enabledWidgets).toContain('recent-activity');
    expect(enabledWidgets).toContain('watchlist');
    expect(enabledWidgets).not.toContain('market-news');
  });

  describe('toggleWidget', () => {
    it('should enable a disabled widget', () => {
      useWidgetStore.getState().toggleWidget('market-news');
      expect(useWidgetStore.getState().enabledWidgets).toContain('market-news');
    });

    it('should disable an enabled widget', () => {
      useWidgetStore.getState().toggleWidget('watchlist');
      expect(useWidgetStore.getState().enabledWidgets).not.toContain('watchlist');
    });

    it('should be a no-op for unknown widget IDs', () => {
      const before = [...useWidgetStore.getState().enabledWidgets];
      useWidgetStore.getState().toggleWidget('nonexistent-widget');
      expect(useWidgetStore.getState().enabledWidgets).toEqual(before);
    });

    it('should preserve order of existing widgets when adding', () => {
      const before = [...useWidgetStore.getState().enabledWidgets];
      useWidgetStore.getState().toggleWidget('quick-trade');

      const after = useWidgetStore.getState().enabledWidgets;
      expect(after.slice(0, before.length)).toEqual(before);
      expect(after[after.length - 1]).toBe('quick-trade');
    });
  });

  describe('resetToDefaults', () => {
    it('should restore initial set after modifications', () => {
      useWidgetStore.getState().toggleWidget('watchlist');
      useWidgetStore.getState().toggleWidget('market-news');
      useWidgetStore.getState().toggleWidget('quick-trade');

      useWidgetStore.getState().resetToDefaults();
      expect(useWidgetStore.getState().enabledWidgets).toEqual(DEFAULT_ENABLED_WIDGETS);
    });
  });
});
