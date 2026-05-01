# Coding Standards

## General Principles
- Prefer readability over cleverness
- Keep units of logic focused and easy to test
- Avoid unnecessary abstraction
- Match existing patterns in the codebase before introducing new ones

## Naming
- Files: kebab-case (`artifact-manager.ts`)
- Functions/variables: camelCase (`getNextVersion`)
- Classes/interfaces: PascalCase (`StepAdapter`)
- Constants: UPPER_SNAKE_CASE (`MAX_ARTIFACT_PREVIEW_SIZE`)
- Database tables: {convention, e.g. PascalCase in Prisma}
- API routes: {convention, e.g. kebab-case paths}

## Error Handling
- Validate all inputs at the boundary (API route handlers)
- Use {validation library, e.g. Zod} for request validation
- Return structured error responses (see `api-contract-conventions.md`)
- Never swallow errors silently — log and surface them

## Code Organization
- Group by feature/domain, not by type
- Keep service logic separate from route handlers
- Keep validation schemas in a shared location
- Keep TypeScript interfaces close to where they are used
