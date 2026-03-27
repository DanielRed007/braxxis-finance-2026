import type { FastifyInstance } from 'fastify';
import { signUpSchema, signInSchema, refreshSchema } from '../schemas/auth.schema.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { SignUpUseCase, SignInUseCase, RefreshTokenUseCase, GetCurrentUserUseCase } from '@braxxis/application';
import type { IUserRepository, IPasswordHasher, ITokenService } from '@braxxis/domain';
import { container } from '@braxxis/infrastructure';

function resolveSignUp(): SignUpUseCase {
  return new SignUpUseCase(
    container.resolve<IUserRepository>('IUserRepository'),
    container.resolve<IPasswordHasher>('IPasswordHasher'),
    container.resolve<ITokenService>('ITokenService'),
  );
}

function resolveSignIn(): SignInUseCase {
  return new SignInUseCase(
    container.resolve<IUserRepository>('IUserRepository'),
    container.resolve<IPasswordHasher>('IPasswordHasher'),
    container.resolve<ITokenService>('ITokenService'),
  );
}

function resolveRefresh(): RefreshTokenUseCase {
  return new RefreshTokenUseCase(
    container.resolve<IUserRepository>('IUserRepository'),
    container.resolve<ITokenService>('ITokenService'),
  );
}

function resolveGetCurrentUser(): GetCurrentUserUseCase {
  return new GetCurrentUserUseCase(
    container.resolve<IUserRepository>('IUserRepository'),
  );
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post('/sign-up', {
    schema: {
      description: 'Register a new user',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: { id: { type: 'string' }, email: { type: 'string' } },
            },
            tokens: {
              type: 'object',
              properties: { accessToken: { type: 'string' }, refreshToken: { type: 'string' } },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = signUpSchema.parse(request.body);
      const result = await resolveSignUp().execute(body);
      reply.status(201).send(result);
    },
  });

  app.post('/sign-in', {
    schema: {
      description: 'Authenticate a user',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 1 },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: { id: { type: 'string' }, email: { type: 'string' } },
            },
            tokens: {
              type: 'object',
              properties: { accessToken: { type: 'string' }, refreshToken: { type: 'string' } },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = signInSchema.parse(request.body);
      const result = await resolveSignIn().execute(body);
      reply.status(200).send(result);
    },
  });

  app.post('/refresh', {
    schema: {
      description: 'Refresh access token',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const body = refreshSchema.parse(request.body);
      const result = await resolveRefresh().execute(body);
      reply.status(200).send(result);
    },
  });

  app.get('/me', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get current authenticated user',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const result = await resolveGetCurrentUser().execute({
        userId: request.user!.userId,
      });
      reply.status(200).send(result);
    },
  });
}
