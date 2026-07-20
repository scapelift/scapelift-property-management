# ScapeLift Property Management Website

Static marketing website for ScapeLift Property Management, serving the Greater Lake Country Area.

The production site is plain HTML, CSS, and JavaScript. It has no framework, package manager, build process, backend, or database. Open `index.html` directly in a browser to run it locally.

## Folder structure

```text
.
├── index.html          Page content and structure
├── styles.css         Layout and brand styling
├── script.js          Header, reveal, footer year, and lightbox behavior
├── netlify.toml       Netlify publish configuration
├── DEPLOYMENT.md      Hosting, domain, and maintenance procedures
└── assets/
    ├── *.png          Logos and hero imagery
    └── work/          Before/after, finished-work, and action photos
```

## Editing

- Edit page wording and structure in `index.html`.
- Edit visual styles in `styles.css`.
- Edit browser behavior in `script.js`.
- Store general images in `assets/` and project-gallery images in `assets/work/`.
- Use relative paths such as `assets/example.jpg`; capitalization must match the filename exactly.
- Preserve the established branding and approved business information described in the project handoff.

After editing, open `index.html` locally and check navigation, responsive layouts, all images, telephone links, scroll reveals, and the gallery lightbox.

## Deployment

Netlify should import the GitHub repository and deploy the repository root. There is no build command. The included `netlify.toml` sets the publish directory to `.`.

1. Push changes to the production branch on GitHub.
2. Netlify detects the commit and publishes it automatically.
3. Confirm the deploy preview and production URL before considering the update complete.

See [DEPLOYMENT.md](DEPLOYMENT.md) for initial connection, reconnection, custom-domain, DNS, and content-update procedures.

## Hosting recommendation

Netlify is recommended because it supports this static site directly, provides automatic HTTPS, deploy previews, atomic deployments, and automatic deployment from GitHub without adding a build system. GitHub Pages, Cloudflare Pages, Vercel, or a conventional static web host are also compatible.

