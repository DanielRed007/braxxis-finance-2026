import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignUpUseCase } from './sign-up.use-case.js';
import {
  Email,
  HashedPassword,
  User,
  UserId,
  UserAlreadyExistsError,
  InvalidEmailError,
  WeakPasswordError,
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

describe('SignUpUseCase', () => {
  let mocks: ReturnType<typeof createMocks>;
  let useCase: SignUpUseCase;

  beforeEach(() => {
    mocks = createMocks();
    useCase = new SignUpUseCase(mocks.userRepo, mocks.hasher, mocks.tokenService);
  });

  it('should sign up a new user and return tokens', async () => {
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'StrongP4ss',
    });

    expect(result.user.email).toBe('test@example.com');
    expect(result.tokens.accessToken).toBe('access-token');
    expect(result.tokens.refreshToken).toBe('refresh-token');
    expect(mocks.userRepo.save).toHaveBeenCalledOnce();
  });

  it('should throw UserAlreadyExistsError if email is taken', async () => {
    const existing = User.create({
      id: UserId.generate(),
      email: Email.create('test@example.com'),
      hashedPassword: HashedPassword.fromHashed('h'),
    });
    vi.mocked(mocks.userRepo.findByEmail).mockResolvedValue(existing);

    await expect(
      useCase.execute({ email: 'test@example.com', password: 'StrongP4ss' }),
    ).rejects.toThrow(UserAlreadyExistsError);
  });

  it('should throw InvalidEmailError for bad email', async () => {
    await expect(
      useCase.execute({ email: 'bad', password: 'StrongP4ss' }),
    ).rejects.toThrow(InvalidEmailError);
  });

  it('should throw WeakPasswordError for weak password', async () => {
    await expect(
      useCase.execute({ email: 'test@example.com', password: 'weak' }),
    ).rejects.toThrow(WeakPasswordError);
  });
});
