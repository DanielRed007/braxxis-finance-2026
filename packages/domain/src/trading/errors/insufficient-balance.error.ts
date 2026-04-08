import { DomainError } from '../../base/domain-error.js';

export class InsufficientBalanceError extends DomainError {
  constructor() {
    super('Insufficient USD balance for this order');
  }
}
