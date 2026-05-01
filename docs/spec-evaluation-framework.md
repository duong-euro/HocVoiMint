# Spec Evaluation Framework

## Purpose
This framework evaluates whether a spec is strong enough to serve as an implementation-ready foundation.

It is meant to assess the spec before trusting it as a repeatable internal standard.

## Evaluation Principle
A good spec is not just detailed. It should be:
- correct about the problem
- disciplined about scope
- realistic about the chosen architecture
- implementable
- reviewable
- resilient to change

## Scoring Model
Each category is scored from 0 to 5.

### Score Meaning
- 0 = missing or fundamentally wrong
- 1 = present but severely weak
- 2 = partially useful, major gaps remain
- 3 = usable with notable weaknesses
- 4 = strong with minor gaps
- 5 = excellent and benchmark-worthy

## Evaluation Categories

### A. Problem Framing
Does the spec clearly describe the actual problem?

Check:
- does it clearly state deployment constraints (local, cloud, etc.)
- does it clearly state user assumptions (single-user, multi-user, etc.)
- does it explain the workflow or process being built
- does it explain why the app exists
- does it separate tool orchestration from product goals

Score guidance:
- 5 = the problem and context are immediately clear and correctly bounded

### B. Scope Discipline
Does the spec control scope well?

Check:
- goals are explicit
- non-goals are explicit
- MVP boundary is clear
- baseline scope is not mixed with future phases
- it avoids drifting into unnecessary complexity

Score guidance:
- 5 = scope is tight, clear, and phase-aware

### C. Domain Completeness
Does the spec include the right domain concepts?

Check for:
- all core entities are defined
- relationships between entities are clear
- workflows and state transitions are covered
- filesystem or storage conventions are documented (if applicable)

Score guidance:
- 5 = all core entities and flows are covered without meaningful gaps

### D. Technical Realism
Does the spec stay aligned with the chosen architecture?

It should remain grounded in the stated stack and constraints.

Red flags:
- assumes infrastructure not in the constraints
- ignores stated storage model
- over-engineers for the stated user count
- contradicts architectural decisions

Score guidance:
- 5 = architecture is consistent, practical, and aligned with constraints

### E. Execution Readiness
Could an implementation start from this spec?

Check:
- routes/pages are listed or implied clearly
- API boundaries are described
- schema/data model is described
- workflow steps are described
- state machine is described (if applicable)
- task breakdown exists
- test expectations exist
- checkpoints are defined (if applicable)

Score guidance:
- 5 = a developer could begin milestone 1 with minimal ambiguity

### F. Reviewability
Can a reviewer meaningfully challenge the spec?

Check:
- assumptions are visible
- open questions are visible
- risk areas are visible
- deferred scope is visible
- acceptance criteria are visible
- implementation boundaries are visible

Score guidance:
- 5 = review can be precise, not generic

### G. Change Resilience
Can the spec survive controlled scope changes without collapsing?

Check:
- decision log exists
- open questions exist
- milestones/phases exist
- technical sections are modular
- new requirements can be inserted cleanly

Score guidance:
- 5 = the spec is structured for evolution, not one-time writing

## Total Score
Maximum score: 35

### Interpretation
- 30–35: benchmark-quality spec
- 24–29: good working spec, but improve templates or prompts
- 18–23: partially usable, not ready as internal standard
- below 18: weak foundation, revise prompt/template/brief before proceeding

## Required Structural Checks
Before scoring, verify the spec includes these files or equivalent sections:

- overview
- feature spec
- technical spec
- execution plan
- task list
- decision log
- test plan
- rollout plan
- open questions
- codex review placeholder

If several are missing, the score ceiling should be reduced.

## Review Checklist
Use this checklist while scoring.

### Product / Feature Spec
- [ ] deployment constraints are explicit
- [ ] user assumptions are explicit
- [ ] goals are explicit
- [ ] non-goals are explicit
- [ ] actors are defined
- [ ] workflow is described
- [ ] edge cases are considered
- [ ] success criteria are defined

### Technical Spec
- [ ] data model is described
- [ ] state machine is described (if applicable)
- [ ] storage model is described
- [ ] route/page structure is described
- [ ] API boundaries are described
- [ ] execution model is described
- [ ] integration boundaries are described
- [ ] failure handling is described

### Execution Plan
- [ ] milestones exist
- [ ] sequence/dependencies exist
- [ ] MVP is separated from later phases
- [ ] tasks are actionable
- [ ] test plan exists
- [ ] review gate exists
- [ ] definition of done is meaningful

## Stress Tests
After initial scoring, challenge the spec with controlled changes to test resilience.

Example stress tests:
1. Add a new UI feature — where does it fit without breaking current structure?
2. Change the execution model — can technical sections adjust cleanly?
3. Make an integration manual instead of automated — can the workflow still hold?
4. Add a new data entity — can data model and task plan absorb it?
5. Introduce a workflow branch — can state machine and execution plan extend?

## Round Log Template
For each evaluation round, create a log using this structure:

### Metadata
- spec version:
- run date:
- evaluator:

### Scores
- Problem Framing:
- Scope Discipline:
- Domain Completeness:
- Technical Realism:
- Execution Readiness:
- Reviewability:
- Change Resilience:
- Total:

### Major Strengths
- 
- 

### Major Weaknesses
- 
- 

### Recommended Improvements
- prompt changes:
- template changes:
- checklist changes:
- workflow changes:

## Decision Rule
Do not promote this spec process as an internal standard until:
- the total score is at least 30
- no category is below 4 in core areas:
  - Problem Framing
  - Scope Discipline
  - Technical Realism
  - Execution Readiness
