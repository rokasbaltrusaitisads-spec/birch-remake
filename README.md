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

### GitHub Codespaces

Open the repository in [GitHub Codespaces](https://github.com/features/codespaces) to get a ready-to-run workspace. The provided
devcontainer image installs Node.js, pnpm, and Docker tooling automatically. On the first start it runs `pnpm install` and boots
the static preview server, forwarding it on port **4173**. Codespaces will open the preview in a browser tab so you can explore
the mocked Birch experience immediately. Logs for the background preview process live at `.devcontainer/.preview.log`.

The same port mappings also expose the full-stack services (Next.js on 3000, NestJS on 3333) when you launch them manually.

### Zero-Install UI Preview

If you simply want to click through the Birch experience without installing Node, Docker, or pnpm,
open [`preview/index.html`](preview/index.html) directly in your browser. The static preview bundles
mocked screenshots of the automation builder, bulk creator, dashboards, and boosting configurator.

Prefer a shareable link? Start the built-in static server:

```bash
pnpm preview
```

This serves the preview at [http://localhost:4173](http://localhost:4173) and works even if the API
and database are offline.

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

The repository ships with Vitest, Playwright, and Supertest harnesses. After installing
dependencies you can run the full suite with:

```bash
pnpm test
```

Or target specific layers:

- `pnpm --filter web test:e2e` – run Playwright end-to-end scenarios.
- `pnpm --filter api test:api` – execute NestJS HTTP contract checks.
- `pnpm --filter shared test` – validate the shared rule schemas and DSL fixtures.

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
