'use client';

import { type ReactNode, useState } from 'react';
import type { TradeMode, OrderSide, OrderType, TradableAsset } from '@/data/trade-data';
import { LEVERAGE_OPTIONS } from '@/data/trade-data';

interface OrderFormProps {
  mode: TradeMode;
  asset: TradableAsset;
}

const ORDER_TYPES: { id: OrderType; label: string }[] = [
  { id: 'market', label: 'Market' },
  { id: 'limit', label: 'Limit' },
  { id: 'stop-limit', label: 'Stop-Limit' },
];

const AMOUNT_PRESETS = ['25%', '50%', '75%', '100%'];

export function OrderForm({ mode, asset }: OrderFormProps): ReactNode {
  const [side, setSide] = useState<OrderSide>('buy');
  const [orderType, setOrderType] = useState<OrderType>('limit');
  const [leverage, setLeverage] = useState(10);

  const isBuy = side === 'buy';
  const sideColor = isBuy ? '#4ade80' : '#f87171';
  const sideLabel = mode === 'futures'
    ? (isBuy ? 'Long' : 'Short')
    : (isBuy ? 'Buy' : 'Sell');

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      {/* Asset header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'rgba(134, 96, 250, 0.15)', color: '#a855f7' }}
          >
            {asset.icon}
          </div>
          <div>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {asset.symbol}/USD
            </span>
            <span className="text-xs ml-2" style={{ color: asset.positive ? '#4ade80' : '#f87171' }}>
              {asset.changePercent}
            </span>
          </div>
        </div>
        <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
          ${asset.price}
        </span>
      </div>

      {/* Buy / Sell toggle */}
      <div className="flex rounded-xl p-1 mb-4" style={{ background: 'var(--color-input-bg)' }}>
        {(['buy', 'sell'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200"
            style={{
              background: side === s ? (s === 'buy' ? '#4ade80' : '#f87171') : 'transparent',
              color: side === s ? '#000' : 'var(--color-text-muted)',
            }}
          >
            {mode === 'futures' ? (s === 'buy' ? 'Long' : 'Short') : s}
          </button>
        ))}
      </div>

      {/* Order type tabs */}
      <div className="flex gap-1 mb-4">
        {ORDER_TYPES.map((ot) => (
          <button
            key={ot.id}
            onClick={() => setOrderType(ot.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: orderType === ot.id ? 'rgba(134, 96, 250, 0.12)' : 'transparent',
              color: orderType === ot.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
            }}
          >
            {ot.label}
          </button>
        ))}
      </div>

      {/* Leverage slider (margin + futures only) */}
      {mode !== 'spot' && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Leverage
            </span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(134, 96, 250, 0.15)', color: '#a855f7' }}
            >
              {leverage}x
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={LEVERAGE_OPTIONS.length - 1}
            value={LEVERAGE_OPTIONS.indexOf(leverage)}
            onChange={(e) => setLeverage(LEVERAGE_OPTIONS[Number(e.target.value)])}
            className="w-full accent-purple-500"
          />
          <div className="flex justify-between mt-1">
            {LEVERAGE_OPTIONS.filter((_, i) => i % 2 === 0).map((l) => (
              <button
                key={l}
                onClick={() => setLeverage(l)}
                className="text-[10px] font-medium transition-colors"
                style={{ color: leverage === l ? '#a855f7' : 'var(--color-text-muted)' }}
              >
                {l}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price input (limit / stop-limit) */}
      {orderType !== 'market' && (
        <div className="mb-3">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>
            {orderType === 'stop-limit' ? 'Stop Price' : 'Price'}
          </label>
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--color-border-card)', background: 'var(--color-input-bg)' }}
          >
            <input
              type="text"
              defaultValue={asset.price}
              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
              style={{ color: 'var(--color-text-primary)' }}
            />
            <span className="px-3 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>USD</span>
          </div>
        </div>
      )}

      {orderType === 'stop-limit' && (
        <div className="mb-3">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>
            Limit Price
          </label>
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--color-border-card)', background: 'var(--color-input-bg)' }}
          >
            <input
              type="text"
              defaultValue={asset.price}
              className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
              style={{ color: 'var(--color-text-primary)' }}
            />
            <span className="px-3 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>USD</span>
          </div>
        </div>
      )}

      {/* Amount input */}
      <div className="mb-3">
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>
          Amount
        </label>
        <div
          className="flex items-center rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--color-border-card)', background: 'var(--color-input-bg)' }}
        >
          <input
            type="text"
            placeholder="0.00"
            className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
            style={{ color: 'var(--color-text-primary)' }}
          />
          <span className="px-3 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{asset.symbol}</span>
        </div>
      </div>

      {/* Amount presets */}
      <div className="flex gap-2 mb-4">
        {AMOUNT_PRESETS.map((pct) => (
          <button
            key={pct}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:brightness-90"
            style={{ background: 'var(--color-input-bg)', color: 'var(--color-text-secondary)' }}
          >
            {pct}
          </button>
        ))}
      </div>

      {/* Total */}
      <div className="mb-4">
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--color-text-muted)' }}>
          Total
        </label>
        <div
          className="flex items-center rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--color-border-card)', background: 'var(--color-input-bg)' }}
        >
          <input
            type="text"
            placeholder="0.00"
            className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
            style={{ color: 'var(--color-text-primary)' }}
          />
          <span className="px-3 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>USD</span>
        </div>
      </div>

      {/* Info row (margin/futures) */}
      {mode !== 'spot' && (
        <div
          className="flex justify-between text-xs p-3 rounded-xl mb-4"
          style={{ background: 'var(--color-input-bg)', color: 'var(--color-text-secondary)' }}
        >
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>Est. Liq. Price</span>
            <div className="font-medium mt-0.5" style={{ color: '#f87171' }}>
              ${mode === 'futures' ? '58,420.00' : '61,200.00'}
            </div>
          </div>
          <div className="text-right">
            <span style={{ color: 'var(--color-text-muted)' }}>Margin Req.</span>
            <div className="font-medium mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
              ${mode === 'futures' ? '672.41' : '6,724.10'}
            </div>
          </div>
        </div>
      )}

      {/* Execute button */}
      <button
        disabled
        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: sideColor, color: '#000' }}
      >
        {sideLabel} {asset.symbol}
      </button>

      {/* Available balance */}
      <div className="flex justify-between mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>Available</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>$12,450.00 USD</span>
      </div>
    </div>
  );
}
