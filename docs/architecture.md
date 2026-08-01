# Architecture

## Overview

ScapeLift Property Management is a framework-free static website. The browser receives authored HTML, CSS, JavaScript, and image assets directly; there is no compilation step, server-side application, database, or dependency manifest.

## Pages and responsibilities

- `index.html` contains the main marketing page, service sections, project galleries, navigation, and footer.
- `estimate.html` contains the estimate-request interface. Its presentation is production-ready, but submission is intentionally unavailable while a replacement form service is pending.
- `styles.css` provides shared branding, responsive layouts, component styling, and form presentation.
- `script.js` controls the mobile navigation, sticky-header state, reveal effects, footer year, and gallery lightbox.
- `estimate.js` controls estimate-form field validation, conditional service and photo inputs, and the temporary submission-unavailable message.
- `content/*.json` is the editable source for company identity, services, Finished Work, and Before & After content.
- `admin/` contains the Decap CMS Core entry point and collection configuration. Authentication requires an external GitHub OAuth proxy before the deployed editor can be used.
- `assets/` stores general site imagery; `assets/work/` stores gallery and project imagery.

## Runtime flow

The browser loads a page and the shared stylesheet, then runs the page’s scripts after the HTML. On the home page, `script.js` fetches the four JSON documents in parallel, builds the existing presentation elements, and then initializes reveal and lightbox behavior against the completed DOM. All navigation and asset paths are relative so the site can run locally or from a static host. Gallery interactions are client-side only.

Because browsers block `fetch()` from local `file://` pages, local development must use the static server documented in `README.md`.

The Estimate page currently performs client-side validation but makes no network request. This avoids presenting a broken submission path after retirement of the previous hosting-specific form integration.

## Design boundaries

- Preserve the static, dependency-free architecture until a change is deliberately approved.
- Keep content, visual styling, and behavior changes independently reviewable.
- Do not add hosting-specific form markup without documenting the service and deployment requirements.
- Treat a future CMS as an authoring layer; it should not unnecessarily alter the public site’s appearance or client-side behavior.
