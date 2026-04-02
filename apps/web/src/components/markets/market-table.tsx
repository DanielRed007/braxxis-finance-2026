'use client';

import type { ReactNode } from 'react';
import type { MarketColumn, MarketRow } from '@/data/market-data';

interface MarketTableProps {
  columns: MarketColumn[];
  rows: MarketRow[];
}

export function MarketTable({ columns, rows }: MarketTableProps): ReactNode {
  const gridTemplate = `minmax(180px, 2fr) repeat(${columns.length - 1}, 1fr)`;

  return (
    <div
      className="rounded-2xl"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <div className="overflow-x-auto">
        <div className="min-w-[640px] p-6">
          {/* Header */}
          <div
            className="grid gap-4 pb-3 mb-1"
            style={{
              gridTemplateColumns: gridTemplate,
              borderBottom: '1px solid var(--color-border-card)',
            }}
          >
            {columns.map((col) => (
              <span
                key={col.key}
                className="text-xs font-medium uppercase tracking-widest"
                style={{
                  color: 'var(--color-text-muted)',
                  textAlign: col.align ?? 'left',
                }}
              >
                {col.label}
              </span>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.symbol}
              className="grid gap-4 py-3 items-center"
              style={{
                gridTemplateColumns: gridTemplate,
                borderBottom: i < rows.length - 1
                  ? '1px solid var(--color-border-card)'
                  : 'none',
              }}
            >
              {/* Symbol + Name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: 'rgba(134, 96, 250, 0.15)',
                    color: '#a855f7',
                  }}
                >
                  {row.symbol.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {row.symbol}
                  </div>
                  <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                    {row.name}
                  </div>
                </div>
              </div>

              {/* Remaining columns mapped dynamically */}
              {columns.slice(1).map((col) => {
                const value = row[col.key as keyof MarketRow] as string | undefined;
                const isChange = col.key === 'change' || col.key === 'changePercent';

                return (
                  <span
                    key={col.key}
                    className="text-sm font-medium"
                    style={{
                      textAlign: col.align ?? 'left',
                      color: isChange
                        ? (row.positive ? '#4ade80' : '#f87171')
                        : 'var(--color-text-primary)',
                    }}
                  >
                    {value ?? '—'}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
