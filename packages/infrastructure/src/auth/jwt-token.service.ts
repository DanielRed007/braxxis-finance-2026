import jwt from 'jsonwebtoken';
import type { ITokenService, TokenPayload } from '@braxxis/domain';
import type { User } from '@braxxis/domain';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '@braxxis/shared';

export class JwtTokenService implements ITokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor() {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set');
    }
    this.accessSecret = accessSecret;
    this.refreshSecret = refreshSecret;
  }

  generateAccessToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id.value,
      email: user.email.value,
    };
    return jwt.sign(payload, this.accessSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });
  }

  generateRefreshToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id.value,
      email: user.email.value,
    };
    return jwt.sign(payload, this.refreshSecret, { expiresIn: REFRESH_TOKEN_EXPIRY });
  }

  verifyAccessToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.accessSecret) as TokenPayload;
      return { userId: decoded.userId, email: decoded.email };
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as TokenPayload;
      return { userId: decoded.userId, email: decoded.email };
    } catch {
      return null;
    }
  }
}
