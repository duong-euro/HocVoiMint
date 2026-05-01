# Security / Performance Checklist

## Security Checklist
- [ ] All inputs validated at boundary (validation schemas in route handlers)
- [ ] Structured error responses (no stack traces in production)
- [ ] Responses only include allowed fields (no accidental data leaks)
- [ ] Filesystem paths validated (no path traversal via user input)
- [ ] App binds to appropriate network interface
- [ ] No sensitive credentials in code or config committed to git
- [ ] Database operations use parameterized queries

## Performance Checklist
- [ ] Expensive queries identified
- [ ] Database indexes defined for foreign keys and frequent queries
- [ ] Large content loaded on-demand (not preloaded in lists)
- [ ] Large file previews truncated
- [ ] No N+1 query patterns in list endpoints
- [ ] Avoid unnecessary re-renders in frontend components
