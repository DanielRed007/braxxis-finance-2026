# Braxxis Finance

A full-stack investment platform built with TypeScript, following Clean Architecture and Domain-Driven Design principles.

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Frontend** | Next.js (App Router) | 15.1 |
| **UI** | React | 19.0 |
| **Styling** | Tailwind CSS | 4.0 |
| **State** | Zustand | 5.0 |
| **Backend** | Fastify | 5.2 |
| **Database** | PostgreSQL + Prisma | 6.2 |
| **Auth** | JWT + bcrypt | — |
| **DI Container** | tsyringe | 4.8 |
| **Validation** | Zod | 3.24 |
| **Testing** | Vitest | 3.0 |
| **Build** | Turborepo | 2.8 |
| **Package Manager** | pnpm | 9.15 |
| **Runtime** | Node.js | 20+ |

## Architecture

The project follows **Clean Architecture** with strict dependency rules — inner layers never depend on outer layers.

```
Domain  <--  Application  <--  Infrastructure
                                     ^
                            Web / API Controllers
```

### Monorepo Structure

```
braxxis-finance-2026/
├── apps/
│   ├── api/                  # Fastify REST API (port 3001)
│   │   ├── src/
│   │   │   ├── middleware/   # Auth middleware, error handler
│   │   │   ├── routes/       # Auth, profile, health endpoints
│   │   │   ├── schemas/      # Zod request validation
│   │   │   └── server.ts     # App entry point
│   │   └── .env.example
│   └── web/                  # Next.js frontend (port 3000)
│       └── src/
│           ├── app/          # App Router pages
│           │   ├── (public)/ # Landing, sign-in, sign-up
│           │   └── (authenticated)/
│           │       └── dashboard/
│           │           ├── markets/
│           │           ├── trade/
│           │           ├── profile/
│           │           └── settings/
│           ├── components/   # UI components
│           ├── stores/       # Zustand stores
│           ├── config/       # Widget registry
│           ├── data/         # Mock data (market, trade)
│           └── lib/          # API client, utilities
├── packages/
│   ├── domain/               # Entities, Value Objects, Domain Events
│   ├── application/          # Use Cases, DTOs
│   ├── infrastructure/       # Prisma repos, bcrypt, JWT, DI container
│   └── shared/               # Cross-layer types and constants
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Features

### Authentication
- Sign up / sign in with email and password
- JWT access + refresh token flow with automatic renewal
- Password strength validation (8+ chars, upper, lower, digit)
- Protected routes via Next.js middleware + client-side auth guard

### Dashboard
- Customizable widget system with persistent preferences
- 8 available widgets: Portfolio Stats, Recent Activity, Watchlist, Portfolio Allocation, Market News, Performance Chart, Quick Trade, Open Orders
- Widget picker modal to toggle widgets on/off
- Dark/light theme switching with flash-free hydration

### Markets
- Tabbed market data display (Indices, Stocks, Futures, Commodities, Treasuries, Crypto)
- Responsive tables with horizontal scroll on mobile
- Mock data structured for easy API replacement

### Trading
- Spot, Margin, and Futures trading modes
- Scrollable asset selector with live price display
- Order types: Market, Limit, Stop-Limit
- Leverage slider (1x-125x) for margin and futures
- Live order book with asks, bids, and recent trades
- Estimated liquidation price and margin requirement display

### Profile
- Full investor profile form (personal info, address, employment, investment profile)
- Client + server validation (phone, date of birth, tax ID)
- Real-time dirty state tracking with save confirmation modal

## Database Schema

```
┌──────────────────┐       ┌──────────────────────────────┐
│      users       │       │          profiles             │
├──────────────────┤       ├──────────────────────────────┤
│ id          (PK) │──1:1──│ user_id              (PK/FK) │
│ email    (unique)│       │ first_name, last_name        │
│ hashed_password  │       │ phone, date_of_birth         │
│ created_at       │       │ country, city, address       │
│ updated_at       │       │ postal_code, tax_id          │
└──────────────────┘       │ employment_status, employer  │
                           │ job_title                    │
                           │ investment_experience        │
                           │ risk_tolerance               │
                           │ annual_income, net_worth     │
                           │ investment_goal              │
                           │ source_of_funds              │
                           │ created_at, updated_at       │
                           └──────────────────────────────┘
```

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | No | Health check |
| `POST` | `/api/auth/sign-up` | No | Create account |
| `POST` | `/api/auth/sign-in` | No | Authenticate |
| `POST` | `/api/auth/refresh` | No | Refresh tokens |
| `GET` | `/api/auth/me` | Yes | Current user |
| `GET` | `/api/profile` | Yes | Get profile |
| `PUT` | `/api/profile` | Yes | Update profile |

Swagger documentation available at `http://localhost:3001/api/docs` when the API is running.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+

### Setup

```bash
# Install dependencies
pnpm install

# Configure environment
cp apps/api/.env.example apps/api/.env
# Edit .env with your database credentials and JWT secrets

# Run database migrations
pnpm db:migrate

# Start development servers (API + Web)
pnpm dev
```

The web app runs at `http://localhost:3000` and the API at `http://localhost:3001`.

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | API server port | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens | — |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | — |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | API URL for the frontend | `http://localhost:3001/api` |

## Scripts

```bash
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all packages and apps
pnpm test             # Run all tests
pnpm lint             # ESLint across the monorepo
pnpm typecheck        # TypeScript check across all packages
pnpm db:migrate       # Run Prisma migrations
pnpm db:seed          # Seed the database
```

### Package-specific

```bash
pnpm --filter @braxxis/web dev        # Frontend only
pnpm --filter @braxxis/api dev        # Backend only
pnpm --filter @braxxis/domain test    # Domain tests only
```

## Testing

Tests are colocated with source files (`*.test.ts` next to `*.ts`).

| Package | Type | Tests |
|---|---|---|
| `@braxxis/domain` | Unit | 29 |
| `@braxxis/application` | Unit (mocked deps) | 17 |
| `@braxxis/api` | Integration (Fastify inject) | 11 |
| `@braxxis/web` | Unit (stores, API client) | 28 |
| **Total** | | **85** |

```bash
pnpm test   # Run all
```

## Design System

The UI uses a dark-first theme with CSS custom properties for full theme switching support.

| Token | Dark | Purpose |
|---|---|---|
| `--color-base` | `rgb(6 0 16)` | Page background |
| `--color-surface` | `rgb(30 22 48)` | Card/widget background |
| `--color-purple-primary` | `#7c3aed` | Primary actions |
| `--color-text-primary` | `#ffffff` | Headings, values |
| `--color-text-secondary` | `rgba(255 255 255 / 0.6)` | Body text |
| `--color-text-muted` | `rgba(255 255 255 / 0.35)` | Labels, hints |
| `--color-border-card` | `rgba(169 148 184 / 0.15)` | Card borders |

Semantic colors: `#4ade80` (positive/buy/long), `#f87171` (negative/sell/short), `#a855f7` (accent/neutral).

## Project Conventions

- **File naming**: `kebab-case` (`create-user.use-case.ts`)
- **TypeScript**: `strict: true`, no `any`, explicit return types
- **Interfaces**: `I` prefix for contracts (`IUserRepository`)
- **Barrel exports**: Only at package boundaries
- **Max file length**: 250 lines
- **Commits**: Conventional Commits (`feat:`, `fix:`, `refactor:`)

## License

Private — All rights reserved.
