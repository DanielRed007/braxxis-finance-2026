import type { IUserRepository } from '@braxxis/domain';
import type { User, UserId, Email } from '@braxxis/domain';
import { prisma } from './prisma-client.js';
import { UserMapper } from './user.mapper.js';

export class PrismaUserRepository implements IUserRepository {
  async findById(id: UserId): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id: id.value } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { email: email.value } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    await prisma.user.upsert({
      where: { id: data.id },
      create: data,
      update: { email: data.email, hashedPassword: data.hashedPassword },
    });
  }
}
