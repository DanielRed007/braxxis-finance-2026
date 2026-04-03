export type TradeMode = 'spot' | 'margin' | 'futures';
export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit' | 'stop-limit';

export interface TradableAsset {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  positive: boolean;
  icon: string;
}

export interface OrderBookEntry {
  price: string;
  amount: string;
  total: string;
}

export interface RecentTrade {
  price: string;
  amount: string;
  time: string;
  side: OrderSide;
}

export const TRADE_MODES: { id: TradeMode; label: string; description: string }[] = [
  { id: 'spot', label: 'Spot', description: 'Buy and sell assets at current market price' },
  { id: 'margin', label: 'Margin', description: 'Trade with borrowed funds up to 10x leverage' },
  { id: 'futures', label: 'Futures', description: 'Trade perpetual and dated contracts' },
];

export const TRADABLE_ASSETS: TradableAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: '67,241.00', change: '-552.30', changePercent: '-0.82%', positive: false, icon: 'BT' },
  { symbol: 'ETH', name: 'Ethereum', price: '3,521.80', change: '+74.20', changePercent: '+2.15%', positive: true, icon: 'ET' },
  { symbol: 'SOL', name: 'Solana', price: '142.65', change: '+6.82', changePercent: '+5.02%', positive: true, icon: 'SO' },
  { symbol: 'AAPL', name: 'Apple', price: '198.45', change: '+2.41', changePercent: '+1.23%', positive: true, icon: 'AA' },
  { symbol: 'NVDA', name: 'NVIDIA', price: '892.30', change: '+29.87', changePercent: '+3.47%', positive: true, icon: 'NV' },
  { symbol: 'TSLA', name: 'Tesla', price: '175.22', change: '-4.68', changePercent: '-2.60%', positive: false, icon: 'TS' },
  { symbol: 'MSFT', name: 'Microsoft', price: '422.86', change: '-1.32', changePercent: '-0.31%', positive: false, icon: 'MS' },
  { symbol: 'XRP', name: 'Ripple', price: '0.5124', change: '+0.0087', changePercent: '+1.73%', positive: true, icon: 'XR' },
  { symbol: 'BNB', name: 'BNB', price: '598.40', change: '-3.10', changePercent: '-0.52%', positive: false, icon: 'BN' },
  { symbol: 'ADA', name: 'Cardano', price: '0.4518', change: '+0.0142', changePercent: '+3.25%', positive: true, icon: 'AD' },
];

export const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10, 20, 50, 75, 100, 125];

export const MOCK_ORDER_BOOK_ASKS: OrderBookEntry[] = [
  { price: '67,285.40', amount: '0.452', total: '30,413.00' },
  { price: '67,272.10', amount: '0.831', total: '55,903.15' },
  { price: '67,260.50', amount: '1.204', total: '80,981.64' },
  { price: '67,253.80', amount: '0.328', total: '22,059.25' },
  { price: '67,248.20', amount: '2.115', total: '142,229.94' },
];

export const MOCK_ORDER_BOOK_BIDS: OrderBookEntry[] = [
  { price: '67,241.00', amount: '1.540', total: '103,551.34' },
  { price: '67,235.60', amount: '0.672', total: '45,182.32' },
  { price: '67,228.30', amount: '2.350', total: '157,986.51' },
  { price: '67,220.10', amount: '0.918', total: '61,708.05' },
  { price: '67,211.40', amount: '1.785', total: '119,972.35' },
];

export const MOCK_RECENT_TRADES: RecentTrade[] = [
  { price: '67,241.00', amount: '0.125', time: '12:34:02', side: 'buy' },
  { price: '67,238.50', amount: '0.340', time: '12:33:58', side: 'sell' },
  { price: '67,240.20', amount: '0.082', time: '12:33:55', side: 'buy' },
  { price: '67,235.80', amount: '1.200', time: '12:33:51', side: 'sell' },
  { price: '67,239.60', amount: '0.450', time: '12:33:48', side: 'buy' },
  { price: '67,241.30', amount: '0.210', time: '12:33:44', side: 'buy' },
  { price: '67,236.90', amount: '0.785', time: '12:33:40', side: 'sell' },
  { price: '67,242.10', amount: '0.155', time: '12:33:36', side: 'buy' },
];
