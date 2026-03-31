// Errors
export { ProfileNotFoundError } from './errors/profile-not-found.error.js';
export { InvalidPhoneError } from './errors/invalid-phone.error.js';
export { UnderageInvestorError } from './errors/underage-investor.error.js';

// Value Objects
export { Phone } from './value-objects/phone.js';
export { DateOfBirth } from './value-objects/date-of-birth.js';

// Entity
export { Profile } from './profile.entity.js';
export type {
  ProfileProps,
  CreateProfileProps,
  EmploymentStatus,
  InvestmentExperience,
  RiskTolerance,
  AnnualIncome,
  NetWorth,
  InvestmentGoal,
} from './profile.entity.js';

// Repository interface
export type { IProfileRepository } from './repositories/profile.repository.js';
