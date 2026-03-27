import type { IUseCase } from '../base/use-case.js';
import type { IUserRepository } from '@braxxis/domain';
import type { IPasswordHasher } from '@braxxis/domain';
import type { ITokenService } from '@braxxis/domain';
import type { SignInInput, AuthResponse } from '@braxxis/shared';
import { Email, InvalidCredentialsError } from '@braxxis/domain';

export class SignInUseCase implements IUseCase<SignInInput, AuthResponse> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: SignInInput): Promise<AuthResponse> {
    const email = Email.create(input.email);

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await this.hasher.compare(input.password, user.hashedPassword);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    return {
      user: { id: user.id.value, email: user.email.value },
      tokens: { accessToken, refreshToken },
    };
  }
}
