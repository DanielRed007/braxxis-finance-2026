import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetProfileUseCase } from './get-profile.use-case.js';
import type { IProfileRepository } from '@braxxis/domain';
import { Profile, UserId, ProfileNotFoundError } from '@braxxis/domain';

function createMocks() {
  const profileRepo: IProfileRepository = {
    findByUserId: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
  return { profileRepo };
}

describe('GetProfileUseCase', () => {
  let mocks: ReturnType<typeof createMocks>;
  let useCase: GetProfileUseCase;

  beforeEach(() => {
    mocks = createMocks();
    useCase = new GetProfileUseCase(mocks.profileRepo);
  });

  it('should return the profile when found', async () => {
    const existing = Profile.create({
      userId: UserId.fromString('user-123'),
      firstName: 'John',
      lastName: 'Doe',
      country: 'US',
      riskTolerance: 'moderate',
    });
    vi.mocked(mocks.profileRepo.findByUserId).mockResolvedValue(existing);

    const result = await useCase.execute({ userId: 'user-123' });

    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Doe');
    expect(result.country).toBe('US');
    expect(result.riskTolerance).toBe('moderate');
  });

  it('should throw ProfileNotFoundError when not found', async () => {
    await expect(
      useCase.execute({ userId: 'nonexistent' }),
    ).rejects.toThrow(ProfileNotFoundError);
  });
});
