import { describe, it, expect, beforeAll } from 'vitest';
import { JwtTokenService } from './jwt-token.service.js';
import { User, UserId, Email, HashedPassword } from '@braxxis/domain';

describe('JwtTokenService', () => {
  let service: JwtTokenService;
  let user: User;

  beforeAll(() => {
    process.env.JWT_ACCESS_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    service = new JwtTokenService();

    user = User.create({
      id: UserId.fromString('user-123'),
      email: Email.create('test@example.com'),
      hashedPassword: HashedPassword.fromHashed('h'),
    });
  });

  it('should generate and verify an access token', () => {
    const token = service.generateAccessToken(user);
    const payload = service.verifyAccessToken(token);

    expect(payload).not.toBeNull();
    expect(payload!.userId).toBe('user-123');
    expect(payload!.email).toBe('test@example.com');
  });

  it('should generate and verify a refresh token', () => {
    const token = service.generateRefreshToken(user);
    const payload = service.verifyRefreshToken(token);

    expect(payload).not.toBeNull();
    expect(payload!.userId).toBe('user-123');
  });

  it('should return null for a tampered access token', () => {
    const token = service.generateAccessToken(user);
    const payload = service.verifyAccessToken(token + 'tampered');
    expect(payload).toBeNull();
  });

  it('should return null when verifying access token as refresh', () => {
    const accessToken = service.generateAccessToken(user);
    const payload = service.verifyRefreshToken(accessToken);
    expect(payload).toBeNull();
  });
});
