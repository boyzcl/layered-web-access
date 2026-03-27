# Privacy Notes

`layered-web-access` is designed to keep its default behavior local and narrow in scope.

## What the project is for

- public web research
- known-URL extraction
- supported public high-value sites
- limited dynamic pages in an isolated browser profile when advanced mode is explicitly enabled

## What it does not formally do

- logged-in site reading
- OAuth flows
- silent takeover of the user's daily browser profile
- cloud telemetry as part of the skill itself

## Local state

This repository may write local state under:

- `runtime/`
- `audit/`

Typical contents include:

- install state
- mode state
- local readiness information
- advanced-mode preparation state
- local incident or audit records when applicable

These directories are local-only operational state and should not be treated as source files.

## Sensitive data handling

Project policy is:

- do not store tokens, cookies, signed URLs, or auth headers in reusable knowledge files
- keep public-site extraction logic separate from login flows
- keep advanced mode opt-in and isolated

If you experiment outside the formal support boundary, you are responsible for the extra privacy risk introduced by that experiment.

## Publishing and sharing

Before publishing or exporting a repository snapshot, clean local state or export a clean standalone tree.

Maintainer release tools support:

- checking whether `runtime/` or `audit/` leaked into the tree
- exporting a clean standalone repository snapshot

## Host note

The same product boundary applies in both `Codex` and `Claude Code`. Host integration may differ, but the privacy promise should not widen across hosts.
