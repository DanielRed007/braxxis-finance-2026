import bcrypt from 'bcrypt';
import type { IPasswordHasher } from '@braxxis/domain';
import { HashedPassword } from '@braxxis/domain';
import type { Password } from '@braxxis/domain';

const SALT_ROUNDS = 12;

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: Password): Promise<HashedPassword> {
    const hashed = await bcrypt.hash(password.value, SALT_ROUNDS);
    return HashedPassword.fromHashed(hashed);
  }

  async compare(plain: string, hashed: HashedPassword): Promise<boolean> {
    return bcrypt.compare(plain, hashed.value);
  }
}
