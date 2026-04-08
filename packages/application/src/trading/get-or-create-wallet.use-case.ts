import type { IUseCase } from '../base/use-case.js';
import type { IPaperWalletRepository, IUserRepository } from '@braxxis/domain';
import { UserId, WalletId, PaperWallet, InvalidCredentialsError } from '@braxxis/domain';
import type { GetWalletInput, WalletOutput } from '@braxxis/shared';
import { mapWalletToOutput } from './wallet.mapper.js';

export class GetOrCreateWalletUseCase implements IUseCase<GetWalletInput, WalletOutput> {
  constructor(
    private readonly walletRepo: IPaperWalletRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: GetWalletInput): Promise<WalletOutput> {
    const userId = UserId.fromString(input.userId);

    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    let wallet = await this.walletRepo.findByUserId(userId);

    if (!wallet) {
      wallet = PaperWallet.create({
        id: WalletId.generate(),
        userId,
      });
      await this.walletRepo.save(wallet);
    }

    return mapWalletToOutput(wallet);
  }
}
