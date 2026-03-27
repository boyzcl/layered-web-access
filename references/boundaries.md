# Boundaries

These boundaries are part of the product definition, not incidental implementation gaps.

## Not formally supported

- `x.com`
- `platform.openai.com`
- Google OAuth login flows
- logged-in reading as a product feature
- direct reuse of the user's daily browser profile

## Why these remain out of scope

- They depend on browser identity trust, not only navigation correctness.
- Success is often non-deterministic across sessions, profiles, and network environments.
- Supporting them well would push the product toward a much higher-risk default posture.

## Expected behavior when a boundary is hit

- classify the page as challenge, login wall, or unsupported
- avoid repeated blind retries
- explain the nearest supported alternative when one exists
- keep the product promise narrow and truthful

