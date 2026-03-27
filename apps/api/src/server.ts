import Fastify from 'fastify';
import cors from '@fastify/cors';
import { errorHandler } from './middleware/error-handler.js';
import { healthRoutes } from './routes/health.routes.js';

const PORT = Number(process.env.PORT) || 3001;

async function bootstrap(): Promise<void> {
  const app = Fastify({ logger: true });

  await app.register(cors);

  app.setErrorHandler(errorHandler);

  // Routes
  await app.register(healthRoutes, { prefix: '/api' });

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

bootstrap();
