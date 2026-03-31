import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UpdateProfileUseCase } from './update-profile.use-case.js';
import type { IProfileRepository, IUserRepository } from '@braxxis/domain';
import { User, UserId, Email, HashedPassword, InvalidCredentialsError, InvalidPhoneError, UnderageInvestorError } from '@braxxis/domain';

function createMocks() {
  const profileRepo: IProfileRepository = {
    findByUserId: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
  const userRepo: IUserRepository = {
    findById: vi.fn().mockResolvedValue(
      User.reconstitute({
        id: UserId.fromString('user-123'),
        email: Email.create('test@example.com'),
        hashedPassword: HashedPassword.fromHashed('hashed'),
        createdAt: new Date(),
      }),
    ),
    findByEmail: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
  return { profileRepo, userRepo };
}

describe('UpdateProfileUseCase', () => {
  let mocks: ReturnType<typeof createMocks>;
  let useCase: UpdateProfileUseCase;

  beforeEach(() => {
    mocks = createMocks();
    useCase = new UpdateProfileUseCase(mocks.profileRepo, mocks.userRepo);
  });

  it('should create a new profile when none exists', async () => {
    const result = await useCase.execute({
      userId: 'user-123',
      data: { firstName: 'John', lastName: 'Doe', country: 'US' },
    });

    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Doe');
    expect(result.country).toBe('US');
    expect(mocks.profileRepo.save).toHaveBeenCalledOnce();
  });

  it('should update an existing profile', async () => {
    const { Profile, UserId: UID } = await import('@braxxis/domain');
    const existing = Profile.create({
      userId: UID.fromString('user-123'),
      firstName: 'John',
      lastName: 'Doe',
    });
    vi.mocked(mocks.profileRepo.findByUserId).mockResolvedValue(existing);

    const result = await useCase.execute({
      userId: 'user-123',
      data: { firstName: 'Jane', lastName: 'Smith' },
    });

    expect(result.firstName).toBe('Jane');
    expect(result.lastName).toBe('Smith');
    expect(mocks.profileRepo.save).toHaveBeenCalledOnce();
  });

  it('should throw InvalidCredentialsError if user not found', async () => {
    vi.mocked(mocks.userRepo.findById).mockResolvedValue(null);

    await expect(
      useCase.execute({
        userId: 'nonexistent',
        data: { firstName: 'John', lastName: 'Doe' },
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidPhoneError for bad phone', async () => {
    await expect(
      useCase.execute({
        userId: 'user-123',
        data: { firstName: 'John', lastName: 'Doe', phone: 'abc' },
      }),
    ).rejects.toThrow(InvalidPhoneError);
  });

  it('should throw UnderageInvestorError for minor', async () => {
    const now = new Date();
    const tenYearsAgo = `${now.getFullYear() - 10}-01-01`;

    await expect(
      useCase.execute({
        userId: 'user-123',
        data: { firstName: 'John', lastName: 'Doe', dateOfBirth: tenYearsAgo },
      }),
    ).rejects.toThrow(UnderageInvestorError);
  });
});
