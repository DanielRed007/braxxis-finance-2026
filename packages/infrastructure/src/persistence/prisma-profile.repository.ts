import type { IProfileRepository } from '@braxxis/domain';
import type { UserId } from '@braxxis/domain';
import type { Profile } from '@braxxis/domain';
import { prisma } from './prisma-client.js';
import { ProfileMapper } from './profile.mapper.js';

export class PrismaProfileRepository implements IProfileRepository {
  async findByUserId(userId: UserId): Promise<Profile | null> {
    const record = await prisma.profile.findUnique({
      where: { userId: userId.value },
    });
    if (!record) return null;
    return ProfileMapper.toDomain(record);
  }

  async save(profile: Profile): Promise<void> {
    const data = ProfileMapper.toPersistence(profile);
    await prisma.profile.upsert({
      where: { userId: data.userId },
      create: data,
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        country: data.country,
        city: data.city,
        address: data.address,
        postalCode: data.postalCode,
        taxId: data.taxId,
        employmentStatus: data.employmentStatus,
        employer: data.employer,
        jobTitle: data.jobTitle,
        investmentExperience: data.investmentExperience,
        riskTolerance: data.riskTolerance,
        annualIncome: data.annualIncome,
        netWorth: data.netWorth,
        investmentGoal: data.investmentGoal,
        sourceOfFunds: data.sourceOfFunds,
      },
    });
  }
}
