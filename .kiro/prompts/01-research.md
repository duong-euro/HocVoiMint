# Prompt: Feature Research

## When to Use
At the start of a new feature, before writing any spec. Use with Perplexity, Kiro, or any research-capable tool.

## Input Required
- Feature idea (1-2 sentences)
- Target user and context
- Known constraints (local-only, single-user, specific stack, etc.)

## Prompt

```
You are helping with feature discovery and research.

Feature idea:
{FEATURE_IDEA}

Target user:
{USER_DESCRIPTION}

Known constraints:
{CONSTRAINTS}

Research the best approach for this feature. Cover:

1. Problem framing
   - What problem does this solve?
   - Who has this problem and in what context?
   - What happens if this is not built?

2. User expectations
   - What does the user expect to happen?
   - What are the key user flows?
   - What are common pain points in similar tools?

3. Technical options
   - What are 2-3 viable technical approaches?
   - What are the trade-offs of each?
   - Which approach best fits the constraints?

4. UX patterns
   - What UI patterns are standard for this type of feature?
   - What should be avoided?

5. Security and performance
   - What are the security considerations?
   - What are the performance risks?

6. Risks and trade-offs
   - What could go wrong?
   - What assumptions are being made?
   - What should be deferred vs included in v1?

Output format:
Write a research summary with sections matching the 6 areas above.
End with a "Recommended Approach" section and an "Open Questions" list.
```

## Expected Output
A markdown file saved to `artifacts/research-summary.md` with:
- Clear problem framing
- Recommended approach with rationale
- List of open questions to resolve before spec drafting
