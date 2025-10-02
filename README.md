# Birch Remake

Birch Remake is a SaaS platform for automating Meta (Facebook and Instagram) advertising workflows. The project is organised as a TypeScript monorepo that hosts the Next.js front-end, the NestJS API, shared packages, infrastructure scripts, and developer tooling. This repository currently contains an MVP scaffold that sets the stage for implementing the full feature set described in the master brief.

## Repository Structure

```text
apps/
  web/              # Next.js (App Router) front-end
  api/              # NestJS API server
packages/
  shared/           # Shared TypeScript utilities, schemas, and constants
configs/            # Shared configuration files (ESLint, Tailwind, etc.)
docs/               # Architectural notes and OpenAPI specification
seeds/              # Seed scripts and demo payloads
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker & docker-compose

### Installation

```bash
pnpm install
```

Copy `.env.example` to `.env` and populate the variables.

### Running the Stack Locally

The repository ships with a docker-compose recipe that launches Postgres, Redis, the API, and the web client. In one terminal, run:

```bash
docker-compose up --build
```

Alternatively you can run each service individually:

```bash
pnpm dev:api
pnpm dev:web
```

The web client lives at `http://localhost:3000` and the API at `http://localhost:3333` by default.

### Database

Prisma is configured against Postgres. To apply migrations and seed demo data:

```bash
pnpm prisma:migrate
pnpm prisma:seed
```

### Tests

- `pnpm test` – run unit tests (Vitest placeholders).
- `pnpm test:e2e` – run Playwright end-to-end scenarios.
- `pnpm test:api` – run Supertest-powered API checks.

## Documentation

- `docs/openapi.yaml` contains the evolving OpenAPI contract for the backend.
- `docs/architecture.md` outlines the high-level system design and remaining work.
- `seeds/` includes example automation rules, prebuilt strategy templates, and bootstrap data.

## Contributing

1. Fork & clone the repo.
2. Create a feature branch.
3. Run linting and tests before opening a PR.
4. Document new environment variables in `.env.example`.

## License

MIT
