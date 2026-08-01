# Content Externalization Report

## Scope

Phase 2 moves selected editable business content out of `index.html` and into JSON without beginning Decap CMS integration. The existing HTML elements and generated elements use the same classes, ordering, text, image paths, loading behavior, and accessibility descriptions as the previous static markup.

## JSON structure

### `content/company.json`

Stores company identity and visible homepage company information:

- company name, email, website, service area, and slogan
- hero image path and alternative text
- hero eyebrow, heading, tagline parts, description, button, and note

The tagline is represented as an ordered string array so JavaScript can preserve the styled dash separators without storing HTML in JSON.

### `content/services.json`

Stores the Services section eyebrow, heading, introduction, and an ordered `items` array. Each service contains a `title` and `description`.

### `content/gallery.json`

Stores the Our Work section heading content, Finished Work heading, and an ordered `items` array. Each gallery item contains `image`, `alt`, and `caption` fields.

### `content/before-after.json`

Stores the Before & After heading parts and an ordered `items` array. Each item contains `image`, `alt`, and `caption` fields.

## Files added

- `content/company.json`
- `content/services.json`
- `content/gallery.json`
- `content/before-after.json`
- `docs/content-externalization-report.md`

## Files modified

- `index.html`: replaced hardcoded company, service, Finished Work, and Before & After values with presentation targets while preserving section structure and CSS classes.
- `script.js`: added JSON loading, safe DOM rendering, and initialization sequencing so reveal and lightbox behavior attach after dynamic content exists.
- `README.md`: documented the content directory.
- `docs/architecture.md`: documented the runtime content-loading flow and local-server requirement.
- `docs/roadmap.md`: recorded the Phase 2 boundary and decisions needed before CMS integration.

## Rendering flow

1. The browser parses the structural HTML and loads `script.js` at the end of the page.
2. On the homepage, the script requests all four JSON documents in parallel.
3. Renderer functions populate existing presentation targets using DOM APIs and `textContent` rather than injecting HTML strings.
4. The script initializes the current year, header behavior, reveal animations, and gallery lightbox after content is present.
5. On the Estimate page, content loading is skipped and the existing shared page behavior initializes normally.

## Remaining hardcoded content

- navigation labels and URLs
- SEO metadata and LocalBusiness structured data
- trust-strip statements
- On the Job gallery
- Home Watch content
- Our Approach content
- final call-to-action wording
- Estimate page content and interface

These areas remain hardcoded deliberately because they are outside the Phase 2 sections or explicitly protected from change.

## Recommendations before Phase 3

1. Define JSON schemas and required-field rules before mapping files into Decap CMS collections.
2. Decide whether remaining homepage content should be externalized or remain developer-managed.
3. Define stable item identifiers if editors will reorder or reference gallery entries.
4. Add CMS validation for image paths, alternative text, captions, URLs, and non-empty service fields.
5. Confirm the GitHub Pages authentication and editorial-preview approach before adding Decap configuration.
6. Preserve ordered arrays because gallery order and service-card order affect the current layout.
7. Add a user-facing fallback strategy for content-fetch failures before editors depend on the JSON workflow.
