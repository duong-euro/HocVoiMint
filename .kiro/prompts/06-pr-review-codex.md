# Prompt: PR / Implementation Review (Codex)

## When to Use
After implementation of a milestone is complete. Use with Codex to review the code against the spec.

## Input Required
- Git diff or list of changed files
- Relevant spec files
- Test results

## Prompt

```
Review this implementation against the approved spec.

Feature: {FEATURE_NAME}
Milestone: {MILESTONE_NUMBER}
Changed files: {LIST_OR_DIFF}

Spec references:
- Technical spec: {REFERENCE}
- Task list: {REFERENCE}
- Test plan: {REFERENCE}

Review for:

1. Spec compliance
   - Does the implementation match the technical spec?
   - Are all API contracts implemented correctly?
   - Does the data model match the Prisma schema in the spec?
   - Are all validation rules from the Zod schemas applied?

2. Correctness
   - Are there logic errors?
   - Are edge cases from the feature spec handled?
   - Are state transitions correct?

3. Regression risk
   - Could this change break existing functionality?
   - Are there missing null checks or error handlers?
   - Are database operations wrapped in transactions where needed?

4. Security
   - Are all inputs validated at the boundary?
   - Are there path traversal risks in filesystem operations?
   - Are responses limited to allowed fields?

5. Performance
   - Are there N+1 query patterns?
   - Are expensive operations identified?
   - Is artifact content loaded lazily?

6. Test coverage
   - Are all test cases from the test plan implemented?
   - Are there untested code paths?
   - Do tests clean up after themselves?

7. Code quality
   - Does the code follow repo conventions?
   - Is the code readable and maintainable?
   - Are there unnecessary abstractions?

Output format:
List findings by severity (critical, high, medium, low).
For each finding: file path, line range, description, suggested fix.
```

## Expected Output
Review findings that can be addressed before merging. Critical and high findings must be resolved.
