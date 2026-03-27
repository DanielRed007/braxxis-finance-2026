import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { DomainError } from '@braxxis/domain';

interface HttpErrorResponse {
  status: number;
  message: string;
}

function toHttpError(err: unknown): HttpErrorResponse {
  if (err instanceof DomainError) {
    return { status: 400, message: err.message };
  }
  return { status: 500, message: 'Internal server error' };
}

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
): void {
  const { status, message } = toHttpError(error);
  reply.status(status).send({ error: message });
}
