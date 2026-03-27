import type { User as PrismaUser } from '@prisma/client';
import { User, UserId, Email, HashedPassword } from '@braxxis/domain';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.reconstitute({
      id: UserId.fromString(raw.id),
      email: Email.create(raw.email),
      hashedPassword: HashedPassword.fromHashed(raw.hashedPassword),
      createdAt: raw.createdAt,
    });
  }

  static toPersistence(user: User): {
    id: string;
    email: string;
    hashedPassword: string;
  } {
    return {
      id: user.id.value,
      email: user.email.value,
      hashedPassword: user.hashedPassword.value,
    };
  }
}
