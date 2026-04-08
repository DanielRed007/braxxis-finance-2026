import { DomainError } from '../../base/domain-error.js';

export class InsufficientHoldingsError extends DomainError {
  constructor(symbol: string) {
    super(`Insufficient ${symbol} holdings for this order`);
  }
}
