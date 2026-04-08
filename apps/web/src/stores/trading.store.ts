'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api-client';
import type { WalletOutput, SpotOrderOutput, ExecuteSpotOrderOutput, OrderHistoryOutput } from '@braxxis/shared';

interface TradingState {
  wallet: WalletOutput | null;
  orderHistory: SpotOrderOutput[];
  isLoadingWallet: boolean;
  isExecutingOrder: boolean;
  error: string | null;
}

interface TradingActions {
  loadWallet: () => Promise<void>;
  executeOrder: (params: {
    symbol: string;
    side: 'buy' | 'sell';
    quantity: number;
    price: number;
  }) => Promise<boolean>;
  loadOrderHistory: (limit?: number) => Promise<void>;
  clearError: () => void;
  getBalance: () => number;
  getHoldingQuantity: (symbol: string) => number;
}

type TradingStore = TradingState & TradingActions;

const initialState: TradingState = {
  wallet: null,
  orderHistory: [],
  isLoadingWallet: false,
  isExecutingOrder: false,
  error: null,
};

export const useTradingStore = create<TradingStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        loadWallet: async (): Promise<void> => {
          set({ isLoadingWallet: true, error: null });
          try {
            const wallet = await apiClient.get<WalletOutput>('/trading/wallet');
            set({ wallet, isLoadingWallet: false });
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load wallet';
            set({ isLoadingWallet: false, error: message });
          }
        },

        executeOrder: async (params): Promise<boolean> => {
          set({ isExecutingOrder: true, error: null });
          try {
            const result = await apiClient.post<ExecuteSpotOrderOutput>(
              '/trading/orders',
              params,
            );
            set((state) => ({
              wallet: result.wallet,
              orderHistory: [result.order, ...state.orderHistory],
              isExecutingOrder: false,
            }));
            return true;
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Order failed';
            set({ isExecutingOrder: false, error: message });
            return false;
          }
        },

        loadOrderHistory: async (limit?: number): Promise<void> => {
          try {
            const result = await apiClient.get<OrderHistoryOutput>(
              `/trading/orders${limit ? `?limit=${limit}` : ''}`,
            );
            set({ orderHistory: result.orders });
          } catch {
            // Silent fail — order history is non-critical
          }
        },

        clearError: (): void => {
          set({ error: null });
        },

        getBalance: (): number => {
          return get().wallet?.balance ?? 0;
        },

        getHoldingQuantity: (symbol: string): number => {
          const holding = get().wallet?.holdings.find((h) => h.symbol === symbol);
          return holding?.quantity ?? 0;
        },
      }),
      {
        name: 'braxxis-trading',
        partialize: (state) => ({ wallet: state.wallet }),
      },
    ),
    { name: 'TradingStore' },
  ),
);
