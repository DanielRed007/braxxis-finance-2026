import type { IUseCase } from '../base/use-case.js';
import type { IUserRepository } from '@braxxis/domain';
import type { ITokenService } from '@braxxis/domain';
import type { AuthTokens } from '@braxxis/shared';
import { UserId, InvalidCredentialsError } from '@braxxis/domain';

interface RefreshTokenInput {
  refreshToken: string;
}

export class RefreshTokenUseCase implements IUseCase<RefreshTokenInput, AuthTokens> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: RefreshTokenInput): Promise<AuthTokens> {
    const payload = this.tokenService.verifyRefreshToken(input.refreshToken);
    if (!payload) {
      throw new InvalidCredentialsError();
    }

    const user = await this.userRepo.findById(UserId.fromString(payload.userId));
    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      accessToken: this.tokenService.generateAccessToken(user),
      refreshToken: this.tokenService.generateRefreshToken(user),
    };
  }
}
