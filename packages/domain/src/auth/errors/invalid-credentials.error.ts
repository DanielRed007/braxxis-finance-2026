import { DomainError } from '../../base/domain-error.js';

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid email or password');
  }
}
