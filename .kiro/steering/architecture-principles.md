# Architecture Principles

## Current Architecture Snapshot
- Frontend: {framework, e.g. Next.js App Router, React, Vue}
- Backend: {framework, e.g. Next.js API Routes, Express, FastAPI}
- Database: {database, e.g. SQLite via Prisma, PostgreSQL}
- Cache: {cache strategy or "none"}
- Queue / jobs: {job system or "none"}
- Auth: {auth strategy or "none"}
- External integrations: {list or "none"}
- Deployment model: {e.g. local-only, Vercel, AWS}

## Architectural Philosophy
We prefer:
- clarity over novelty
- consistency over one-off optimization
- explicit contracts over hidden assumptions
- reuse of existing patterns over unnecessary abstractions
