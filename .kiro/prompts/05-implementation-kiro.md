# Prompt: Implementation (Kiro)

## When to Use
After spec is approved and Codex review is complete. Use with Kiro to implement milestone by milestone.

## Input Required
- Approved spec files (especially `02-technical-spec.md` and `04-task-list.md`)
- Current milestone number
- Any resolved open questions since spec approval

## Prompt

```
Implement Milestone {N} according to the approved spec.

Spec files:
- Technical spec: {REFERENCE}
- Task list: {REFERENCE}
- Test plan: {REFERENCE}

Current milestone: Milestone {N}
Tasks to implement: {LIST_TASKS_FROM_TASK_LIST}

Rules:
1. Follow the technical spec exactly for:
   - Data model / schema
   - API routes and error codes
   - Validation schemas
   - State machine transitions
   - Filesystem conventions

2. Follow existing repo conventions for:
   - File/folder structure
   - Naming patterns
   - Import style
   - Error handling patterns

3. For each task:
   - Implement the code
   - Write the tests specified in the test plan
   - Verify the "Done" criteria from the task list
   - Do not mark the task as done until tests pass

4. Do NOT:
   - Add features not in the current milestone scope
   - Change the API contract without updating the spec
   - Skip tests
   - Introduce new dependencies without justification

5. If you encounter ambiguity:
   - Check the spec files first
   - Check the decision log
   - If still unclear, note it and ask before proceeding
```

## Expected Output
- Working code for all tasks in the milestone
- Tests passing for all test cases in the test plan for this milestone
- Task list updated with completed checkboxes
