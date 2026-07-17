# AGENTS.md — Self-Care Health Platform

<!-- BEGIN:nextjs-agent-rules -->

## Version-matched Next.js rule

This is not assumed to be the Next.js known from training data. Before editing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` (or the pnpm-resolved equivalent) and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Mission

Build a production-oriented, Persian RTL self-care health platform. Optimize for clinical safety, privacy, security, traceability, accessibility, interoperability, and maintainability. Do not optimize for demo speed at the expense of these constraints.

## Product boundaries

The repository contains five user-facing surfaces: public, member, care team, admin, and health-provider company portal. Keep their navigation and authorization boundaries separate. Share design primitives and contracts, not page-level business logic.

## Architecture

- Start as a modular monolith with explicit bounded contexts.
- Use transactional outbox for domain events.
- Keep identity, consent, clinical records, content, workflow, AI, and audit separated.
- Use FHIR R4 through adapters; do not expose raw FHIR resources directly to UI components.
- Record ADRs for consequential decisions.
- Avoid adding infrastructure or distributed systems without a measured need.

## Clinical safety

- Never invent medical scoring, diagnostic rules, treatment, medication doses, contraindications, or emergency instructions.
- Clinical content and rules must have source, version, owner, approval status, validity dates, and provenance.
- Patient-entered data and provider-verified data must be visibly distinct.
- Provider-authored records are immutable to patients; patient corrections are separate requests or notes.
- LLM output cannot directly mutate a clinical record.
- High-risk topics use deterministic, approved escalation flows.
- Any unresolved clinical requirement goes into the assumption register and blocks the related production feature, not the rest of the repository.

## AI safety

- Retrieve only approved and currently valid knowledge.
- Minimize patient context; never send the full record by default.
- Do not log prompts or outputs containing sensitive health data.
- Separate read tools from write tools.
- Require explicit confirmation and policy checks before any write.
- Add regression evaluations for unsafe advice, diagnosis, prescribing, emergencies, self-harm, pregnancy risks, and medication changes.
- Maintain feature flags and a global kill switch.

## Security and privacy

- Use OIDC/OAuth2; do not implement custom authentication cryptography.
- Enforce authorization server-side on every request.
- Combine RBAC and ABAC using care relationship, organization, consent, proxy relationship, sensitivity, and purpose of use.
- Protect against IDOR/BOLA and test tenant/organization boundaries.
- Audit sensitive reads and all sensitive writes.
- Redact PHI/PII from logs, traces, metrics, errors, fixtures, screenshots, and test reports.
- Use synthetic data only.
- No secrets in source control.
- Follow OWASP ASVS Level 2 as baseline and document selected Level 3 controls.

## Data rules

- Store timestamps in UTC; localize only in presentation.
- Use stable UUIDs.
- Every clinical record carries source, author, organization, effective time, recorded time, verification, sensitivity, and provenance.
- Questionnaire responses are permanently bound to the exact questionnaire version.
- Use migrations; never modify production schema manually.
- Add indexes for foreign keys, access-policy predicates, timestamps, status columns, and geospatial queries when justified by query plans.

## Frontend

- Persian RTL is a first-class layout mode, not a CSS afterthought.
- Meet WCAG 2.2 AA.
- Support keyboard navigation, visible focus, screen readers, error summaries, reduced motion, low bandwidth, loading, empty, offline, denied, and failure states.
- Keep critical health information visually prioritized.
- Display provenance in understandable Persian labels.
- Do not use generic dashboard templates or excessive card grids.
- Keep components focused and reusable; do not build monolithic pages.

## Backend

- Validate all input at the boundary.
- Use explicit DTOs and OpenAPI.
- Keep domain logic out of controllers.
- Use idempotency for sensitive commands and external callbacks.
- Use an outbox for notifications and integration events.
- Apply timeouts, retries with backoff, circuit breakers, and dead-letter handling for external integrations.
- Never expose stack traces or internal identifiers to clients.

## Testing

For every feature:

- unit tests for domain and policy logic
- integration tests for persistence and authorization
- contract tests for external adapters
- e2e for critical journeys
- negative security tests
- accessibility checks for primary screens

Before completion run lint, type-check, unit, integration, and e2e tests. Report actual commands and results. Do not claim tests passed when they were not run.

## Working method

1. Inspect repository and relevant docs first.
2. Update assumptions and ADRs.
3. Make the smallest coherent vertical change.
4. Add tests in the same change.
5. Run checks and inspect the UI in desktop and mobile RTL.
6. Summarize changed files, risks, safety implications, tests, and limitations.

Do not proceed past a failed security or clinical-safety gate by hiding the failure behind TODO comments.
