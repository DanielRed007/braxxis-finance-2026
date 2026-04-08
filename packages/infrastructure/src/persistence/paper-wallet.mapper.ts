import type { Decimal } from '@prisma/client/runtime/library';
import {
  PaperWallet,
  Holding,
  SpotOrder,
  WalletId,
  HoldingId,
  OrderId,
  UserId,
  Money,
  Quantity,
  AssetSymbol,
} from '@braxxis/domain';
import type { OrderSide } from '@braxxis/domain';

interface PrismaHolding {
  id: string;
  walletId: string;
  symbol: string;
  quantity: Decimal;
  createdAt: Date;
  updatedAt: Date;
}

interface PrismaWallet {
  id: string;
  userId: string;
  balance: Decimal;
  createdAt: Date;
  updatedAt: Date;
  holdings: PrismaHolding[];
}

interface PrismaSpotOrder {
  id: string;
  walletId: string;
  symbol: string;
  side: string;
  quantity: Decimal;
  price: Decimal;
  total: Decimal;
  executedAt: Date;
}

export class PaperWalletMapper {
  static walletToDomain(raw: PrismaWallet): PaperWallet {
    const holdings = raw.holdings.map((h) =>
      Holding.reconstitute({
        id: HoldingId.fromString(h.id),
        walletId: WalletId.fromString(h.walletId),
        symbol: AssetSymbol.create(h.symbol),
        quantity: Quantity.create(h.quantity.toNumber()),
      }),
    );

    return PaperWallet.reconstitute({
      id: WalletId.fromString(raw.id),
      userId: UserId.fromString(raw.userId),
      balance: Money.create(raw.balance.toNumber()),
      holdings,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static orderToDomain(raw: PrismaSpotOrder): SpotOrder {
    return SpotOrder.reconstitute({
      id: OrderId.fromString(raw.id),
      walletId: WalletId.fromString(raw.walletId),
      symbol: AssetSymbol.create(raw.symbol),
      side: raw.side as OrderSide,
      quantity: Quantity.create(raw.quantity.toNumber()),
      price: Money.create(raw.price.toNumber()),
      total: Money.create(raw.total.toNumber()),
      executedAt: raw.executedAt,
    });
  }
}
