# API Contract Conventions

## General Rules
- define request shapes clearly
- define response shapes clearly
- define error shapes clearly

## Error Response Shape
```json
{
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```
