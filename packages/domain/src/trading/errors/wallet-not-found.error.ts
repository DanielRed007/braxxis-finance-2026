import { DomainError } from '../../base/domain-error.js';

export class WalletNotFoundError extends DomainError {
  constructor() {
    super('Paper wallet not found');
  }
}
