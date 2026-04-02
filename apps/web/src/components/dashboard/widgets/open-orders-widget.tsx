'use client';

import type { ReactNode } from 'react';

const OPEN_ORDERS = [
  { asset: 'AAPL', type: 'Limit Buy', price: '$185.00', quantity: '10 shares', status: 'Pending' },
  { asset: 'BTC', type: 'Stop Loss', price: '$62,000', quantity: '0.25 BTC', status: 'Active' },
  { asset: 'NVDA', type: 'Limit Sell', price: '$950.00', quantity: '5 shares', status: 'Pending' },
];

export default function OpenOrdersWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Open Orders
      </h2>

      {/* Table header */}
      <div
        className="grid grid-cols-5 gap-4 pb-3 mb-3 text-xs font-medium uppercase tracking-widest"
        style={{
          color: 'var(--color-text-muted)',
          borderBottom: '1px solid var(--color-border-card)',
        }}
      >
        <span>Asset</span>
        <span>Type</span>
        <span>Price</span>
        <span>Quantity</span>
        <span className="text-right">Status</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1">
        {OPEN_ORDERS.map((order, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 py-3"
            style={{
              borderBottom: i < OPEN_ORDERS.length - 1
                ? '1px solid var(--color-border-card)'
                : 'none',
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{ background: 'rgba(134, 96, 250, 0.15)', color: '#a855f7' }}
              >
                {order.asset.slice(0, 2)}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {order.asset}
              </span>
            </div>
            <span className="text-sm flex items-center" style={{ color: 'var(--color-text-secondary)' }}>
              {order.type}
            </span>
            <span className="text-sm flex items-center" style={{ color: 'var(--color-text-primary)' }}>
              {order.price}
            </span>
            <span className="text-sm flex items-center" style={{ color: 'var(--color-text-secondary)' }}>
              {order.quantity}
            </span>
            <div className="flex items-center justify-end">
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  background: order.status === 'Active'
                    ? 'rgba(74, 222, 128, 0.15)'
                    : 'rgba(134, 96, 250, 0.15)',
                  color: order.status === 'Active' ? '#4ade80' : '#a855f7',
                }}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
