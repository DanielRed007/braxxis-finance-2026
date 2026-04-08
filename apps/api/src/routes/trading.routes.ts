import type { FastifyInstance } from 'fastify';
import { executeSpotOrderSchema, orderHistoryQuerySchema } from '../schemas/trading.schema.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { GetOrCreateWalletUseCase, ExecuteSpotOrderUseCase, GetOrderHistoryUseCase } from '@braxxis/application';
import type { IPaperWalletRepository, IUserRepository } from '@braxxis/domain';
import { container } from '@braxxis/infrastructure';

function resolveGetOrCreateWallet(): GetOrCreateWalletUseCase {
  return new GetOrCreateWalletUseCase(
    container.resolve<IPaperWalletRepository>('IPaperWalletRepository'),
    container.resolve<IUserRepository>('IUserRepository'),
  );
}

function resolveExecuteSpotOrder(): ExecuteSpotOrderUseCase {
  return new ExecuteSpotOrderUseCase(
    container.resolve<IPaperWalletRepository>('IPaperWalletRepository'),
  );
}

function resolveGetOrderHistory(): GetOrderHistoryUseCase {
  return new GetOrderHistoryUseCase(
    container.resolve<IPaperWalletRepository>('IPaperWalletRepository'),
  );
}

export async function tradingRoutes(app: FastifyInstance): Promise<void> {
  app.get('/wallet', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get or create paper trading wallet',
      tags: ['Trading'],
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const result = await resolveGetOrCreateWallet().execute({
        userId: request.user!.userId,
      });
      reply.status(200).send(result);
    },
  });

  app.post('/orders', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Execute a spot order (buy or sell)',
      tags: ['Trading'],
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const body = executeSpotOrderSchema.parse(request.body);
      const result = await resolveExecuteSpotOrder().execute({
        userId: request.user!.userId,
        ...body,
      });
      reply.status(201).send(result);
    },
  });

  app.get('/orders', {
    preHandler: [authMiddleware],
    schema: {
      description: 'Get order history',
      tags: ['Trading'],
      security: [{ bearerAuth: [] }],
    },
    handler: async (request, reply) => {
      const query = orderHistoryQuerySchema.parse(request.query);
      const result = await resolveGetOrderHistory().execute({
        userId: request.user!.userId,
        limit: query.limit,
      });
      reply.status(200).send(result);
    },
  });
}
