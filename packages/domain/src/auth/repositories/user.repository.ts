import { User } from '../user.entity.js';
import { UserId } from '../user-id.js';
import { Email } from '../value-objects/email.js';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
}
