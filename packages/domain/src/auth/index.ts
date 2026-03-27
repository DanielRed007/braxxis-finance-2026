// Errors
export { InvalidEmailError } from './errors/invalid-email.error.js';
export { WeakPasswordError } from './errors/weak-password.error.js';
export { InvalidCredentialsError } from './errors/invalid-credentials.error.js';
export { UserAlreadyExistsError } from './errors/user-already-exists.error.js';

// Value Objects
export { Email } from './value-objects/email.js';
export { Password } from './value-objects/password.js';
export { HashedPassword } from './value-objects/hashed-password.js';

// Identity
export { UserId } from './user-id.js';

// Entity
export { User } from './user.entity.js';

// Events
export { UserCreatedEvent } from './events/user-created.event.js';

// Repository interfaces
export type { IUserRepository } from './repositories/user.repository.js';

// Service interfaces
export type { IPasswordHasher } from './services/password-hasher.js';
export type { ITokenService, TokenPayload } from './services/token-service.js';
