'use client';

import { type ReactNode, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { useWidgetStore } from '@/stores/widget.store';
import { WIDGET_MAP } from '@/config/widget-registry';
import { GradientText } from '@/components/ui/gradient-text';
import { WidgetRenderer } from '@/components/dashboard/widgets/widget-renderer';
import { WidgetPickerModal } from '@/components/dashboard/widget-picker-modal';

const COL_SPAN: Record<number, string> = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  5: 'lg:col-span-5',
};

export default function DashboardPage(): ReactNode {
  const user = useAuthStore((s) => s.user);
  const enabledWidgets = useWidgetStore((s) => s.enabledWidgets);
  const [showPicker, setShowPicker] = useState(false);

  const fullWidgets = enabledWidgets.filter((id) => WIDGET_MAP[id]?.cols === 0);
  const gridWidgets = enabledWidgets.filter((id) => WIDGET_MAP[id]?.cols > 0);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <GradientText>Dashboard</GradientText>
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Welcome back, {user?.email?.split('@')[0] ?? 'investor'}. Here&apos;s your portfolio overview.
          </p>
        </div>
        <button
          onClick={() => setShowPicker(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shrink-0 transition-all duration-200 hover:brightness-90"
          style={{
            background: 'var(--color-input-bg)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border-card)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Widgets
        </button>
      </div>

      {/* Full-width widgets (stats-grid) */}
      {fullWidgets.map((id) => (
        <div key={id} className="mb-8">
          <WidgetRenderer id={id} />
        </div>
      ))}

      {/* Grid widgets */}
      {gridWidgets.length > 0 && (
        <div className="grid lg:grid-cols-5 gap-4">
          {gridWidgets.map((id) => {
            const widget = WIDGET_MAP[id];
            if (!widget) return null;
            return (
              <div key={id} className={COL_SPAN[widget.cols] ?? 'lg:col-span-5'}>
                <WidgetRenderer id={id} />
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {enabledWidgets.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-card)',
          }}
        >
          <div className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            No widgets enabled
          </div>
          <button
            onClick={() => setShowPicker(true)}
            className="text-sm font-medium"
            style={{ color: '#a855f7' }}
          >
            Add widgets to your dashboard
          </button>
        </div>
      )}

      <WidgetPickerModal open={showPicker} onClose={() => setShowPicker(false)} />
    </div>
  );
}
