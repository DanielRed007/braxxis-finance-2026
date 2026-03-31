import { Profile, UserId } from '@braxxis/domain';
import type { ProfileProps } from '@braxxis/domain';

interface PrismaProfile {
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
  createdAt: Date;
  updatedAt: Date;
}

export class ProfileMapper {
  static toDomain(raw: PrismaProfile): Profile {
    return Profile.reconstitute({
      userId: UserId.fromString(raw.userId),
      firstName: raw.firstName,
      lastName: raw.lastName,
      phone: raw.phone,
      dateOfBirth: raw.dateOfBirth,
      country: raw.country,
      city: raw.city,
      address: raw.address,
      postalCode: raw.postalCode,
      taxId: raw.taxId,
      employmentStatus: raw.employmentStatus,
      employer: raw.employer,
      jobTitle: raw.jobTitle,
      investmentExperience: raw.investmentExperience,
      riskTolerance: raw.riskTolerance,
      annualIncome: raw.annualIncome,
      netWorth: raw.netWorth,
      investmentGoal: raw.investmentGoal,
      sourceOfFunds: raw.sourceOfFunds,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    } as ProfileProps);
  }

  static toPersistence(profile: Profile): {
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
  } {
    return {
      userId: profile.id.value,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      country: profile.country,
      city: profile.city,
      address: profile.address,
      postalCode: profile.postalCode,
      taxId: profile.taxId,
      employmentStatus: profile.employmentStatus,
      employer: profile.employer,
      jobTitle: profile.jobTitle,
      investmentExperience: profile.investmentExperience,
      riskTolerance: profile.riskTolerance,
      annualIncome: profile.annualIncome,
      netWorth: profile.netWorth,
      investmentGoal: profile.investmentGoal,
      sourceOfFunds: profile.sourceOfFunds,
    };
  }
}
