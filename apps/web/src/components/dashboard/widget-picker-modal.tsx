'use client';

import type { ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/modal';
import { useWidgetStore } from '@/stores/widget.store';
import {
  WIDGET_REGISTRY,
  CATEGORY_LABELS,
  type WidgetCategory,
  type WidgetDefinition,
} from '@/config/widget-registry';

interface WidgetPickerModalProps {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES: WidgetCategory[] = ['overview', 'market', 'trading'];

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }): ReactNode {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full shrink-0 transition-colors duration-200"
      style={{
        background: enabled ? 'var(--color-purple-primary)' : 'var(--color-input-bg)',
        border: enabled ? 'none' : '1px solid var(--color-border-card)',
      }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
        style={{
          transform: enabled ? 'translateX(22px)' : 'translateX(2px)',
        }}
      />
    </button>
  );
}

function WidgetRow({ widget, enabled, onToggle }: {
  widget: WidgetDefinition;
  enabled: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <div
      className="flex items-center gap-4 py-3 px-3 rounded-xl transition-colors duration-150"
      style={{ background: enabled ? 'rgba(134, 96, 250, 0.06)' : 'transparent' }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: enabled ? 'rgba(134, 96, 250, 0.15)' : 'var(--color-input-bg)',
          color: enabled ? '#a855f7' : 'var(--color-text-muted)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d={widget.icon} />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {widget.title}
        </div>
        <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {widget.description}
        </div>
      </div>

      {/* Toggle */}
      <ToggleSwitch enabled={enabled} onToggle={onToggle} />
    </div>
  );
}

export function WidgetPickerModal({ open, onClose }: WidgetPickerModalProps): ReactNode {
  const enabledWidgets = useWidgetStore((s) => s.enabledWidgets);
  const toggleWidget = useWidgetStore((s) => s.toggleWidget);
  const resetToDefaults = useWidgetStore((s) => s.resetToDefaults);

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <ModalHeader>Customize Dashboard</ModalHeader>
      <ModalBody className="overflow-y-auto max-h-[60vh] -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const widgets = WIDGET_REGISTRY.filter((w) => w.category === cat);
          return (
            <div key={cat} className="mb-5 last:mb-0">
              <div
                className="text-xs font-medium uppercase tracking-widest mb-2 px-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {CATEGORY_LABELS[cat]}
              </div>
              <div className="flex flex-col gap-1">
                {widgets.map((widget) => (
                  <WidgetRow
                    key={widget.id}
                    widget={widget}
                    enabled={enabledWidgets.includes(widget.id)}
                    onToggle={() => toggleWidget(widget.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <button
          onClick={resetToDefaults}
          className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:brightness-90"
          style={{
            color: 'var(--color-text-secondary)',
            background: 'var(--color-input-bg)',
          }}
        >
          Reset to Defaults
        </button>
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-90"
          style={{ background: 'var(--color-purple-primary)' }}
        >
          Done
        </button>
      </ModalFooter>
    </Modal>
  );
}
