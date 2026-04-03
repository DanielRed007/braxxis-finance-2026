'use client';

import { type ReactNode, useState } from 'react';
import { GradientText } from '@/components/ui/gradient-text';
import { AssetSlider } from '@/components/trade/asset-slider';
import { OrderForm } from '@/components/trade/order-form';
import { OrderBook } from '@/components/trade/order-book';
import {
  TRADABLE_ASSETS,
  TRADE_MODES,
  MOCK_ORDER_BOOK_ASKS,
  MOCK_ORDER_BOOK_BIDS,
  MOCK_RECENT_TRADES,
  type TradeMode,
} from '@/data/trade-data';

export default function TradePage(): ReactNode {
  const [mode, setMode] = useState<TradeMode>('spot');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');

  const selectedAsset = TRADABLE_ASSETS.find((a) => a.symbol === selectedSymbol) ?? TRADABLE_ASSETS[0];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <GradientText>Trade</GradientText>
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {TRADE_MODES.find((m) => m.id === mode)?.description}
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div
        className="rounded-2xl p-1.5 mb-6 inline-flex gap-1"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-card)',
        }}
      >
        {TRADE_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: mode === m.id ? 'rgba(134, 96, 250, 0.12)' : 'transparent',
              color: mode === m.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Asset slider */}
      <AssetSlider
        assets={TRADABLE_ASSETS}
        selectedSymbol={selectedSymbol}
        onSelect={setSelectedSymbol}
      />

      {/* Main trading layout */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Order form */}
        <div className="lg:col-span-2">
          <OrderForm mode={mode} asset={selectedAsset} />
        </div>

        {/* Order book */}
        <div className="lg:col-span-3">
          <OrderBook
            asks={MOCK_ORDER_BOOK_ASKS}
            bids={MOCK_ORDER_BOOK_BIDS}
            recentTrades={MOCK_RECENT_TRADES}
            midPrice={selectedAsset.price}
          />
        </div>
      </div>
    </div>
  );
}
