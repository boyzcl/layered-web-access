# Security Policy

`layered-web-access` is a safe-first public web access skill. It is not a general logged-in browser automation tool.

## 中文说明

这个项目的核心安全选择不是“把能力做满”，而是“把高风险能力从默认态移开”。

也就是说：

- 默认模式优先处理公开内容
- 默认不承诺登录后读取
- 默认不接管用户日常浏览器
- 只有显式开启高级模式时，才进入更高成本的浏览器路径

这样做的代价是：能力上限不会和高权限浏览器自动化工具完全一样。  
这样做的收益是：默认风险、误用风险和损害半径都会明显更小。

## Security model

Default product assumptions:

- public content only
- no formal support for logged-in browsing
- no formal support for OAuth flows
- no default use of the user's daily browser profile
- advanced mode must be explicitly enabled by the user

The project reduces risk by keeping high-cost browser behavior behind an explicit advanced mode and by preferring static extraction whenever possible.

## Why these boundaries exist

This repository is based on a deliberate product tradeoff.

Some browser-access systems choose the opposite default:

- connect to a real daily browser
- inherit existing login state
- expose very strong browser control early

That can raise the probability of success on high-challenge sites, but it also expands the blast radius significantly.

This project instead chooses:

- explicit advanced-mode entry
- isolated browser profile only
- public-content-first scope
- no formal logged-in browsing promise

The goal is not zero risk. The goal is to keep high-risk behavior out of the default path and keep the boundary legible.

## Threat model summary

Primary risks considered here:

- local privileged browser control becoming too easy to trigger
- accidental reuse of a user's daily browsing identity
- leakage of local runtime or audit state into published trees
- over-promising support for challenge-heavy sites and pushing users into unsafe workarounds

Primary mitigations:

- safe-first routing
- explicit advanced-mode switch
- isolated profile strategy
- public-content-only product promise
- export-clean checks for repository publication

## Residual risks

Even with the current boundary, some risk remains.

Examples:

- advanced mode still increases local attack surface compared with pure static extraction
- browser-based public-page reading can still interact with complex third-party code
- local `runtime/` and `audit/` state may contain operational traces and should be treated as machine-local state
- experimental paths may be less reviewed than the formal support set

Users who need stronger browser power should treat that as an explicit trust decision, not as an invisible default.

## Expected local behavior

This repository may create local state under:

- `runtime/`
- `audit/`

These directories are local machine state and should not be committed.

## Default mode vs advanced mode

### Default mode

Expected to stay in lower-risk paths:

- host-native web search
- static fetch
- site-specific extractors

This mode is the formal default and should remain the safest normal path.

### Advanced mode

Advanced mode is intentionally narrower than "full browser automation":

- explicit user action is required
- isolated profile only
- still public-content-focused
- still not a formal logged-in browsing promise

Advanced mode may increase compatibility for limited dynamic pages, but it is not intended to erase all browser-security tradeoffs.

## Current known boundaries

The project does not promise stable support for:

- `x.com`
- `platform.openai.com`
- other challenge-heavy or login-heavy sites

Treat any one-off success on those sites as experimental, not as a security-reviewed capability.

## Non-goals

The following are intentionally not design goals for the first-version product:

- silently acting as the user's real logged-in browser
- maximizing success on every anti-bot or challenge-heavy site
- supporting OAuth provider login flows as a core feature
- normalizing high-permission browser control as the default experience

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
