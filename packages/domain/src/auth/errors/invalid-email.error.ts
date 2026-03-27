import { DomainError } from '../../base/domain-error.js';

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`);
  }
}
