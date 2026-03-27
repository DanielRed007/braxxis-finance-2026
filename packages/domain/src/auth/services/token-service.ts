import { User } from '../user.entity.js';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface ITokenService {
  generateAccessToken(user: User): string;
  generateRefreshToken(user: User): string;
  verifyAccessToken(token: string): TokenPayload | null;
  verifyRefreshToken(token: string): TokenPayload | null;
}
