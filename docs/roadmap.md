# Roadmap

## Before CMS work

1. Select and implement a replacement estimate-submission service.
2. Define ownership for domain, GitHub Pages, and form-delivery administration.
3. Audit gallery metadata, captions, alternative text, and unused assets.
4. Add a repeatable automated check for internal links, local assets, and JavaScript syntax.
5. Document rollback and content-approval responsibilities.

## Future Decap CMS migration

The Decap CMS migration has not started as part of this cleanup. Before implementation:

- Identify exactly which page content should become editable.
- Define media-library paths and filename rules.
- Design content schemas for services, gallery entries, captions, and accessibility text.
- Select and document the authentication approach supported by the production host.
- Preserve the current rendered appearance, URLs, navigation, and responsive behavior.
- Plan migration and rollback tests before changing production content sources.

## Later improvements

- Add lightweight accessibility and performance regression checks.
- Generate responsive image variants without changing gallery composition.
- Establish a documented preview workflow for content editors.
