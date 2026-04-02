'use client';

import type { ReactNode } from 'react';
import type { MarketTab, MarketCategory } from '@/data/market-data';

interface MarketTabsProps {
  tabs: MarketTab[];
  activeTab: MarketCategory;
  onTabChange: (tab: MarketCategory) => void;
}

export function MarketTabs({ tabs, activeTab, onTabChange }: MarketTabsProps): ReactNode {
  return (
    <div
      className="rounded-2xl p-1.5 mb-4 overflow-x-auto"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <div className="flex flex-nowrap gap-1">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200"
              style={{
                background: isActive ? 'rgba(134, 96, 250, 0.12)' : 'transparent',
                color: isActive
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
