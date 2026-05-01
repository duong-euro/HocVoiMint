# Specs Directory

Thư mục này chứa implementation-ready specs cho từng feature.

## Cấu trúc

```
_templates/           10 template files — copy cho feature mới
{feature-slug}/       Spec files cho một feature cụ thể
  00-overview.md      Objective, constraints, risks
  01-feature-spec.md  Goals, flows, FRs, edge cases
  02-technical-spec.md Architecture, schema, APIs
  03-execution-plan.md Milestones, sequencing
  04-task-list.md     Tasks per milestone
  05-decision-log.md  Decisions with rationale
  06-test-plan.md     Test cases
  07-rollout-plan.md  Setup, rollback
  08-open-questions.md Questions resolved and open
  09-codex-review.md  Review findings
  artifacts/          Research, references, notes
```

## Cách tạo spec mới

```bash
# 1. Copy templates
cp -r _templates/ {feature-slug}/

# 2. Tạo artifacts directory
mkdir {feature-slug}/artifacts/

# 3. Điền spec files theo workflow guide (docs/workflow-guide.md)
```
