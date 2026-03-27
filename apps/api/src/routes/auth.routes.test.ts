import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { errorHandler } from '../middleware/error-handler.js';
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from '@braxxis/domain';

const mockAuthResponse = {
  user: { id: 'user-123', email: 'test@example.com' },
  tokens: { accessToken: 'at', refreshToken: 'rt' },
};

const mockExecute = vi.fn();

// Mock infrastructure container
vi.mock('@braxxis/infrastructure', () => ({
  container: {
    resolve: () => ({ execute: mockExecute }),
  },
  JwtTokenService: vi.fn(),
}));

// Mock use case constructors to return objects with the mock execute
vi.mock('@braxxis/application', () => ({
  SignUpUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
  SignInUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
  RefreshTokenUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
  GetCurrentUserUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
}));

// Import after mocks
const { authRoutes } = await import('./auth.routes.js');

describe('Auth Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    mockExecute.mockReset();
    app = Fastify();
    app.setErrorHandler(errorHandler);
    await app.register(authRoutes, { prefix: '/api/auth' });
    await app.ready();
  });

  describe('POST /api/auth/sign-up', () => {
    it('should return 201 on successful sign-up', async () => {
      mockExecute.mockResolvedValue(mockAuthResponse);

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/sign-up',
        payload: { email: 'test@example.com', password: 'StrongP4ss' },
      });

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.body).tokens.accessToken).toBe('at');
    });

    it('should return 409 for duplicate email', async () => {
      mockExecute.mockRejectedValue(new UserAlreadyExistsError());

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/sign-up',
        payload: { email: 'test@example.com', password: 'StrongP4ss' },
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe('POST /api/auth/sign-in', () => {
    it('should return 200 on successful sign-in', async () => {
      mockExecute.mockResolvedValue(mockAuthResponse);

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/sign-in',
        payload: { email: 'test@example.com', password: 'StrongP4ss' },
      });

      expect(response.statusCode).toBe(200);
    });

    it('should return 401 for wrong credentials', async () => {
      mockExecute.mockRejectedValue(new InvalidCredentialsError());

      const response = await app.inject({
        method: 'POST',
        url: '/api/auth/sign-in',
        payload: { email: 'test@example.com', password: 'WrongP4ss' },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
