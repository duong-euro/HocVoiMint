# Prompt: Repository Audit (Codex)

## When to Use
After research, before spec drafting. Use with Codex or any code-aware review tool.
For greenfield projects, adapt the prompt to focus on stack validation and architecture planning.

## Input Required
- Feature name and summary
- Repository path or access
- Known constraints

## Prompt

```
Analyze this repository before implementation planning.

Feature under consideration:
{FEATURE_NAME}: {FEATURE_SUMMARY}

Constraints:
{CONSTRAINTS}

Produce the following analysis:

1. Architecture summary
   - Current tech stack and framework versions
   - Project structure and key directories
   - Build and dev tooling

2. Affected modules
   - Which files/modules will this feature touch?
   - Which existing patterns should be reused?
   - Which areas are fragile or under-tested?

3. Data layer
   - Current database schema relevant to this feature
   - Migration strategy and risks
   - Data validation patterns in use

4. API layer
   - Existing API conventions (route structure, error handling, auth)
   - Patterns to follow for new endpoints
   - Any inconsistencies to be aware of

5. Testing landscape
   - Test framework and runner in use
   - Current coverage gaps relevant to this feature
   - Test patterns to follow

6. Technical debt and risks
   - Known debt that affects this feature
   - Constraints that could make the spec unrealistic
   - Missing information the spec should address

7. Implementation boundaries
   - What should be in scope for v1?
   - What should be explicitly deferred?
   - Suggested milestone boundaries

Output format:
Structured markdown with numbered sections matching above.
End with a "Recommendations for Spec" section.
```

## Expected Output
A markdown file saved to `artifacts/repo-audit.md` with:
- Concrete file paths and module names
- Specific patterns to reuse
- Clear implementation boundaries
