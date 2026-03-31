import type { IUseCase } from '../base/use-case.js';
import type { IProfileRepository } from '@braxxis/domain';
import { UserId, ProfileNotFoundError } from '@braxxis/domain';
import type { GetProfileInput, ProfileOutput } from '@braxxis/shared';

export class GetProfileUseCase implements IUseCase<GetProfileInput, ProfileOutput> {
  constructor(
    private readonly profileRepo: IProfileRepository,
  ) {}

  async execute(input: GetProfileInput): Promise<ProfileOutput> {
    const userId = UserId.fromString(input.userId);
    const profile = await this.profileRepo.findByUserId(userId);

    if (!profile) {
      throw new ProfileNotFoundError(input.userId);
    }

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
