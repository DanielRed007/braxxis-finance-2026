import type { IUseCase } from '../base/use-case.js';
import type { IPaperWalletRepository } from '@braxxis/domain';
import { UserId, AssetSymbol, Quantity, Money, WalletNotFoundError } from '@braxxis/domain';
import type { ExecuteSpotOrderInput, ExecuteSpotOrderOutput } from '@braxxis/shared';
import { mapWalletToOutput, mapOrderToOutput } from './wallet.mapper.js';

export class ExecuteSpotOrderUseCase implements IUseCase<ExecuteSpotOrderInput, ExecuteSpotOrderOutput> {
  constructor(
    private readonly walletRepo: IPaperWalletRepository,
  ) {}

  async execute(input: ExecuteSpotOrderInput): Promise<ExecuteSpotOrderOutput> {
    const userId = UserId.fromString(input.userId);
    const wallet = await this.walletRepo.findByUserId(userId);

    if (!wallet) {
      throw new WalletNotFoundError();
    }

    const symbol = AssetSymbol.create(input.symbol);
    const quantity = Quantity.create(input.quantity);
    const price = Money.create(input.price);

    const order = input.side === 'buy'
      ? wallet.executeBuy(symbol, quantity, price)
      : wallet.executeSell(symbol, quantity, price);

    await this.walletRepo.save(wallet);
    await this.walletRepo.saveOrder(order);

    return {
      order: mapOrderToOutput(order),
      wallet: mapWalletToOutput(wallet),
    };
  }
}
