# Security Policy

`layered-web-access` is a safe-first public web access skill. It is not a general logged-in browser automation tool.

## Security model

Default product assumptions:

- public content only
- no formal support for logged-in browsing
- no formal support for OAuth flows
- no default use of the user's daily browser profile
- advanced mode must be explicitly enabled by the user

The project reduces risk by keeping high-cost browser behavior behind an explicit advanced mode and by preferring static extraction whenever possible.

## Expected local behavior

This repository may create local state under:

- `runtime/`
- `audit/`

These directories are local machine state and should not be committed.

## Current known boundaries

The project does not promise stable support for:

- `x.com`
- `platform.openai.com`
- other challenge-heavy or login-heavy sites

Treat any one-off success on those sites as experimental, not as a security-reviewed capability.

## Reporting a vulnerability

If you find a security issue, please avoid opening a public issue with exploit details.

Preferred report contents:

- affected version
- affected host (`Codex` or `Claude Code`)
- whether the issue requires advanced mode
- minimal reproduction steps
- impact summary

Until a dedicated security contact is published, open a private report through the repository maintainer's preferred contact channel and include the phrase `layered-web-access security report`.

## Out of scope

The following are product limitations, not automatically security bugs:

- inability to pass anti-bot challenges
- inability to log into OAuth providers
- lack of support for logged-in content
- refusal to use the user's daily browser profile
