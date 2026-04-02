'use client';

import type { ReactNode, ComponentType } from 'react';
import StatsGridWidget from './stats-grid-widget';
import RecentActivityWidget from './recent-activity-widget';
import WatchlistWidget from './watchlist-widget';
import PortfolioAllocationWidget from './portfolio-allocation-widget';
import MarketNewsWidget from './market-news-widget';
import PerformanceChartWidget from './performance-chart-widget';
import QuickTradeWidget from './quick-trade-widget';
import OpenOrdersWidget from './open-orders-widget';

const WIDGET_COMPONENTS: Record<string, ComponentType> = {
  'stats-grid': StatsGridWidget,
  'recent-activity': RecentActivityWidget,
  'watchlist': WatchlistWidget,
  'portfolio-allocation': PortfolioAllocationWidget,
  'market-news': MarketNewsWidget,
  'performance-chart': PerformanceChartWidget,
  'quick-trade': QuickTradeWidget,
  'open-orders': OpenOrdersWidget,
};

export function WidgetRenderer({ id }: { id: string }): ReactNode {
  const Component = WIDGET_COMPONENTS[id];
  if (!Component) return null;
  return <Component />;
}
