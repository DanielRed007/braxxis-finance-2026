import { DomainError } from '../../base/domain-error.js';

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super('A user with this email already exists');
  }
}
