# Layered Web Access

Safe-first web access skill for `Codex` and `Claude Code`.

This project is designed for:

- public web research
- known-URL extraction
- supported high-value public sites
- limited dynamic pages behind an explicit advanced mode

This project is not designed as a general logged-in browser automation tool.

## What it supports

Formal first-version scope:

- public content
- static extraction
- supported site-specific extractors
- limited dynamic pages in an isolated browser profile

Supported site families currently include:

- Reddit public feeds and threads
- Stack Overflow and selected Stack Exchange sites
- arXiv
- Hugging Face
- selected official docs sites
- YouTube watch pages
- BBC articles
- WeChat articles
- Wikipedia articles

Experimental:

- Bilibili public video pages

## What it does not promise

- logged-in site reading
- OAuth flows
- stable support for `x.com`
- stable support for `platform.openai.com`
- direct use of the user's daily browser profile

## Modes

### Default mode

- safe-first
- prefers host-native search, static fetch, and site-specific extractors
- should not depend on ad hoc agent-side dependency installation as the normal path

### Advanced mode

- must be explicitly enabled
- uses an isolated browser profile
- still limited to public content and limited dynamic pages
- may use guided dependency preparation when local advanced prerequisites are missing

## Install

Current macOS alpha bootstrap:

```bash
bash scripts/install.sh
```

Quick checks after install:

```bash
bash scripts/doctor.sh
bash scripts/mode.sh status
bash scripts/advanced-preflight.sh
bash scripts/prepare-browser.sh status
```

What this currently does:

- prepares `runtime/` and `audit/`
- captures a reusable local Node launcher under `runtime/bin/node` when possible
- discovers a local browser
- computes whether default mode and advanced mode are actually ready
- writes installation state

`doctor.sh` reports:

- whether default mode is ready
- whether advanced mode is ready
- which blockers remain
- the next recommended action

Current limitation:

- automatic Node download/provision is not finished yet
- if no local `node` is available on first install, bootstrap will still stop with a clear message

## Host compatibility

- `Codex`: uses the same root `SKILL.md` plus `agents/openai.yaml`
- `Claude Code`: uses the same root `SKILL.md`

The product promise stays the same across both hosts. Only tool mapping changes.

Host-facing shell entrypoints:

- `bash scripts/install.sh`
- `bash scripts/doctor.sh`
- `bash scripts/mode.sh status`
- `bash scripts/mode.sh enable-advanced`
- `bash scripts/mode.sh disable-advanced`
- `bash scripts/advanced-preflight.sh`
- `bash scripts/prepare-browser.sh status`

## Verify

```bash
node scripts/verify-release.mjs
```

Before publishing this folder as a standalone repository:

```bash
bash scripts/clean-local-state.sh --yes
node scripts/export-check.mjs
```

Or export a clean snapshot without mutating the working release tree:

```bash
bash scripts/export-standalone.sh
```

Or materialize a stable standalone repository candidate directory:

```bash
bash scripts/materialize-standalone-repo.sh
```

## Runtime data

Local runtime state is created under:

- `runtime/`
- `audit/`

These directories are local state, not source files.

## Status

Current release state:

- version: `0.1.0-alpha.1`
- channel: `alpha-candidate`
- `PZ1` complete
- `PZ2` in progress
- `PZ3` in progress
- `PZ4` complete
- `PZ5` in progress
