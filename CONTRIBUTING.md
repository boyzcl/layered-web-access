# Contributing

## Scope

This project favors a narrow, truthful product boundary over inflated browser capability claims.

Please preserve these principles when contributing:

- default safe-first behavior
- explicit advanced mode
- public-content-only formal support
- isolated browser profile
- no silent widening into login-required automation

## Change priorities

Preferred contributions:

- better static extractors
- cleaner site-specific extractors
- clearer user-facing boundaries
- more reliable install and self-check flows
- better release validation coverage

Changes that should not be merged casually:

- anything that treats logged-in reading as a default capability
- anything that reuses the user's daily browser profile
- anything that widens official support to challenge-heavy sites without stable evidence

## Validation

Before proposing release-facing changes, run:

```bash
node scripts/verify-release.mjs
```

