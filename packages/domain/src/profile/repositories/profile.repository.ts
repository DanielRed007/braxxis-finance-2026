import type { UserId } from '../../auth/user-id.js';
import type { Profile } from '../profile.entity.js';

export interface IProfileRepository {
  findByUserId(userId: UserId): Promise<Profile | null>;
  save(profile: Profile): Promise<void>;
}
