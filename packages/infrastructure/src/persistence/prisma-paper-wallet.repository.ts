import type { IPaperWalletRepository } from '@braxxis/domain';
import type { UserId, WalletId, PaperWallet, SpotOrder } from '@braxxis/domain';
import { prisma } from './prisma-client.js';
import { PaperWalletMapper } from './paper-wallet.mapper.js';

export class PrismaPaperWalletRepository implements IPaperWalletRepository {
  async findByUserId(userId: UserId): Promise<PaperWallet | null> {
    const record = await prisma.paperWallet.findUnique({
      where: { userId: userId.value },
      include: { holdings: true },
    });
    if (!record) return null;
    return PaperWalletMapper.walletToDomain(record);
  }

  async save(wallet: PaperWallet): Promise<void> {
    const holdings = wallet.holdings;

    await prisma.$transaction(async (tx) => {
      await tx.paperWallet.upsert({
        where: { id: wallet.id.value },
        create: {
          id: wallet.id.value,
          userId: wallet.userId.value,
          balance: wallet.balance.value,
        },
        update: {
          balance: wallet.balance.value,
        },
      });

      for (const holding of holdings) {
        await tx.holding.upsert({
          where: {
            walletId_symbol: {
              walletId: wallet.id.value,
              symbol: holding.symbol.value,
            },
          },
          create: {
            id: holding.id.value,
            walletId: wallet.id.value,
            symbol: holding.symbol.value,
            quantity: holding.quantity.value,
          },
          update: {
            quantity: holding.quantity.value,
          },
        });
      }
    });
  }

  async saveOrder(order: SpotOrder): Promise<void> {
    await prisma.spotOrder.create({
      data: {
        id: order.id.value,
        walletId: order.walletId.value,
        symbol: order.symbol.value,
        side: order.side,
        quantity: order.quantity.value,
        price: order.price.value,
        total: order.total.value,
        executedAt: order.executedAt,
      },
    });
  }

  async findOrdersByWalletId(walletId: WalletId, limit: number = 50): Promise<SpotOrder[]> {
    const records = await prisma.spotOrder.findMany({
      where: { walletId: walletId.value },
      orderBy: { executedAt: 'desc' },
      take: limit,
    });
    return records.map(PaperWalletMapper.orderToDomain);
  }
}
