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

## Maintainer Git workflow

For this repository, treat the local Git working copy itself as the public source of truth.

Recommended order:

1. edit in this repository
2. run:

```bash
node tools/release/repo-ready-check.mjs --root .
```

3. then do Git operations sequentially:

```bash
git status --short
git add ...
git commit -m "..."
git push
```

If a release tag is needed:

```bash
git tag -a <tag> -m "<tag>"
git push origin <tag>
```

Important:

- do not run Git write operations in parallel
- do not treat installed copies under `~/.codex/skills/...` as development directories
- if you change public release-facing files here, back-sync the mirrored `release/` skeleton in the research workspace
