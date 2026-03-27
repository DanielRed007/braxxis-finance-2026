import { Password } from '../value-objects/password.js';
import { HashedPassword } from '../value-objects/hashed-password.js';

export interface IPasswordHasher {
  hash(password: Password): Promise<HashedPassword>;
  compare(plain: string, hashed: HashedPassword): Promise<boolean>;
}
