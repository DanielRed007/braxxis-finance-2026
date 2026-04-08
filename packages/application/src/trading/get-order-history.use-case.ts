import type { IUseCase } from '../base/use-case.js';
import type { IPaperWalletRepository } from '@braxxis/domain';
import { UserId, WalletNotFoundError } from '@braxxis/domain';
import type { GetOrderHistoryInput, OrderHistoryOutput } from '@braxxis/shared';
import { mapOrderToOutput } from './wallet.mapper.js';

export class GetOrderHistoryUseCase implements IUseCase<GetOrderHistoryInput, OrderHistoryOutput> {
  constructor(
    private readonly walletRepo: IPaperWalletRepository,
  ) {}

  async execute(input: GetOrderHistoryInput): Promise<OrderHistoryOutput> {
    const userId = UserId.fromString(input.userId);
    const wallet = await this.walletRepo.findByUserId(userId);

    if (!wallet) {
      throw new WalletNotFoundError();
    }

    const orders = await this.walletRepo.findOrdersByWalletId(
      wallet.id,
      input.limit ?? 50,
    );

    return {
      orders: orders.map(mapOrderToOutput),
    };
  }
}
