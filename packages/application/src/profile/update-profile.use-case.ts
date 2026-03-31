import type { IUseCase } from '../base/use-case.js';
import type { IProfileRepository, IUserRepository } from '@braxxis/domain';
import { Profile, Phone, DateOfBirth, UserId, InvalidCredentialsError } from '@braxxis/domain';
import type { UpdateProfileInput, ProfileOutput } from '@braxxis/shared';
import type { CreateProfileProps } from '@braxxis/domain';

export class UpdateProfileUseCase implements IUseCase<UpdateProfileInput, ProfileOutput> {
  constructor(
    private readonly profileRepo: IProfileRepository,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(input: UpdateProfileInput): Promise<ProfileOutput> {
    const userId = UserId.fromString(input.userId);

    // Verify user exists
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Validate value objects if provided
    if (input.data.phone) {
      Phone.create(input.data.phone);
    }
    if (input.data.dateOfBirth) {
      DateOfBirth.create(input.data.dateOfBirth);
    }

    // Find or create profile
    let profile = await this.profileRepo.findByUserId(userId);

    if (profile) {
      profile.update(input.data as Partial<CreateProfileProps>);
    } else {
      profile = Profile.create({
        userId,
        firstName: input.data.firstName,
        lastName: input.data.lastName,
        phone: input.data.phone,
        dateOfBirth: input.data.dateOfBirth,
        country: input.data.country,
        city: input.data.city,
        address: input.data.address,
        postalCode: input.data.postalCode,
        taxId: input.data.taxId,
        employmentStatus: input.data.employmentStatus as CreateProfileProps['employmentStatus'],
        employer: input.data.employer,
        jobTitle: input.data.jobTitle,
        investmentExperience: input.data.investmentExperience as CreateProfileProps['investmentExperience'],
        riskTolerance: input.data.riskTolerance as CreateProfileProps['riskTolerance'],
        annualIncome: input.data.annualIncome as CreateProfileProps['annualIncome'],
        netWorth: input.data.netWorth as CreateProfileProps['netWorth'],
        investmentGoal: input.data.investmentGoal as CreateProfileProps['investmentGoal'],
        sourceOfFunds: input.data.sourceOfFunds,
      });
    }

    await this.profileRepo.save(profile);

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
