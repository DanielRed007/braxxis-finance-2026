'use client';

import { type ReactNode, useRef } from 'react';
import type { TradableAsset } from '@/data/trade-data';

interface AssetSliderProps {
  assets: TradableAsset[];
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
}

export function AssetSlider({ assets, selectedSymbol, onSelect }: AssetSliderProps): ReactNode {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mb-6">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {assets.map((asset) => {
          const isActive = asset.symbol === selectedSymbol;
          return (
            <button
              key={asset.symbol}
              onClick={() => onSelect(asset.symbol)}
              className="shrink-0 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: isActive
                  ? 'rgba(134, 96, 250, 0.15)'
                  : 'var(--color-surface)',
                border: isActive
                  ? '1px solid rgba(134, 96, 250, 0.4)'
                  : '1px solid var(--color-border-card)',
                minWidth: '140px',
              }}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: isActive
                      ? 'rgba(134, 96, 250, 0.25)'
                      : 'rgba(134, 96, 250, 0.1)',
                    color: '#a855f7',
                  }}
                >
                  {asset.icon}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {asset.symbol}
                </span>
              </div>
              <div className="text-left">
                <div className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  ${asset.price}
                </div>
                <div
                  className="text-[11px] font-medium"
                  style={{ color: asset.positive ? '#4ade80' : '#f87171' }}
                >
                  {asset.changePercent}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
