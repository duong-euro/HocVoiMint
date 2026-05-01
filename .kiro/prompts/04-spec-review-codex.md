# Prompt: Spec Review (Codex)

## When to Use
After spec draft is complete. Use with Codex to review the spec against the codebase and constraints.

## Input Required
- All spec files (00 through 09)
- Baseline scope document
- Evaluation framework (if using benchmark scoring)
- Current codebase access

## Prompt

```
Review this feature spec against the current codebase and constraints.

Feature: {FEATURE_NAME}
Spec files: {LIST_OR_REFERENCE_ALL_SPEC_FILES}

Constraints:
{CONSTRAINTS}

Baseline scope:
{PASTE_OR_REFERENCE}

Perform the following review:

1. Architecture alignment
   - Does the spec match the current architecture?
   - Are there assumptions that conflict with the codebase?
   - Are rejected alternatives reasonable?

2. Data model review
   - Are schema changes clear and complete?
   - Are relationships and constraints correct?
   - Are migration notes adequate?

3. API contract review
   - Are all endpoints defined with request/response shapes?
   - Are error cases covered?
   - Does the error format match project conventions?

4. State machine review
   - Are all state transitions defined?
   - Are edge cases (rerun, failure, checkpoint) handled?
   - Is the state model extensible?

5. Testing gaps
   - Are all functional requirements covered by test cases?
   - Are edge cases from the feature spec reflected in the test plan?
   - Are there missing integration test scenarios?

6. Scope discipline
   - Does the spec stay within baseline scope?
   - Are deferred items clearly marked?
   - Is there any scope creep?

7. Implementation readiness
   - Could a developer start milestone 1 from this spec?
   - Are there ambiguous sections that need clarification?
   - Are task dependencies clear?

Output format:
Use the findings structure from `09-codex-review.md`:
- Critical findings (blocking)
- High findings (should fix before implementation)
- Medium findings (should fix during implementation)
- Low findings (nice to fix)
- Missing considerations
- Suggested spec edits

Rate each finding by severity and provide specific fix recommendations.
```

## Expected Output
Findings written into `09-codex-review.md` with severity ratings and specific recommendations.
