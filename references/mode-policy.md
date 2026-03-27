# Mode Policy

## Default mode

Use default mode when:

- the target is public content
- the URL is known or can be discovered through search
- static HTML or a site-specific extractor is likely enough
- no rendering-dependent interaction is required

Preferred order:

1. host-native web search
2. static fetch
3. site-specific extractor

Dependency rule:

- do not treat ad hoc dependency installation by the agent as the normal success path
- prefer already-ready local capabilities

## Advanced mode

Use advanced mode only when all of the following are true:

- the user has explicitly enabled advanced mode for the current session
- the target is still public content
- rendering or light interaction is necessary
- there is a plausible reason the browser path will add value

Advanced mode is for:

- public SPA pages
- public pages with client-side rendering
- limited scrolling, clicking, and DOM inspection

Dependency rule:

- guided dependency preparation is allowed here
- if local browser prerequisites are missing, use the product's explicit preparation entrypoints instead of improvising

Advanced mode is not for:

- login-required reading
- OAuth
- high-challenge identity-sensitive sites as a formal promise

## Escalation rule

If a lower mode can finish the task, do not escalate.

If no supported mode can finish the task, report the boundary instead of improvising a new product promise.
