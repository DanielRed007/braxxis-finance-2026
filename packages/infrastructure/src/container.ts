import 'reflect-metadata';
import { container } from 'tsyringe';
import type { IUserRepository, IPasswordHasher, ITokenService } from '@braxxis/domain';
import { PrismaUserRepository } from './persistence/prisma-user.repository.js';
import { BcryptPasswordHasher } from './auth/bcrypt-password-hasher.js';
import { JwtTokenService } from './auth/jwt-token.service.js';
import { SignUpUseCase } from '@braxxis/application';
import { SignInUseCase } from '@braxxis/application';
import { RefreshTokenUseCase } from '@braxxis/application';
import { GetCurrentUserUseCase } from '@braxxis/application';

// Repositories
container.register<IUserRepository>('IUserRepository', { useClass: PrismaUserRepository });

// Services
container.register<IPasswordHasher>('IPasswordHasher', { useClass: BcryptPasswordHasher });
container.register<ITokenService>('ITokenService', { useClass: JwtTokenService });

// Use Cases
container.register('SignUpUseCase', { useClass: SignUpUseCase });
container.register('SignInUseCase', { useClass: SignInUseCase });
container.register('RefreshTokenUseCase', { useClass: RefreshTokenUseCase });
container.register('GetCurrentUserUseCase', { useClass: GetCurrentUserUseCase });

export { container };
