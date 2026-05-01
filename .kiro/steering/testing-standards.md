# Testing Standards

## Minimum Expectations
Every meaningful feature change should include the appropriate mix of:
- Unit tests for validation logic, state machine, and utility functions
- Integration tests for API routes with database
- UI/flow tests where relevant (manual QA acceptable for early rounds)
- Regression coverage for bug fixes

## Test Structure
- Test files co-located with source or in `__tests__/` directory
- Test names describe the behavior, not the implementation
- Each test case has a clear setup, action, and assertion
- Tests clean up after themselves (reset DB, delete temp files)

## Test Database
- Use a separate database for tests
- Reset between test suites
- Never share state between test files

## Coverage Targets
- All validation schemas: 100% of valid/invalid cases
- All API endpoints: at least happy path + main error case
- State machine (if applicable): all valid transitions + key invalid transitions
- {Add project-specific coverage targets}
