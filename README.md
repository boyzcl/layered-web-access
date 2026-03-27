# Layered Web Access

Safe-first web access skill for `Codex` and `Claude Code`.

- Repository: [boyzcl/layered-web-access](https://github.com/boyzcl/layered-web-access)
- Current channel: `0.1.0-alpha.1`

## 中文简介

这是一个面向 `Codex` 和 `Claude Code` 的安全优先网页访问 Skill。

它不是“全能浏览器接管器”，而是一个**分层、可解释、风险受控**的网页访问产品。

### 这个项目的核心特点

- `安全优先`
  - 默认不走高权限浏览器路径
  - 先用搜索、静态抓取和站点专用提取器完成任务
- `双模式`
  - 默认模式面向大多数公开网页任务
  - 高级模式必须由用户显式开启，才会进入隔离浏览器路径
- `公开内容优先`
  - 正式支持目标是公开内容和有限动态页
  - 不把登录后读取当作第一版产品承诺
- `边界清楚`
  - 哪些站点支持、哪些站点延期、哪些站点不承诺，都会明确写出来

### 产品决策：为什么这样设计

这个项目最核心的产品决策是：

- **不把“最高权限浏览器能力”当作默认能力**

很多网页访问工具为了追求更高成功率，会默认走这些路线：

- 接管用户日常浏览器
- 复用已有登录态
- 默认开放更强的浏览器控制能力
- 在 challenge / 登录墙 / OAuth 上继续强攻

这样做的好处是，在少数高挑战站点上，上限可能更高。  
但代价也很直接：

- 风险更高
- 损害半径更大
- 用户更难理解 Agent 到底拿到了什么权限
- 一旦误用，后果会更接近“Agent 在替你本人操作浏览器”

这个项目反过来做了一个更克制的选择：

- 先用最低风险路径完成公开网页任务
- 优先走搜索、静态抓取和站点专用提取器
- 只在确实需要时，才进入显式开启的高级模式
- 高级模式也只面向公开内容和有限动态页，不把登录后读取当作正式承诺

一句话说，这个项目追求的是：

- **默认更安全，必要时再变强，而不是默认最强**

### 不能做到什么，为什么

当前版本**不正式承诺**这些能力：

- 登录后网站读取
- OAuth 登录流程
- 稳定访问 `x.com`
- 稳定访问 `platform.openai.com`
- 直接接管用户日常浏览器 profile

原因不是“没考虑”，而是明确的产品选择：

- 登录后读取意味着权限边界会快速上升到账户级风险
- OAuth 和高挑战站点通常会把问题从“网页读取”变成“浏览器身份与风控信任”
- 接管日常浏览器虽然可能提高成功率，但会显著扩大隐私与误操作风险

所以这里不是简单地“暂时没做”，而是：

- **第一版故意不把这些能力纳入正式承诺**

如果你要的是“尽量稳定地处理高价值公开内容”，它是为这个目标设计的。  
如果你要的是“接管日常浏览器、默认复用登录态、强行打穿高挑战站点”，那不是这个项目的产品定位。

### 为什么说它更安全

这里的“更安全”，不是说零风险，而是说：

- 高风险能力不在默认态
- 浏览器路径要求显式进入高级模式
- 使用隔离 profile，而不是用户日常 profile
- 正式支持范围限定为公开内容
- 站点边界写清楚，不靠模糊承诺掩盖风险

这会带来一个很现实的结果：

- 它的能力上限，确实不会等同于那些高权限浏览器自动化工具
- 但默认风险、误用风险和损害半径，也会明显更低

### 实际效果是什么

在当前产品边界下，这个项目已经更适合这些事情：

- 公开网页研究
- 已知 URL 内容提取
- 技术内容站点访问
- 一部分高价值内容平台页提取
- 有限动态页的受控读取

它的目标效果不是：

- “任何站点都强行打通”

而是：

- **让公开网页访问这件事，尽量可用、可解释、可维护、可发布**

## Project background

This project was shaped by lessons learned from several existing browser-access approaches, then deliberately narrowed into a safer product boundary.

Key reference directions:

- [`eze-is/web-access`](https://github.com/eze-is/web-access)
  - taught the value of task-oriented routing and using stronger browser access only when simpler paths fail
- [`epiral/bb-browser`](https://github.com/epiral/bb-browser)
  - showed the value of isolated browser profiles, structured browser control, and richer browser operations
- [`teng-lin/agent-fetch`](https://github.com/teng-lin/agent-fetch)
  - demonstrated the usefulness of stronger HTTP impersonation and multi-strategy extraction between plain static fetch and full browser control

This repository does **not** copy those projects as-is.

Instead, it applies a different product choice:

- safer defaults
- explicit mode boundaries
- isolated profile only
- public-content-first support
- no formal logged-in browsing promise

That tradeoff means the capability ceiling is intentionally lower than some high-permission browser tools, while the default risk is also much lower.

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

## Known unavailable or deferred major sites

For clarity, the following major sites or page families are currently outside the formal support set, or were tested and then intentionally deferred:

- `x.com`
  - high-challenge / login-heavy behavior; not a formal first-version target
- `platform.openai.com`
  - challenge-heavy and OAuth-adjacent; not a formal first-version target
- `zhihu.com/question`
  - tested, but current public-path strategies did not produce stable usable content
- `reuters.com` article pages
  - tested, but current public-path strategies did not produce stable usable content

These examples are included to make the current boundary explicit.  
They are not “forgotten”; they are intentionally outside the present product promise.

## Security posture

The central design choice of this repository is simple:

- do not make high-risk browser power the default

Concretely, that means:

- default mode stays on lower-risk public-web paths
- advanced mode must be explicitly enabled
- browser work uses isolated profiles
- the user's daily browser profile is out of scope
- logged-in reading and OAuth are not part of the formal promise

For the full security rationale, see [SECURITY.md](SECURITY.md).  
For privacy and local-state rules, see [PRIVACY.md](PRIVACY.md).

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

### Codex

Current local alpha bootstrap:

```bash
bash scripts/install.sh
```

GitHub install shape:

```bash
npx skills add boyzcl/layered-web-access -a codex
```

### Claude Code

The same repository is designed to work with Claude Code through the same root `SKILL.md`.

Current local alpha bootstrap:

```bash
bash scripts/install.sh
```

GitHub install shape:

```bash
npx skills add boyzcl/layered-web-access -a claude-code
```

### Post-install checks

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

See also:

- [SUPPORT_MATRIX.md](SUPPORT_MATRIX.md)
- [SECURITY.md](SECURITY.md)
- [PRIVACY.md](PRIVACY.md)

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

Repository-shape check:

```bash
node tools/release/repo-ready-check.mjs --root .
node tools/release/export-check.mjs --root .
```

## Maintainer release flow

Maintainer-only release tools are kept under `tools/release/`.

Note:

- `node scripts/verify-release.mjs` creates local `runtime/` and `audit/` state as part of its checks.
- Clean local state before running export-clean or before publishing a standalone tree.

Before publishing this folder as a standalone repository:

```bash
bash tools/release/clean-local-state.sh --yes
node tools/release/export-check.mjs --root .
node tools/release/repo-publish-check.mjs --root .
```

Or export a clean snapshot without mutating the working release tree:

```bash
bash tools/release/export-standalone.sh
```

Or materialize a stable standalone repository candidate directory:

```bash
bash tools/release/materialize-standalone-repo.sh
```

Then initialize Git inside that standalone directory:

```bash
bash scripts/init-git-repo.sh /absolute/path/to/standalone-repo
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
