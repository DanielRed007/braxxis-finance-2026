import type { PaperWallet, SpotOrder } from '@braxxis/domain';
import type { WalletOutput, SpotOrderOutput } from '@braxxis/shared';

export function mapWalletToOutput(wallet: PaperWallet): WalletOutput {
  return {
    id: wallet.id.value,
    userId: wallet.userId.value,
    balance: wallet.balance.value,
    holdings: wallet.holdings.map((h) => ({
      id: h.id.value,
      symbol: h.symbol.value,
      quantity: h.quantity.value,
    })),
  };
}

export function mapOrderToOutput(order: SpotOrder): SpotOrderOutput {
  return {
    id: order.id.value,
    symbol: order.symbol.value,
    side: order.side,
    quantity: order.quantity.value,
    price: order.price.value,
    total: order.total.value,
    executedAt: order.executedAt.toISOString(),
  };
}
