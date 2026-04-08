// --- Inputs ---

export interface GetWalletInput {
  userId: string;
}

export interface ExecuteSpotOrderInput {
  userId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
}

export interface GetOrderHistoryInput {
  userId: string;
  limit?: number;
}

// --- Outputs ---

export interface HoldingOutput {
  id: string;
  symbol: string;
  quantity: number;
}

export interface WalletOutput {
  id: string;
  userId: string;
  balance: number;
  holdings: HoldingOutput[];
}

export interface SpotOrderOutput {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  executedAt: string;
}

export interface ExecuteSpotOrderOutput {
  order: SpotOrderOutput;
  wallet: WalletOutput;
}

export interface OrderHistoryOutput {
  orders: SpotOrderOutput[];
}
