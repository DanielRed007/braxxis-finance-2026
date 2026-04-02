export type WidgetCategory = 'overview' | 'market' | 'trading';

export interface WidgetDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  defaultEnabled: boolean;
  cols: number;
  category: WidgetCategory;
}

export const WIDGET_REGISTRY: WidgetDefinition[] = [
  {
    id: 'stats-grid',
    title: 'Portfolio Stats',
    description: 'Key metrics including balance, P&L, positions, and win rate.',
    icon: 'M4 6h16M4 12h16M4 18h16',
    defaultEnabled: true,
    cols: 0,
    category: 'overview',
  },
  {
    id: 'recent-activity',
    title: 'Recent Activity',
    description: 'Latest transactions and trades across your portfolio.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    defaultEnabled: true,
    cols: 3,
    category: 'overview',
  },
  {
    id: 'watchlist',
    title: 'Watchlist',
    description: 'Track your favorite assets and their live prices.',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447 1.286 3.957c.3.921-.755 1.688-1.54 1.118L12 13.011l-3.365 2.205c-.784.57-1.838-.197-1.539-1.118l1.286-3.957L5.014 8.694c-.783-.57-.38-1.81.588-1.81h4.162l1.285-3.957Z',
    defaultEnabled: true,
    cols: 2,
    category: 'market',
  },
  {
    id: 'portfolio-allocation',
    title: 'Portfolio Allocation',
    description: 'Visual breakdown of your asset allocation by category.',
    icon: 'M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6ZM13.5 3.5a7.5 7.5 0 0 1 7.5 7.5h-7.5V3.5Z',
    defaultEnabled: false,
    cols: 2,
    category: 'overview',
  },
  {
    id: 'market-news',
    title: 'Market News',
    description: 'Curated financial news and market-moving headlines.',
    icon: 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25H5.625a2.25 2.25 0 0 1-2.25-2.25V8.625c0-.621.504-1.125 1.125-1.125H6.75',
    defaultEnabled: false,
    cols: 3,
    category: 'market',
  },
  {
    id: 'performance-chart',
    title: 'Performance Chart',
    description: 'Portfolio performance over time with trend visualization.',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
    defaultEnabled: false,
    cols: 3,
    category: 'overview',
  },
  {
    id: 'quick-trade',
    title: 'Quick Trade',
    description: 'Execute trades quickly without leaving the dashboard.',
    icon: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
    defaultEnabled: false,
    cols: 2,
    category: 'trading',
  },
  {
    id: 'open-orders',
    title: 'Open Orders',
    description: 'Pending limit orders and scheduled trades.',
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z',
    defaultEnabled: false,
    cols: 5,
    category: 'trading',
  },
];

export const WIDGET_MAP: Record<string, WidgetDefinition> = Object.fromEntries(
  WIDGET_REGISTRY.map((w) => [w.id, w]),
);

export const CATEGORY_LABELS: Record<WidgetCategory, string> = {
  overview: 'Overview',
  market: 'Market',
  trading: 'Trading',
};

export const DEFAULT_ENABLED_WIDGETS: string[] = WIDGET_REGISTRY
  .filter((w) => w.defaultEnabled)
  .map((w) => w.id);
