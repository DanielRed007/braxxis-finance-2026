import { DomainError } from '../../base/domain-error.js';

export class InvalidPhoneError extends DomainError {
  constructor(phone: string) {
    super(`Invalid phone number: ${phone}`);
  }
}
