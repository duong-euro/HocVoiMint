# Prompt: Spec Draft (Kiro)

## When to Use
After research and repo audit are complete. Use with Kiro to generate the full spec pack.

## Input Required
- Research summary (`artifacts/research-summary.md`)
- Repo audit (`artifacts/repo-audit.md` or equivalent notes)
- Baseline scope document (if exists)
- Constraints and non-goals

## Prompt

```
Create an implementation-ready feature spec for this project.

Feature:
{FEATURE_NAME}: {FEATURE_SUMMARY}

Context documents:
- Research summary: {PASTE_OR_REFERENCE}
- Repo audit: {PASTE_OR_REFERENCE}
- Baseline scope: {PASTE_OR_REFERENCE}

Constraints:
{CONSTRAINTS}

Non-goals:
{NON_GOALS}

Generate the following spec files using the templates in `.kiro/specs/_templates/`:

1. `00-overview.md` — objective, hard constraints, risks, deferred scope
2. `01-feature-spec.md` — goals, non-goals, user flows, functional requirements, edge cases, success metrics
3. `02-technical-spec.md` — architecture, data model (with schema), state machine, route table, API table with error codes, adapter/service interfaces, failure handling
4. `03-execution-plan.md` — milestones with done gates, sequencing, risks, shipping criteria
5. `04-task-list.md` — milestone-mapped tasks with subtasks and done criteria
6. `05-decision-log.md` — key architectural decisions with options and rationale
7. `06-test-plan.md` — unit test cases, integration test cases, manual QA checklist
8. `07-rollout-plan.md` — setup instructions, preconditions, rollback plan
9. `08-open-questions.md` — resolved and still-open questions
10. `09-codex-review.md` — review metadata and checklist (findings filled after review)

Requirements:
- Every functional requirement must be testable
- Every API endpoint must have request/response shapes and error cases
- Data model must be concrete enough to copy into schema file
- Task list must be specific enough that a developer can start without asking questions
- Deferred items must be explicitly listed, not silently excluded
- All decisions must be logged with rationale

Do NOT:
- Add features beyond the baseline scope
- Assume multi-user, cloud, or enterprise patterns unless specified
- Leave placeholder text like [INSERT] or [PASTE]
```

## Expected Output
10 spec files in `.kiro/specs/{feature-slug}/` matching the structure above.
