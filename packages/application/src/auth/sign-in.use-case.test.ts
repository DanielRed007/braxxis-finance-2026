import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignInUseCase } from './sign-in.use-case.js';
import {
  Email,
  HashedPassword,
  User,
  UserId,
  InvalidCredentialsError,
} from '@braxxis/domain';
import type { IUserRepository, IPasswordHasher, ITokenService } from '@braxxis/domain';

function createMocks() {
  const userRepo: IUserRepository = {
    findById: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
  const hasher: IPasswordHasher = {
    hash: vi.fn().mockResolvedValue(HashedPassword.fromHashed('hashed')),
    compare: vi.fn().mockResolvedValue(true),
  };
  const tokenService: ITokenService = {
    generateAccessToken: vi.fn().mockReturnValue('access-token'),
    generateRefreshToken: vi.fn().mockReturnValue('refresh-token'),
    verifyAccessToken: vi.fn().mockReturnValue(null),
    verifyRefreshToken: vi.fn().mockReturnValue(null),
  };
  return { userRepo, hasher, tokenService };
}

describe('SignInUseCase', () => {
  let mocks: ReturnType<typeof createMocks>;
  let useCase: SignInUseCase;
  let existingUser: User;

  beforeEach(() => {
    mocks = createMocks();
    useCase = new SignInUseCase(mocks.userRepo, mocks.hasher, mocks.tokenService);
    existingUser = User.create({
      id: UserId.generate(),
      email: Email.create('test@example.com'),
      hashedPassword: HashedPassword.fromHashed('hashed'),
    });
  });

  it('should sign in with valid credentials', async () => {
    vi.mocked(mocks.userRepo.findByEmail).mockResolvedValue(existingUser);

    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'StrongP4ss',
    });

    expect(result.user.email).toBe('test@example.com');
    expect(result.tokens.accessToken).toBe('access-token');
  });

  it('should throw InvalidCredentialsError if user not found', async () => {
    await expect(
      useCase.execute({ email: 'nobody@example.com', password: 'StrongP4ss' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidCredentialsError if password is wrong', async () => {
    vi.mocked(mocks.userRepo.findByEmail).mockResolvedValue(existingUser);
    vi.mocked(mocks.hasher.compare).mockResolvedValue(false);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'WrongP4ss' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
