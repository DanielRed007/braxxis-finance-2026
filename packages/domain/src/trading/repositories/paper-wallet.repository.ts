import type { UserId } from '../../auth/user-id.js';
import type { PaperWallet } from '../paper-wallet.entity.js';
import type { SpotOrder } from '../spot-order.entity.js';
import type { WalletId } from '../wallet-id.js';

export interface IPaperWalletRepository {
  findByUserId(userId: UserId): Promise<PaperWallet | null>;
  save(wallet: PaperWallet): Promise<void>;
  saveOrder(order: SpotOrder): Promise<void>;
  findOrdersByWalletId(walletId: WalletId, limit?: number): Promise<SpotOrder[]>;
}
