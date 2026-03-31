import 'reflect-metadata';
import { container } from 'tsyringe';
import type { IUserRepository, IPasswordHasher, ITokenService, IProfileRepository } from '@braxxis/domain';
import { PrismaUserRepository } from './persistence/prisma-user.repository.js';
import { PrismaProfileRepository } from './persistence/prisma-profile.repository.js';
import { BcryptPasswordHasher } from './auth/bcrypt-password-hasher.js';
import { JwtTokenService } from './auth/jwt-token.service.js';
import { SignUpUseCase, SignInUseCase, RefreshTokenUseCase, GetCurrentUserUseCase } from '@braxxis/application';
import { UpdateProfileUseCase, GetProfileUseCase } from '@braxxis/application';

// Repositories
container.register<IUserRepository>('IUserRepository', { useClass: PrismaUserRepository });
container.register<IProfileRepository>('IProfileRepository', { useClass: PrismaProfileRepository });

// Services
container.register<IPasswordHasher>('IPasswordHasher', { useClass: BcryptPasswordHasher });
container.register<ITokenService>('ITokenService', { useClass: JwtTokenService });

// Use Cases
container.register('SignUpUseCase', { useClass: SignUpUseCase });
container.register('SignInUseCase', { useClass: SignInUseCase });
container.register('RefreshTokenUseCase', { useClass: RefreshTokenUseCase });
container.register('GetCurrentUserUseCase', { useClass: GetCurrentUserUseCase });
container.register('UpdateProfileUseCase', { useClass: UpdateProfileUseCase });
container.register('GetProfileUseCase', { useClass: GetProfileUseCase });

export { container };
