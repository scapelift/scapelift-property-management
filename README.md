# ScapeLift Property Management Website

Static marketing website for ScapeLift Property Management. The site presents the company’s property-care services, project gallery, seasonal home-watch offering, and estimate-request interface.

The project uses plain HTML, CSS, and JavaScript. It has no framework, package manager, build step, application backend, or database.

## Local development

The pages can be opened directly in a browser, but a local static server more closely matches production behavior:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000/>. Before committing, check both pages at desktop and mobile widths, exercise the navigation and gallery lightbox, and confirm that every image loads.

## Repository structure

```text
.
├── index.html              Main marketing page
├── estimate.html           Estimate-request interface
├── styles.css              Shared layout and visual styles
├── script.js               Header, reveal, footer, and lightbox behavior
├── estimate.js             Estimate-form UI and client-side validation
├── content/                Editable business content in JSON
│   ├── company.json
│   ├── services.json
│   ├── gallery.json
│   └── before-after.json
├── assets/                 Logos, feature imagery, and gallery photos
│   └── work/               Project and activity gallery assets
└── docs/
    ├── architecture.md     Technical structure and design boundaries
    ├── content-externalization-report.md
    ├── deployment.md       Current GitHub Pages deployment process
    ├── roadmap.md          Deferred work and migration sequence
    └── repository-cleanup-report.md
```

Use relative, case-sensitive asset paths. General site images belong in `assets/`; portfolio and project imagery belongs in `assets/work/`.

## Git workflow

- `main` is the production branch.
- Use a dedicated topic branch for each change and keep commits narrowly scoped.
- Test locally before requesting review or merging.
- Merge reviewed changes into `main`; do not force-push shared branches.
- The existing `decap-cms` branch is reserved for future CMS preparation. This cleanup does not begin that migration.

## Deployment status

The website is currently served as a static site through GitHub Pages at <https://scapeliftpm.com/>. The former Netlify deployment and configuration have been retired.

There is no build command or generated output: GitHub Pages serves the repository’s static files. The Estimate page remains available, but online submission is temporarily disabled until a replacement form-handling service is selected and implemented. See [docs/deployment.md](docs/deployment.md) for release verification and [docs/roadmap.md](docs/roadmap.md) for planned work.
