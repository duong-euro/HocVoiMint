# Codex Review Checklist

Use this checklist when reviewing a spec with Codex. Check each item and note any issues found.

## Product / Feature Spec
- [ ] Problem is clearly stated
- [ ] Local-only / deployment constraints are explicit
- [ ] User assumptions are explicit (single-user, multi-user, etc.)
- [ ] Goals are numbered and measurable
- [ ] Non-goals are numbered and explicit
- [ ] Actors are defined with roles and constraints
- [ ] User flows cover the main scenarios
- [ ] Functional requirements are specific and testable
- [ ] Edge cases are listed with expected behavior
- [ ] Success metrics are defined
- [ ] Risks have mitigations
- [ ] Assumptions are listed

## Technical Spec
- [ ] Data model is concrete (schema, not just entity names)
- [ ] All fields have types and constraints
- [ ] Relationships and unique constraints are defined
- [ ] State machine has a complete transition table
- [ ] All states and transitions are accounted for
- [ ] Rerun and failure behavior are specified
- [ ] Route/page structure is listed
- [ ] All API endpoints have method, path, request shape, response shape, error cases
- [ ] Error response format is standardized
- [ ] Validation schemas are defined (Zod or equivalent)
- [ ] Worker/execution model is described
- [ ] Filesystem conventions are documented (if applicable)
- [ ] Repo integration boundaries are clear
- [ ] Failure handling is described per component
- [ ] Performance considerations are noted
- [ ] Security considerations are noted

## Execution Plan
- [ ] Milestones have clear objectives and done gates
- [ ] Task dependencies are sequenced
- [ ] MVP scope is separated from later phases
- [ ] Risks have severity ratings and mitigations
- [ ] Shipping criteria are defined
- [ ] Definition of done is meaningful

## Task List
- [ ] Tasks are grouped by milestone
- [ ] Each task has subtasks
- [ ] Each task group has a "Done" criteria
- [ ] Tasks are specific enough to start without questions
- [ ] Testing tasks are included per milestone

## Test Plan
- [ ] Unit test cases have ID, input, expected output
- [ ] Integration test cases cover all API endpoints
- [ ] State machine transitions are tested
- [ ] Edge cases from feature spec are reflected
- [ ] Manual QA checklist covers end-to-end flow
- [ ] Regression risk areas are identified

## Cross-File Consistency
- [ ] Data model in technical spec matches entity list in feature spec
- [ ] API routes in technical spec match test cases in test plan
- [ ] Milestones in execution plan match task groups in task list
- [ ] Decisions in decision log match resolved questions in open questions
- [ ] Deferred scope is consistent across overview, feature spec, and execution plan
