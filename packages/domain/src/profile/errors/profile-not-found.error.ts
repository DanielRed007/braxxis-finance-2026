import { DomainError } from '../../base/domain-error.js';

export class ProfileNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`Profile not found for user ${userId}`);
  }
}
