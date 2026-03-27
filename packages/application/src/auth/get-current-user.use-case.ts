import type { IUseCase } from '../base/use-case.js';
import type { IUserRepository } from '@braxxis/domain';
import type { AuthenticatedUser } from '@braxxis/shared';
import { UserId, InvalidCredentialsError } from '@braxxis/domain';

interface GetCurrentUserInput {
  userId: string;
}

export class GetCurrentUserUseCase implements IUseCase<GetCurrentUserInput, AuthenticatedUser> {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: GetCurrentUserInput): Promise<AuthenticatedUser> {
    const user = await this.userRepo.findById(UserId.fromString(input.userId));
    if (!user) {
      throw new InvalidCredentialsError();
    }

    return { id: user.id.value, email: user.email.value };
  }
}
