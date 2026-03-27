# Release Notes: v0.1.0-alpha.1

`v0.1.0-alpha.1` is the first public alpha tag for `layered-web-access`.

## What this release is

This is a safe-first public web access skill for:

- `Codex`
- `Claude Code`

It is designed for:

- public web research
- known-URL extraction
- supported high-value public sites
- limited dynamic pages behind an explicit advanced mode

## What is included

- shared root `SKILL.md` for `Codex` and `Claude Code`
- default-mode and advanced-mode product boundary
- install, doctor, mode, advanced-preflight, and browser-status entrypoints
- support matrix, security policy, and privacy notes
- standalone repository export and publish-prep flow
- GitHub-install validation path

## Public support boundary

Supported focus:

- public content
- static extraction
- supported site-specific extractors
- limited dynamic pages in an isolated browser profile

Not part of the formal promise:

- logged-in site reading
- OAuth flows
- stable support for `x.com`
- stable support for `platform.openai.com`
- use of the user's daily browser profile

## Validation status

This alpha line has been validated for:

- standalone repository readiness
- GitHub repository distribution
- GitHub installation into `~/.codex/skills`
- post-install command flow:
  - `install.sh`
  - `doctor.sh`
  - `mode.sh status`
  - `advanced-preflight.sh`
  - `prepare-browser.sh status`

## Known current limitations

- automatic Node download / provisioning is not finished yet
- managed Chromium download / provisioning is not finished yet
- high-challenge public sites remain outside the formal support line

## Recommended GitHub release title

`v0.1.0-alpha.1`

## Recommended GitHub release summary

First public alpha for a safe-first web access skill for Codex and Claude Code, focused on public content extraction and limited dynamic pages.
