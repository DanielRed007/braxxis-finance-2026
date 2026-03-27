import { DomainError } from '../../base/domain-error.js';

export class WeakPasswordError extends DomainError {
  constructor() {
    super(
      'Password must be at least 8 characters and include uppercase, lowercase, and a digit',
    );
  }
}
