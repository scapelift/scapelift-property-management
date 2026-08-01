# Roadmap

## Before CMS work

1. Select and implement a replacement estimate-submission service.
2. Define ownership for domain, GitHub Pages, and form-delivery administration.
3. Audit gallery metadata, captions, alternative text, and unused assets.
4. Add a repeatable automated check for internal links, local assets, and JavaScript syntax.
5. Document rollback and content-approval responsibilities.

## Decap CMS integration

Phase 2 externalized company, service, and gallery content into JSON. Phase 3 adds the core CMS files and collection mappings. Before production editing is enabled:

- Confirm whether the remaining hardcoded Home Watch, trust-strip, approach, CTA, and On the Job content should also become editable.
- Define media-library paths and filename rules.
- Design content schemas for services, gallery entries, captions, and accessibility text.
- Provision the external GitHub OAuth proxy described in `docs/decap-cms-report.md` and validate authenticated editing.
- Preserve the current rendered appearance, URLs, navigation, and responsive behavior.
- Plan migration and rollback tests before changing production content sources.

## Later improvements

- Add lightweight accessibility and performance regression checks.
- Generate responsive image variants without changing gallery composition.
- Establish a documented preview workflow for content editors.
