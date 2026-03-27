import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { errorHandler } from './middleware/error-handler.js';
import { healthRoutes } from './routes/health.routes.js';
import { authRoutes } from './routes/auth.routes.js';

// Initialize DI container (side-effect import)
import '@braxxis/infrastructure';

const PORT = Number(process.env.PORT) || 3001;

async function bootstrap(): Promise<void> {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Braxxis Finance API',
        version: '0.1.0',
        description: 'API documentation for Braxxis Finance',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/api/docs',
  });

  app.setErrorHandler(errorHandler);

  // Routes
  await app.register(healthRoutes, { prefix: '/api' });
  await app.register(authRoutes, { prefix: '/api/auth' });

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

bootstrap();
