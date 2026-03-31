import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import { errorHandler } from '../middleware/error-handler.js';
import {
  ProfileNotFoundError,
  InvalidPhoneError,
  UnderageInvestorError,
} from '@braxxis/domain';

const mockProfileOutput = {
  userId: 'user-123',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  dateOfBirth: '1990-01-01',
  country: 'US',
  city: 'New York',
  address: '123 Main St',
  postalCode: '10001',
  taxId: '',
  employmentStatus: 'employed',
  employer: 'ACME',
  jobTitle: 'Engineer',
  investmentExperience: 'intermediate',
  riskTolerance: 'moderate',
  annualIncome: '100k-250k',
  netWorth: '500k-1m',
  investmentGoal: 'growth',
  sourceOfFunds: 'salary',
};

const mockExecute = vi.fn();

vi.mock('@braxxis/infrastructure', () => ({
  container: {
    resolve: () => ({ execute: mockExecute }),
  },
  JwtTokenService: vi.fn().mockImplementation(() => ({
    verifyAccessToken: (token: string) => {
      if (token === 'valid-token') {
        return { userId: 'user-123', email: 'test@example.com' };
      }
      return null;
    },
  })),
}));

vi.mock('@braxxis/application', () => ({
  UpdateProfileUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
  GetProfileUseCase: vi.fn().mockImplementation(() => ({ execute: mockExecute })),
}));

const { profileRoutes } = await import('./profile.routes.js');

describe('Profile Routes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    mockExecute.mockReset();
    app = Fastify();
    app.setErrorHandler(errorHandler);
    await app.register(profileRoutes, { prefix: '/api/profile' });
    await app.ready();
  });

  describe('GET /api/profile', () => {
    it('should return 200 with profile data', async () => {
      mockExecute.mockResolvedValue(mockProfileOutput);

      const response = await app.inject({
        method: 'GET',
        url: '/api/profile',
        headers: { authorization: 'Bearer valid-token' },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).firstName).toBe('John');
    });

    it('should return 404 when profile not found', async () => {
      mockExecute.mockRejectedValue(new ProfileNotFoundError('user-123'));

      const response = await app.inject({
        method: 'GET',
        url: '/api/profile',
        headers: { authorization: 'Bearer valid-token' },
      });

      expect(response.statusCode).toBe(404);
    });

    it('should return 401 without auth token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/profile',
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PUT /api/profile', () => {
    it('should return 200 on successful update', async () => {
      mockExecute.mockResolvedValue(mockProfileOutput);

      const response = await app.inject({
        method: 'PUT',
        url: '/api/profile',
        headers: { authorization: 'Bearer valid-token' },
        payload: { firstName: 'John', lastName: 'Doe', country: 'US' },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).firstName).toBe('John');
    });

    it('should return 400 for invalid phone', async () => {
      mockExecute.mockRejectedValue(new InvalidPhoneError('abc'));

      const response = await app.inject({
        method: 'PUT',
        url: '/api/profile',
        headers: { authorization: 'Bearer valid-token' },
        payload: { firstName: 'John', lastName: 'Doe', phone: 'abc' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('should return 400 for underage investor', async () => {
      mockExecute.mockRejectedValue(new UnderageInvestorError());

      const response = await app.inject({
        method: 'PUT',
        url: '/api/profile',
        headers: { authorization: 'Bearer valid-token' },
        payload: { firstName: 'John', lastName: 'Doe', dateOfBirth: '2020-01-01' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('should return 401 without auth token', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/profile',
        payload: { firstName: 'John', lastName: 'Doe' },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
