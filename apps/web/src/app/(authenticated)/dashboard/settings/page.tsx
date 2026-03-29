'use client';

import type { ReactNode } from 'react';
import { useThemeStore } from '@/stores/theme.store';
import { GradientText } from '@/components/ui/gradient-text';

const THEMES = [
  { value: 'dark' as const, label: 'Dark', desc: 'Easy on the eyes, perfect for night trading' },
  { value: 'light' as const, label: 'Light', desc: 'Clean and bright for daytime use' },
];

export default function SettingsPage(): ReactNode {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          <GradientText>Settings</GradientText>
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Manage your preferences and account settings.
        </p>
      </div>

      {/* Appearance section */}
      <div
        className="p-6 rounded-2xl mb-4"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-card)',
        }}
      >
        <h2 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
          Appearance
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Choose how Braxxis looks to you.
        </p>

        {/* Theme selector */}
        <div className="flex gap-3">
          {THEMES.map((t) => {
            const isActive = theme === t.value;
            return (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex-1 p-4 rounded-xl text-left transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? 'rgba(134,96,250,0.12)' : 'transparent',
                  border: isActive
                    ? '1px solid var(--color-purple-accent)'
                    : '1px solid var(--color-border-card)',
                }}
              >
                {/* Preview swatch */}
                <div
                  className="w-full h-16 rounded-lg mb-3 flex items-center justify-center"
                  style={{
                    background: t.value === 'dark' ? 'rgb(6 0 16)' : '#f8f6fb',
                    border: '1px solid var(--color-border-card)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <div
                      className="w-6 h-4 rounded"
                      style={{
                        background: t.value === 'dark' ? 'rgb(30 22 48)' : '#ffffff',
                        border: '1px solid',
                        borderColor: t.value === 'dark' ? 'rgba(169,148,184,0.15)' : 'rgba(124,58,237,0.12)',
                      }}
                    />
                    <div
                      className="w-10 h-4 rounded"
                      style={{
                        background: t.value === 'dark' ? 'rgb(30 22 48)' : '#ffffff',
                        border: '1px solid',
                        borderColor: t.value === 'dark' ? 'rgba(169,148,184,0.15)' : 'rgba(124,58,237,0.12)',
                      }}
                    />
                  </div>
                </div>

                <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                  {t.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {t.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Placeholder sections for future settings */}
      <div
        className="p-6 rounded-2xl mb-4"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-card)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Notifications
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Configure alerts for price movements and portfolio updates.
            </p>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(134,96,250,0.12)', color: 'var(--color-purple-light)' }}
          >
            Coming soon
          </span>
        </div>
      </div>

      <div
        className="p-6 rounded-2xl"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-card)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Currency &amp; Region
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Set your preferred display currency and regional format.
            </p>
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(134,96,250,0.12)', color: 'var(--color-purple-light)' }}
          >
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
