# Technical Spec

## 1. Current State
- Relevant modules/files:
- Current flow:
- Current limitations:
- Known technical debt:

## 2. Proposed Design
### Approach
{Mô tả approach chính.}

### Why This Approach
{Lý do chọn approach này.}

### Rejected Alternatives
- {alternative 1}: {reason rejected}
- {alternative 2}: {reason rejected}

## 3. Architecture Overview
{Sơ đồ kiến trúc dạng text hoặc mermaid.}

### Key Architectural Decisions
- {decision 1}
- {decision 2}

## 4. Data Model
{Prisma schema hoặc SQL DDL hoặc entity definitions.}

### Enums / Validation
{Liệt kê enum values và validation rules.}

### Zod Validation Schemas
{Reference implementations cho validation schemas.}

## 5. State Machine (if applicable)
### Flow
{Mô tả flow dạng text.}

### State Transitions
| Current State | Trigger | Next State | Condition |
|---------------|---------|------------|-----------|
| {state} | {trigger} | {state} | {condition} |

### Rerun Behavior
{Mô tả rerun behavior.}

### Failure Behavior
{Mô tả failure behavior.}

## 6. Filesystem Conventions (if applicable)
{Mô tả cấu trúc thư mục và naming conventions.}

## 7. Route / Page Structure
| Route | Page | Purpose |
|-------|------|---------|
| {route} | {page} | {purpose} |

## 8. API Routes
### Standard Error Response Shape
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Error Codes
| Code | HTTP Status | Meaning |
|------|-------------|---------|
| {code} | {status} | {meaning} |

### {Resource} API
| Method | Path | Purpose | Request Body | Success Response |
|--------|------|---------|-------------|-----------------|
| {method} | {path} | {purpose} | {body} | {response} |

## 9. Service / Adapter Interfaces (if applicable)
{TypeScript interfaces hoặc function signatures.}

## 10. Failure Handling
| Failure Type | Behavior |
|-------------|----------|
| {type} | {behavior} |

## 11. Observability
{Logging, metrics, monitoring cho round này.}

## 12. Performance Considerations
{Critical queries, bottlenecks, mitigations.}

## 13. Security Considerations
{Sensitive data, exposure risks, enforcement.}

## 14. Resolved Technical Questions
| ID | Question | Resolution | Decision Ref |
|----|----------|-----------|-------------|
| {id} | {question} | {resolution} | {ref} |
