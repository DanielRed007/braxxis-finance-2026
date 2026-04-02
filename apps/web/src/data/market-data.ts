export type MarketCategory = 'indices' | 'stocks' | 'futures' | 'commodities' | 'treasuries' | 'crypto';

export interface MarketColumn {
  key: string;
  label: string;
  align?: 'left' | 'right';
}

export interface MarketRow {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  positive: boolean;
  extra?: string;
}

export interface MarketTab {
  id: MarketCategory;
  label: string;
  columns: MarketColumn[];
  rows: MarketRow[];
}

const BASE_COLUMNS: MarketColumn[] = [
  { key: 'symbol', label: 'Symbol' },
  { key: 'price', label: 'Last', align: 'right' },
  { key: 'change', label: 'Change', align: 'right' },
  { key: 'changePercent', label: '% Change', align: 'right' },
];

export const MARKET_TABS: MarketTab[] = [
  {
    id: 'indices',
    label: 'Indices',
    columns: [...BASE_COLUMNS, { key: 'extra', label: 'Volume', align: 'right' }],
    rows: [
      { symbol: 'SPX', name: 'S&P 500', price: '5,248.49', change: '+31.26', changePercent: '+0.60%', positive: true, extra: '2.1B' },
      { symbol: 'DJI', name: 'Dow Jones', price: '39,807.37', change: '+47.29', changePercent: '+0.12%', positive: true, extra: '342M' },
      { symbol: 'IXIC', name: 'NASDAQ', price: '16,379.46', change: '-20.06', changePercent: '-0.12%', positive: false, extra: '4.8B' },
      { symbol: 'RUT', name: 'Russell 2000', price: '2,072.60', change: '+14.33', changePercent: '+0.70%', positive: true, extra: '1.4B' },
      { symbol: 'FTSE', name: 'FTSE 100', price: '7,952.62', change: '-8.14', changePercent: '-0.10%', positive: false, extra: '812M' },
      { symbol: 'DAX', name: 'DAX 40', price: '18,477.09', change: '+92.31', changePercent: '+0.50%', positive: true, extra: '95M' },
    ],
  },
  {
    id: 'stocks',
    label: 'Stocks',
    columns: [...BASE_COLUMNS, { key: 'extra', label: 'Mkt Cap', align: 'right' }],
    rows: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: '198.45', change: '+2.41', changePercent: '+1.23%', positive: true, extra: '3.05T' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '892.30', change: '+29.87', changePercent: '+3.47%', positive: true, extra: '2.20T' },
      { symbol: 'MSFT', name: 'Microsoft', price: '422.86', change: '-1.32', changePercent: '-0.31%', positive: false, extra: '3.14T' },
      { symbol: 'AMZN', name: 'Amazon.com', price: '186.13', change: '+3.52', changePercent: '+1.93%', positive: true, extra: '1.94T' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: '175.22', change: '-4.68', changePercent: '-2.60%', positive: false, extra: '558B' },
      { symbol: 'GOOG', name: 'Alphabet Inc.', price: '155.72', change: '+0.89', changePercent: '+0.57%', positive: true, extra: '1.93T' },
    ],
  },
  {
    id: 'futures',
    label: 'Futures',
    columns: [...BASE_COLUMNS, { key: 'extra', label: 'Expiry', align: 'right' }],
    rows: [
      { symbol: 'ES', name: 'E-mini S&P 500', price: '5,256.25', change: '+18.50', changePercent: '+0.35%', positive: true, extra: 'Jun 2026' },
      { symbol: 'NQ', name: 'E-mini NASDAQ', price: '18,340.00', change: '-45.75', changePercent: '-0.25%', positive: false, extra: 'Jun 2026' },
      { symbol: 'YM', name: 'E-mini Dow', price: '39,850.00', change: '+112.00', changePercent: '+0.28%', positive: true, extra: 'Jun 2026' },
      { symbol: 'RTY', name: 'E-mini Russell', price: '2,078.30', change: '+9.20', changePercent: '+0.44%', positive: true, extra: 'Jun 2026' },
      { symbol: 'VX', name: 'VIX Futures', price: '14.85', change: '-0.35', changePercent: '-2.30%', positive: false, extra: 'May 2026' },
    ],
  },
  {
    id: 'commodities',
    label: 'Commodities',
    columns: [...BASE_COLUMNS, { key: 'extra', label: 'Unit', align: 'right' }],
    rows: [
      { symbol: 'GC', name: 'Gold', price: '2,342.60', change: '+18.40', changePercent: '+0.79%', positive: true, extra: '/oz' },
      { symbol: 'SI', name: 'Silver', price: '27.85', change: '+0.42', changePercent: '+1.53%', positive: true, extra: '/oz' },
      { symbol: 'CL', name: 'Crude Oil WTI', price: '78.26', change: '-1.14', changePercent: '-1.44%', positive: false, extra: '/bbl' },
      { symbol: 'NG', name: 'Natural Gas', price: '1.782', change: '+0.034', changePercent: '+1.94%', positive: true, extra: '/MMBtu' },
      { symbol: 'HG', name: 'Copper', price: '4.152', change: '-0.028', changePercent: '-0.67%', positive: false, extra: '/lb' },
      { symbol: 'ZW', name: 'Wheat', price: '5.64', change: '+0.08', changePercent: '+1.44%', positive: true, extra: '/bu' },
    ],
  },
  {
    id: 'treasuries',
    label: 'Treasuries',
    columns: [
      { key: 'symbol', label: 'Symbol' },
      { key: 'price', label: 'Yield', align: 'right' },
      { key: 'change', label: 'Change', align: 'right' },
      { key: 'changePercent', label: '% Change', align: 'right' },
      { key: 'extra', label: 'Maturity', align: 'right' },
    ],
    rows: [
      { symbol: 'US1M', name: '1-Month T-Bill', price: '5.37%', change: '+0.01', changePercent: '+0.19%', positive: true, extra: '1 Month' },
      { symbol: 'US3M', name: '3-Month T-Bill', price: '5.35%', change: '-0.02', changePercent: '-0.37%', positive: false, extra: '3 Months' },
      { symbol: 'US2Y', name: '2-Year Note', price: '4.72%', change: '+0.04', changePercent: '+0.85%', positive: true, extra: '2 Years' },
      { symbol: 'US10Y', name: '10-Year Note', price: '4.25%', change: '-0.03', changePercent: '-0.70%', positive: false, extra: '10 Years' },
      { symbol: 'US30Y', name: '30-Year Bond', price: '4.38%', change: '+0.02', changePercent: '+0.46%', positive: true, extra: '30 Years' },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    columns: [...BASE_COLUMNS, { key: 'extra', label: '24h Vol', align: 'right' }],
    rows: [
      { symbol: 'BTC', name: 'Bitcoin', price: '67,241.00', change: '-552.30', changePercent: '-0.82%', positive: false, extra: '$28.4B' },
      { symbol: 'ETH', name: 'Ethereum', price: '3,521.80', change: '+74.20', changePercent: '+2.15%', positive: true, extra: '$14.7B' },
      { symbol: 'SOL', name: 'Solana', price: '142.65', change: '+6.82', changePercent: '+5.02%', positive: true, extra: '$3.2B' },
      { symbol: 'BNB', name: 'BNB', price: '598.40', change: '-3.10', changePercent: '-0.52%', positive: false, extra: '$1.8B' },
      { symbol: 'XRP', name: 'Ripple', price: '0.5124', change: '+0.0087', changePercent: '+1.73%', positive: true, extra: '$1.1B' },
      { symbol: 'ADA', name: 'Cardano', price: '0.4518', change: '+0.0142', changePercent: '+3.25%', positive: true, extra: '$482M' },
    ],
  },
];
