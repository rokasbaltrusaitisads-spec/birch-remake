# Birch Remake Architecture

This document tracks the intended architecture for the Birch automation platform and highlights remaining work for each major subsystem.

## Monorepo layout

- **apps/web** – Next.js 14 application using the App Router and Tailwind CSS. Hosts marketing pages, the rule builder canvas, bulk creator preview, boosting configurator, dashboards, and supporting documentation.
- **apps/api** – NestJS service responsible for auth, integrations, rules evaluation, job orchestration, and notifications.
- **packages/shared** – Shared TypeScript types, validation schemas, and strategy templates consumed by the web and API layers.

## Key subsystems

### Authentication & tenancy
- NextAuth on the web tier for email/password and OAuth (Meta) sign-in.
- API exposes session validation endpoints for the web client.
- RBAC enforced by organisation membership roles (owner, admin, analyst).

### Meta integration
- OAuth flow to retrieve long-lived tokens, stored encrypted via Prisma middleware.
- BullMQ jobs manage token refresh, rate limiting, and exponential backoff for API calls.

### Metrics service
- Collects account/campaign/ad set/ad insights from the Meta Marketing API.
- Supports dynamic windows, comparisons to Google Sheet metrics, and cached responses.

### Rules engine & scheduler
- Parses the JSON DSL into executable steps.
- Evaluates filters with metrics + custom metrics.
- Executes actions (pause/enable/budget/bid/duplicate/notifications/logging).
- Scheduler backed by BullMQ queues, cron strings with 15-minute granularity, and manual trigger endpoints.

### Bulk creation & boosting
- Matrix expansion for creatives × copy × audiences with macro substitutions for naming + UTMs.
- Optional attachment of automation rules to newly created entities.
- Post boosting config reads insights on organic posts and launches ads that retain engagement.

### Dashboards & alerts
- Lightweight KPI boards per ad account.
- Slack/email digests for daily KPI snapshots and rule triggers.

## Development roadmap

1. Implement Meta OAuth connectivity and ad account linking.
2. Build metrics ingestion service with Google Sheets enrichment.
3. Deliver rules engine, scheduler, and action executors.
4. Wire the visual builder to live data and validation.
5. Implement bulk creation, boosting, and post ID export flows.
6. Finalise dashboards, notifications, and audit logging.

## Testing strategy

- Unit tests with Vitest across packages and services.
- API tests using Supertest.
- Playwright for end-to-end coverage of core user journeys (rule creation, log inspection, bulk creation, boosting setup).

## Deployment

- Dockerfiles for web and api services.
- docker-compose for local orchestration (Postgres, Redis, worker, web, api).
- Production deployment via Fly.io or AWS using Terraform (scaffold to be added).
