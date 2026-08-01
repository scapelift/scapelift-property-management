# Repository Cleanup Report

## Scope

This cleanup removes obsolete client-delivery material and the abandoned Netlify integration, refreshes project documentation, and leaves the website’s presentation intact. It does not begin the Decap CMS migration.

## Files removed

| File | Reason |
|---|---|
| Three superseded client-delivery artifacts | Removed because their transfer instructions and project snapshot were obsolete. |
| `DEPLOYMENT.md` | Netlify-specific deployment guide superseded by `docs/deployment.md`. |
| `DEPLOYMENT-STATUS.md` | Stale Netlify deployment-status snapshot. |
| `netlify.toml` | Retired Netlify configuration. |

## Files modified

| File | Change and rationale |
|---|---|
| `README.md` | Rewritten to document the current project, local development, repository structure, Git workflow, and GitHub Pages deployment. |
| `estimate.html` | Removed retired Netlify form attributes, hidden metadata, and honeypot markup while retaining the complete Estimate page interface. |
| `estimate.js` | Removed the dead Netlify request and response flow. Validation remains, and valid submission attempts now receive a clear temporary-unavailable message without a failed network request. |
| `styles.css` | Removed styling used exclusively by the deleted Netlify honeypot field. |

## Files added

| File | Purpose |
|---|---|
| `docs/architecture.md` | Records the static architecture, runtime responsibilities, and boundaries for future changes. |
| `docs/deployment.md` | Documents the current GitHub Pages release and verification workflow. |
| `docs/roadmap.md` | Lists prerequisites and safeguards for later Estimate and Decap CMS work. |
| `docs/repository-cleanup-report.md` | Provides an auditable summary of this cleanup. |

## Remaining technical debt

- Online estimate submission is intentionally unavailable pending a replacement service.
- The repository has no automated link, asset, accessibility, or browser regression tests.
- Image sizing and compression are managed manually.
- Gallery captions and alternative text require periodic editorial review as images change.
- Potentially unused image assets should be audited with stakeholder confirmation before deletion.

## Recommendations before Decap CMS migration

1. Restore estimate delivery through a host-independent, monitored solution.
2. Define editable content boundaries and approval ownership before creating CMS schemas.
3. Audit media, captions, and alternative text so the CMS starts from clean source data.
4. Add automated validation for generated content, internal paths, and required fields.
5. Confirm the authentication and preview strategy works with GitHub Pages before touching production templates.
6. Capture a visual baseline and rollback procedure to ensure the migration does not change the public design.
