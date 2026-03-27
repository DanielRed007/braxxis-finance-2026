# CLAUDE.md — Project Intelligence

> This file is the source of truth for how this project is built.
> Read it fully before writing any code.

---

## 🧭 Project Overview

**Type**: Fullstack TypeScript Monorepo  
**Stack**: [e.g. Next.js / Fastify / PostgreSQL / Prisma / Redis]  
**Architecture**: Clean Architecture + Domain-Driven Design (DDD)  
**Package Manager**: pnpm  
**Node Version**: 20+

---

## 📁 Folder Structure
```
root/
├── apps/
│   ├── web/          # Frontend (Next.js App Router)
│   └── api/          # Backend (Fastify or Express)
├── packages/
│   ├── domain/       # Entities, Value Objects, Domain Events, Repository interfaces
│   ├── application/  # Use Cases, DTOs, Application Services
│   ├── infrastructure/ # DB, Cache, External APIs (implements domain interfaces)
│   └── shared/       # Shared types, utils, constants, errors
├── CLAUDE.md
├── package.json
└── turbo.json
```

---

## 🏛️ Clean Architecture Rules (STRICT)

This project follows Clean Architecture. **Never violate these dependency rules.**
```
[ Domain ] ← [ Application ] ← [ Infrastructure ]
                                        ↑
                              [ Web / API Controllers ]
```

### Layer Contracts

**`packages/domain/`** — The Core. Zero dependencies on other layers.
- Entities with identity (`id`) and business logic methods
- Value Objects (immutable, equality by value)
- Domain Events (what happened, not how)
- Repository interfaces (`IUserRepository`) — no implementation here
- Domain Errors (`UserNotFoundError extends DomainError`)
- No framework imports. No Prisma. No HTTP. Pure TypeScript.

**`packages/application/`** — Orchestration only.
- One file per Use Case (`CreateUserUseCase.ts`)
- Each Use Case: `execute(input: DTO): Promise<OutputDTO>`
- Depends only on Domain interfaces, never on Infrastructure
- Application Services for cross-aggregate coordination
- No business logic — that belongs in Domain

**`packages/infrastructure/`** — Implements domain interfaces.
- Prisma repositories implementing `IUserRepository`
- External service adapters (Stripe, SendGrid, S3)
- Cache adapters (Redis)
- Dependency injection container setup (use `tsyringe` or `inversify`)

**`apps/api/`** — Thin layer. Route → UseCase → Response.
- Controllers only call Use Cases, never repositories directly
- Request validation (Zod schemas at the edge)
- Error mapping from Domain Errors to HTTP status codes

**`apps/web/`** — Frontend, consumes the API.
- Server Components fetch data; Client Components handle interaction
- No direct DB access from the frontend under any circumstance

---

## 🔷 TypeScript Standards

- `strict: true` always. No `any`. No `@ts-ignore` without a comment explaining why.
- Prefer `interface` for object shapes; `type` for unions, intersections, and aliases.
- Explicit return types on all public functions and class methods.
- No implicit returns from async functions.
- Use `unknown` instead of `any` when the type is truly unknown, then narrow it.
- Use `satisfies` operator to validate types without widening.
- Barrel files (`index.ts`) only at package boundaries, not inside feature folders.
```ts
// ✅ Good
export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserOutputDTO> {
    const user = User.create(input);
    await this.userRepo.save(user);
    return UserMapper.toDTO(user);
  }
}

// ❌ Bad — repository used directly in controller, logic in wrong layer
app.post('/users', async (req, res) => {
  const user = await prisma.user.create({ data: req.body });
  res.json(user);
});
```

---

## 🧩 Domain Modeling Patterns

### Entity
```ts
export class User extends Entity<UserId> {
  private constructor(
    readonly id: UserId,
    private _email: Email,
    private _name: Name,
  ) {
    super(id);
  }

  static create(props: CreateUserProps): User {
    // validate invariants, throw DomainErrors if violated
    return new User(UserId.generate(), Email.create(props.email), Name.create(props.name));
  }

  changeEmail(email: Email): void {
    // business rule enforced here
    this._email = email;
    this.addDomainEvent(new UserEmailChangedEvent(this.id, email));
  }
}
```

### Value Object
```ts
export class Email extends ValueObject<{ value: string }> {
  static create(raw: string): Email {
    if (!raw.includes('@')) throw new InvalidEmailError(raw);
    return new Email({ value: raw.toLowerCase().trim() });
  }

  get value(): string {
    return this.props.value;
  }
}
```

### Repository Interface (Domain layer)
```ts
export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
```

---

## ✅ Code Quality Rules

### General
- Functions do one thing. If you need "and" to describe it, split it.
- Max function length: ~30 lines. Max file length: ~250 lines.
- No magic numbers or strings — use named constants or enums.
- Early returns over nested conditionals.
- Fail fast: validate at boundaries (HTTP edge, use case input), trust data inside the domain.

### Naming
- `PascalCase`: classes, interfaces, types, enums
- `camelCase`: variables, functions, methods
- `SCREAMING_SNAKE_CASE`: constants, env vars
- `kebab-case`: file names (`create-user.use-case.ts`)
- Interfaces prefixed with `I` only for repository/service contracts (`IUserRepository`)
- Use Case files: `[verb]-[noun].use-case.ts`
- Repository files: `prisma-[noun].repository.ts`

### Error Handling
- Domain errors extend `DomainError` (which extends `Error`)
- Application layer catches domain errors and re-throws or maps them
- API layer maps errors to HTTP responses with a central error handler
- Never swallow errors with empty `catch` blocks
- Always `await` async calls — never fire-and-forget unless intentional and documented
```ts
// Central error mapper (apps/api)
function toHttpError(err: unknown): { status: number; message: string } {
  if (err instanceof UserNotFoundError) return { status: 404, message: err.message };
  if (err instanceof ValidationError)   return { status: 400, message: err.message };
  return { status: 500, message: 'Internal server error' };
}
```

### Async / Promises
- Always use `async/await`, never raw `.then()` chains
- Use `Promise.all()` for independent concurrent operations
- Never `await` inside a loop — batch instead

---

## 🧪 Testing Strategy

| Layer          | Type               | Tool              | Target Coverage |
|----------------|--------------------|-------------------|-----------------|
| Domain         | Unit               | Vitest            | 100%            |
| Application    | Unit (mocked deps) | Vitest            | 90%+            |
| Infrastructure | Integration        | Vitest + TestDB   | Key paths       |
| API            | E2E                | Supertest / Vitest| Critical flows  |

### Rules
- Test file lives next to the source file: `user.entity.test.ts`
- No implementation details in tests — test behavior, not internals
- Use factories/builders for test data, never hardcoded objects inline
- Mock at the boundary of the layer under test
- Each test: one assertion of one behavior (AAA: Arrange / Act / Assert)
```ts
// ✅ Good domain test
it('should throw when email is invalid', () => {
  expect(() => Email.create('not-an-email')).toThrow(InvalidEmailError);
});

// ✅ Good use case test (mocked repo)
it('should save user on successful creation', async () => {
  const repo = mock<IUserRepository>();
  const useCase = new CreateUserUseCase(repo);
  await useCase.execute({ email: 'a@b.com', name: 'Alice' });
  expect(repo.save).toHaveBeenCalledOnce();
});
```

---

## 🔐 Security Rules

- Validate and sanitize all external input at the API boundary using Zod
- Never log sensitive data (passwords, tokens, PII)
- Secrets via environment variables only — never hardcoded, never in git
- `zod.parse()` (throws) at API edge; `zod.safeParse()` when you need to handle gracefully
- Use parameterized queries / ORM always — no raw string SQL concatenation
- Auth middleware runs before route handlers; routes declare their auth requirement explicitly

---

## 🌿 Git & PR Conventions

- Branch: `feat/`, `fix/`, `refactor/`, `chore/`, `test/`
- Commits: Conventional Commits (`feat: add user email verification`)
- One logical change per commit
- PRs are small and focused — prefer multiple small PRs over one large one
- No PR merges without passing CI (lint + typecheck + tests)

---

## 🚫 Things Claude Must Never Do

1. Put business logic in controllers, routes, or UI components
2. Import from `infrastructure` inside `domain` or `application`
3. Use `any` type without an explicit justification comment
4. Write raw SQL strings via string concatenation
5. Add `console.log` statements (use the logger service)
6. Introduce a new dependency without adding it to this file's stack section
7. Create files longer than 250 lines without splitting by responsibility
8. Bypass the Use Case layer to call repositories directly from routes
9. Use `Promise` constructor instead of `async/await`
10. Skip error handling on `async` functions

---

## 🛠️ Commands
```bash
pnpm install          # Install all dependencies
pnpm dev              # Start all apps in dev mode (turbo)
pnpm build            # Build all packages and apps
pnpm test             # Run all tests
pnpm lint             # ESLint across the monorepo
pnpm typecheck        # tsc --noEmit across all packages
pnpm db:migrate       # Run Prisma migrations
pnpm db:seed          # Seed the database
```

---

## 📌 When Adding a New Feature

Follow this checklist in order:

1. **Domain** — Define or update Entity, Value Objects, Domain Events, Repository interface
2. **Application** — Write the Use Case with input/output DTOs
3. **Infrastructure** — Implement repository, add Prisma schema if needed
4. **API** — Add route, Zod validation schema, wire Use Case via DI
5. **Web** — Add UI if needed, call API route
6. **Tests** — Unit tests for Domain + Application; integration test for the happy path
7. **Update this file** if new conventions are established
