export interface ProfileInput {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  taxId?: string;
  employmentStatus?: string;
  employer?: string;
  jobTitle?: string;
  investmentExperience?: string;
  riskTolerance?: string;
  annualIncome?: string;
  netWorth?: string;
  investmentGoal?: string;
  sourceOfFunds?: string;
}

export interface ProfileOutput {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  taxId: string;
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  investmentExperience: string;
  riskTolerance: string;
  annualIncome: string;
  netWorth: string;
  investmentGoal: string;
  sourceOfFunds: string;
}

export interface UpdateProfileInput {
  userId: string;
  data: ProfileInput;
}

export interface GetProfileInput {
  userId: string;
}
