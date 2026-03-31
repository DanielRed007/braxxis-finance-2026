import type { FastifyInstance } from 'fastify';
import { updateProfileSchema } from '../schemas/profile.schema.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { UpdateProfileUseCase, GetProfileUseCase } from '@braxxis/application';
import type { IProfileRepository, IUserRepository } from '@braxxis/domain';
import { container } from '@braxxis/infrastructure';

function resolveUpdateProfile(): UpdateProfileUseCase {
  return new UpdateProfileUseCase(
    container.resolve<IProfileRepository>('IProfileRepository'),
    container.resolve<IUserRepository>('IUserRepository'),
  );
}

function resolveGetProfile(): GetProfileUseCase {
  return new GetProfileUseCase(
    container.resolve<IProfileRepository>('IProfileRepository'),
  );
}

export async function profileRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get the authenticated user profile',
      tags: ['Profile'],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            dateOfBirth: { type: 'string' },
            country: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            postalCode: { type: 'string' },
            taxId: { type: 'string' },
            employmentStatus: { type: 'string' },
            employer: { type: 'string' },
            jobTitle: { type: 'string' },
            investmentExperience: { type: 'string' },
            riskTolerance: { type: 'string' },
            annualIncome: { type: 'string' },
            netWorth: { type: 'string' },
            investmentGoal: { type: 'string' },
            sourceOfFunds: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const result = await resolveGetProfile().execute({
        userId: request.user!.userId,
      });
      reply.status(200).send(result);
    },
  });

  app.put('/', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Update the authenticated user profile',
      tags: ['Profile'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['firstName', 'lastName'],
        properties: {
          firstName: { type: 'string', minLength: 1 },
          lastName: { type: 'string', minLength: 1 },
          phone: { type: 'string' },
          dateOfBirth: { type: 'string' },
          country: { type: 'string' },
          city: { type: 'string' },
          address: { type: 'string' },
          postalCode: { type: 'string' },
          taxId: { type: 'string' },
          employmentStatus: { type: 'string' },
          employer: { type: 'string' },
          jobTitle: { type: 'string' },
          investmentExperience: { type: 'string' },
          riskTolerance: { type: 'string' },
          annualIncome: { type: 'string' },
          netWorth: { type: 'string' },
          investmentGoal: { type: 'string' },
          sourceOfFunds: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            dateOfBirth: { type: 'string' },
            country: { type: 'string' },
            city: { type: 'string' },
            address: { type: 'string' },
            postalCode: { type: 'string' },
            taxId: { type: 'string' },
            employmentStatus: { type: 'string' },
            employer: { type: 'string' },
            jobTitle: { type: 'string' },
            investmentExperience: { type: 'string' },
            riskTolerance: { type: 'string' },
            annualIncome: { type: 'string' },
            netWorth: { type: 'string' },
            investmentGoal: { type: 'string' },
            sourceOfFunds: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = updateProfileSchema.parse(request.body);
      const result = await resolveUpdateProfile().execute({
        userId: request.user!.userId,
        data: body,
      });
      reply.status(200).send(result);
    },
  });
}
