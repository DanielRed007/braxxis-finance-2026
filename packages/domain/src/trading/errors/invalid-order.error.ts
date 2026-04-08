import { DomainError } from '../../base/domain-error.js';

export class InvalidOrderError extends DomainError {
  constructor(reason: string) {
    super(`Invalid order: ${reason}`);
  }
}
