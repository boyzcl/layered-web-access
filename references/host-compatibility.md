# Host Compatibility

This skill keeps one canonical instruction set for both Codex and Claude Code.

## Codex

- Prefer built-in `web` for current public information.
- Use local extractor scripts for supported sites when the URL is known.
- Treat advanced mode as an optional local runtime backed by an isolated browser profile.
- `agents/openai.yaml` exists only for Codex UI metadata; it does not change the skill's routing policy.

## Claude Code

- Use the same root `SKILL.md`.
- Prefer Claude-native search/fetch tools for discovery and low-cost extraction.
- Use local scripts only when they are present in the installed skill package or project workspace.
- Do not assume the Claude host provides the same built-in tool surface as Codex.

## Shared compatibility contract

- One root `SKILL.md`
- One set of product boundaries
- One supported-site policy
- No separate "Claude-safe" and "Codex-safe" instruction forks

If host-specific behavior is needed, branch at the tool layer, not at the product promise layer.

