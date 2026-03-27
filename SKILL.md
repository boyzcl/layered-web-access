---
name: layered-web-access
description: Safe-first web access skill for Codex and Claude Code. Use it for public web research, known-URL extraction, supported high-value sites, and limited dynamic pages with an optional advanced mode. Do not use it as a general logged-in browser automation skill.
metadata:
  version: "0.1.0-alpha.1"
  phase: "PZ5"
  hosts:
    - "Codex"
    - "Claude Code"
---

# layered-web-access

Use this skill when the task needs public web access, content extraction, or limited dynamic-page reading.

This skill is productized around one rule: take the lowest-risk path that can finish the task.

## Product boundary

This skill formally supports:

- public content
- known URL extraction
- supported high-value sites
- limited dynamic pages in an isolated browser profile

This skill does not formally support:

- logged-in site reading
- OAuth flows
- direct takeover of the user's daily browser profile
- stable access to high-challenge sites such as `x.com` or `platform.openai.com`

## Two modes

- `Default mode`
  - Safe-first
  - Prefer search, static fetch, and site-specific extractors
  - Should work without a long-running privileged browser service
- `Advanced mode`
  - Must be explicitly enabled by the user for the current session
  - Uses an isolated browser profile
  - Only for public pages that truly need rendering or light interaction

If advanced mode is not available in the current host environment, stay in default mode and explain the boundary instead of improvising higher-risk behavior.

## Host compatibility

This skill is intentionally shaped so the same root `SKILL.md` can be used by both Codex and Claude Code.

- In `Codex`, prefer the built-in `web` capability for discovery and current public information.
- In `Claude Code`, prefer the host's native search/fetch tools, then local scripts if present.
- In both hosts, keep the same routing policy and the same hard boundaries.

Read [references/host-compatibility.md](references/host-compatibility.md) when deciding how to translate the workflow to the current host.

## Routing order

1. If the task is about current public information, start with host-native web search.
2. If the URL is known and the page is mostly static, use static extraction.
3. If the site is in the supported list, prefer the site-specific extractor path.
4. Only enter advanced mode when static paths are insufficient and the task still targets public content.
5. If the page hits challenge, login wall, or OAuth, stop and report the boundary unless the product explicitly lists that site as supported.

Read [references/mode-policy.md](references/mode-policy.md) for the routing rules.
Read [references/mode-ux.md](references/mode-ux.md) for mode-switch behavior and expected user messaging.
Read [references/supported-sites.md](references/supported-sites.md) for the current supported site set.
Read [references/boundaries.md](references/boundaries.md) before escalating cost.

## Supported site families

The current product-facing support set includes:

- Reddit public feeds and threads
- Stack Overflow and selected Stack Exchange sites
- arXiv abstract pages
- Hugging Face model pages
- selected official docs sites
- YouTube watch pages
- BBC article pages
- WeChat article pages
- Wikipedia article pages
- Bilibili public video pages as an experimental `Tier 1.5` path

Do not assume browser success when a supported site already has a stronger static or site-specific route.

## Hard constraints

- Never treat logged-in browsing as a default capability.
- Never assume direct CDP access is acceptable.
- Never use the user's daily browser profile as the default execution context.
- Never widen the product promise to cover challenge-heavy sites just because a one-off experiment worked once.
- Never store tokens, cookies, signed URLs, or auth headers in reusable site knowledge.

## Working style

- Explain which mode you are using.
- Name the lowest tier that can finish the task.
- If the task is out of product scope, say so plainly and suggest the closest supported path.
- Prefer stable extractor outputs over brittle page-driving steps.
