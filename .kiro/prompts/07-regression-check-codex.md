# Prompt: Regression Check (Codex)

## When to Use
Before merging any significant change. Use with Codex to specifically check for regressions.

## Input Required
- Git diff or change summary
- List of regression risk areas from the test plan
- Current test results

## Prompt

```
Perform a regression-focused review for this change.

Change summary:
{CHANGE_SUMMARY_OR_DIFF}

Known regression risk areas (from test plan):
{PASTE_REGRESSION_RISK_AREAS}

Current test results:
{PASTE_TEST_OUTPUT_OR_SUMMARY}

Check specifically for:

1. Data integrity
   - Could this change corrupt existing data?
   - Are database migrations safe for existing records?
   - Could artifact versioning break for existing artifacts?

2. State machine integrity
   - Could this change create invalid state transitions?
   - Are checkpoint gates still enforced?
   - Could a feature get stuck in an unreachable state?

3. Filesystem integrity
   - Could this change overwrite existing artifacts?
   - Are workspace paths still generated correctly?
   - Could directory creation fail silently?

4. API contract stability
   - Do existing endpoints still return the same shapes?
   - Are error codes unchanged for existing error cases?
   - Could clients break from response changes?

5. Cross-cutting concerns
   - Does validation still work for all existing inputs?
   - Are slug uniqueness constraints still enforced?
   - Does the settings system still work?

Output format:
- List of potential regressions found (with severity)
- List of areas confirmed safe
- Recommended additional tests if any gaps found
```

## Expected Output
A regression assessment that either clears the change or identifies specific risks to address.
