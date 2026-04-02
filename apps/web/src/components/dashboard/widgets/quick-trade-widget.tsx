'use client';

import { type ReactNode, useState } from 'react';

const ASSETS = ['AAPL', 'NVDA', 'TSLA', 'BTC', 'ETH', 'MSFT'];

export default function QuickTradeWidget(): ReactNode {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');

  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Quick Trade
      </h2>

      {/* Buy / Sell toggle */}
      <div
        className="flex rounded-xl p-1 mb-4"
        style={{ background: 'var(--color-input-bg)' }}
      >
        {(['buy', 'sell'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200"
            style={{
              background: side === s
                ? (s === 'buy' ? '#4ade80' : '#f87171')
                : 'transparent',
              color: side === s ? '#000' : 'var(--color-text-muted)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Asset select */}
      <select
        className="w-full px-4 py-3 rounded-xl text-sm mb-3 outline-none"
        style={{
          background: 'var(--color-input-bg)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-card)',
        }}
        defaultValue=""
      >
        <option value="" disabled>Select asset...</option>
        {ASSETS.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount (USD)"
        className="w-full px-4 py-3 rounded-xl text-sm mb-4 outline-none"
        style={{
          background: 'var(--color-input-bg)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border-card)',
        }}
      />

      {/* Execute button */}
      <button
        disabled
        className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: side === 'buy' ? '#4ade80' : '#f87171', color: '#000' }}
      >
        Execute {side === 'buy' ? 'Buy' : 'Sell'} Order
      </button>
    </div>
  );
}
