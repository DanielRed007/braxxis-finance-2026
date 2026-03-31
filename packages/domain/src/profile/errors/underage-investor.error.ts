import { DomainError } from '../../base/domain-error.js';

export class UnderageInvestorError extends DomainError {
  constructor() {
    super('Investor must be at least 18 years old');
  }
}
