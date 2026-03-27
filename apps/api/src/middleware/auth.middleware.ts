import type { FastifyReply, FastifyRequest } from 'fastify';
import { JwtTokenService } from '@braxxis/infrastructure';

let tokenService: JwtTokenService | null = null;

function getTokenService(): JwtTokenService {
  if (!tokenService) {
    tokenService = new JwtTokenService();
  }
  return tokenService;
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    reply.status(401).send({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = header.slice(7);
  const payload = getTokenService().verifyAccessToken(token);
  if (!payload) {
    reply.status(401).send({ error: 'Invalid or expired token' });
    return;
  }

  request.user = payload;
}
