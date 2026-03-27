import type { IUseCase } from '../base/use-case.js';
import type { IUserRepository } from '@braxxis/domain';
import type { IPasswordHasher } from '@braxxis/domain';
import type { ITokenService } from '@braxxis/domain';
import type { SignUpInput, AuthResponse } from '@braxxis/shared';
import { Email, Password, UserId, User, UserAlreadyExistsError } from '@braxxis/domain';

export class SignUpUseCase implements IUseCase<SignUpInput, AuthResponse> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly hasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: SignUpInput): Promise<AuthResponse> {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hasher.hash(password);
    const user = User.create({
      id: UserId.generate(),
      email,
      hashedPassword,
    });

    await this.userRepo.save(user);

    const accessToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);

    return {
      user: { id: user.id.value, email: user.email.value },
      tokens: { accessToken, refreshToken },
    };
  }
}
