import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import {
  DomainError,
  InvalidCredentialsError,
  UserAlreadyExistsError,
  InvalidEmailError,
  WeakPasswordError,
  ProfileNotFoundError,
  InvalidPhoneError,
  UnderageInvestorError,
} from '@braxxis/domain';

interface HttpErrorResponse {
  status: number;
  message: string;
}

function toHttpError(err: unknown): HttpErrorResponse {
  if (err instanceof InvalidCredentialsError) {
    return { status: 401, message: err.message };
  }
  if (err instanceof UserAlreadyExistsError) {
    return { status: 409, message: err.message };
  }
  if (err instanceof InvalidEmailError) {
    return { status: 400, message: err.message };
  }
  if (err instanceof WeakPasswordError) {
    return { status: 400, message: err.message };
  }
  if (err instanceof ProfileNotFoundError) {
    return { status: 404, message: err.message };
  }
  if (err instanceof InvalidPhoneError) {
    return { status: 400, message: err.message };
  }
  if (err instanceof UnderageInvestorError) {
    return { status: 400, message: err.message };
  }
  if (err instanceof DomainError) {
    return { status: 400, message: err.message };
  }
  return { status: 500, message: 'Internal server error' };
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  const { status, message } = toHttpError(error);
  request.log.error({ err: error }, 'Request error');
  reply.status(status).send({ error: message });
}
