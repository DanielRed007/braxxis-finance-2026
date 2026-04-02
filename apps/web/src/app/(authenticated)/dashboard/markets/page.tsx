'use client';

import { type ReactNode, useState } from 'react';
import { GradientText } from '@/components/ui/gradient-text';
import { MarketTabs } from '@/components/markets/market-tabs';
import { MarketTable } from '@/components/markets/market-table';
import { MARKET_TABS, type MarketCategory } from '@/data/market-data';

export default function MarketsPage(): ReactNode {
  const [activeTab, setActiveTab] = useState<MarketCategory>('indices');
  const currentTab = MARKET_TABS.find((t) => t.id === activeTab) ?? MARKET_TABS[0];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          <GradientText>Markets</GradientText>
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Live market data across indices, equities, futures, and digital assets.
        </p>
      </div>

      {/* Tabs */}
      <MarketTabs tabs={MARKET_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Table */}
      <MarketTable columns={currentTab.columns} rows={currentTab.rows} />
    </div>
  );
}
