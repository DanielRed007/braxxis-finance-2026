import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RefreshTokenUseCase } from './refresh-token.use-case.js';
import {
  Email,
  HashedPassword,
  User,
  UserId,
  InvalidCredentialsError,
} from '@braxxis/domain';
import type { IUserRepository, ITokenService } from '@braxxis/domain';

function createMocks() {
  const userRepo: IUserRepository = {
    findById: vi.fn().mockResolvedValue(null),
    findByEmail: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  };
  const tokenService: ITokenService = {
    generateAccessToken: vi.fn().mockReturnValue('new-access'),
    generateRefreshToken: vi.fn().mockReturnValue('new-refresh'),
    verifyAccessToken: vi.fn().mockReturnValue(null),
    verifyRefreshToken: vi.fn().mockReturnValue(null),
  };
  return { userRepo, tokenService };
}

describe('RefreshTokenUseCase', () => {
  let mocks: ReturnType<typeof createMocks>;
  let useCase: RefreshTokenUseCase;

  beforeEach(() => {
    mocks = createMocks();
    useCase = new RefreshTokenUseCase(mocks.userRepo, mocks.tokenService);
  });

  it('should return new tokens for a valid refresh token', async () => {
    const user = User.create({
      id: UserId.fromString('user-123'),
      email: Email.create('test@example.com'),
      hashedPassword: HashedPassword.fromHashed('h'),
    });
    vi.mocked(mocks.tokenService.verifyRefreshToken).mockReturnValue({
      userId: 'user-123',
      email: 'test@example.com',
    });
    vi.mocked(mocks.userRepo.findById).mockResolvedValue(user);

    const result = await useCase.execute({ refreshToken: 'valid-token' });

    expect(result.accessToken).toBe('new-access');
    expect(result.refreshToken).toBe('new-refresh');
  });

  it('should throw InvalidCredentialsError for invalid refresh token', async () => {
    await expect(
      useCase.execute({ refreshToken: 'bad-token' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw InvalidCredentialsError if user no longer exists', async () => {
    vi.mocked(mocks.tokenService.verifyRefreshToken).mockReturnValue({
      userId: 'deleted-user',
      email: 'gone@example.com',
    });

    await expect(
      useCase.execute({ refreshToken: 'valid-token' }),
    ).rejects.toThrow(InvalidCredentialsError);
  });
});
