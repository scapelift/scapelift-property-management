# ScapeLift Property Management — Final Client Handoff

## Project summary

| Item | Value |
|---|---|
| Project | ScapeLift Property Management |
| Repository | <https://github.com/scapelift/scapelift-property-management> |
| GitHub owner | `scapelift` |
| Netlify project | `scapelift-property-management` |
| Netlify production URL | <https://scapelift-property-management.netlify.app/> |
| Deployment method | GitHub → Netlify Continuous Deployment |
| Production branch | `main` |
| Website type | Static HTML, CSS, and JavaScript |
| Framework | None |
| Build system | None |
| Package manager | None |
| Database | None |
| Backend | None |

The repository is the source of truth. Netlify publishes the repository root directly, with no dependency installation or build command.

## Completed work

- [x] Production website recovered from the supplied live demo.
- [x] HTML preserved.
- [x] CSS preserved.
- [x] JavaScript preserved.
- [x] Branding preserved.
- [x] Images preserved.
- [x] Asset references verified.
- [x] Git repository initialized.
- [x] Original two-commit structure and subjects preserved.
- [x] Repository pushed to GitHub.
- [x] Git history rewritten so all published commits belong to the ScapeLift business account.
- [x] Personal developer identity removed from published Git history.
- [x] Netlify deployment configured.
- [x] Automatic deployments enabled through the GitHub connection.
- [x] Production Netlify deployment verified.

## Current status

| Item | Status |
|---|---|
| Repository | <https://github.com/scapelift/scapelift-property-management> |
| Repository owner | ScapeLift |
| Production branch | `main` |
| Hosting | Netlify |
| Deployment | Automatic from GitHub |
| Current deployment | Successful |
| Working tree at handoff | Clean before creation of these final handoff documents |
| Commit author and committer | `ScapeLift <307291071+scapelift@users.noreply.github.com>` |

The production Netlify URL returns HTTP 200 over HTTPS. Its HTML, CSS, and JavaScript were compared byte-for-byte with the repository, and all 22 referenced images returned HTTP 200.

## Remaining production tasks

1. Add `scapeliftpm.com` to the Netlify project's production domains.
2. At the authoritative DNS provider, enter the exact DNS records supplied by Netlify.
3. Wait for DNS propagation and Netlify domain verification.
4. Verify Netlify provisions a valid HTTPS certificate for both the apex and `www` hostnames.
5. Perform final live-site verification on `https://scapeliftpm.com` and its `www` redirect.

Do not guess Netlify IP addresses or targets. Copy the current values shown under **Netlify > Domain management**. Preserve unrelated MX and TXT records used for email or other services.

## Client editing guide

| Content | Location |
|---|---|
| Page wording and HTML structure | `index.html` |
| Colors, typography, spacing, and responsive layout | `styles.css` |
| Header scroll state, reveal effects, footer year, and gallery lightbox | `script.js` |
| Logos and hero images | `assets/` |
| Work-gallery images | `assets/work/` |

All paths are relative and case-sensitive when deployed. After any edit, check the page locally and verify the Netlify deploy preview before publishing.

## Complete project structure

```text
scapelift-property-management/
├── .gitignore
├── CREDENTIAL-HANDOFF.md
├── DEPLOYMENT-STATUS.md
├── DEPLOYMENT.md
├── FINAL-HANDOFF.md
├── README.md
├── index.html
├── netlify.toml
├── script.js
├── styles.css
└── assets/
    ├── hero-backyard.png
    ├── logo-house.png
    ├── logo-lockup.png
    ├── winter-scene.png
    └── work/
        ├── action-driveway-plow.jpg
        ├── action-plow.jpg
        ├── action-stump-haul.jpg
        ├── action-tree-ring-build.jpg
        ├── finished-deck-wall.jpg
        ├── finished-entry-beds.jpg
        ├── finished-front-bed.jpg
        ├── finished-lakefront-lawn.jpg
        ├── finished-shrub-trim.jpg
        ├── finished-side-yard.jpg
        ├── finished-stone-house-beds.jpg
        ├── finished-tree-ring.jpg
        ├── finished-walkway-entry.jpg
        ├── finished-walkway-plantings.jpg
        ├── finished-white-house-front.jpg
        ├── finished-wooded-patio-bed.jpg
        ├── pair-mulch-refresh.jpg
        └── pair-stump.jpg
```

## Deployment guide

### How deployment works

Netlify is connected to the GitHub repository and monitors `main`. A push to `main` starts a deployment. Because the site is static, Netlify runs no build command and publishes the repository root (`.`), as declared in `netlify.toml`.

### Publish future changes

1. Pull the latest `main` before editing.
2. Make only approved changes.
3. Open `index.html` locally and test the affected content and behavior.
4. Review `git diff` and confirm no unintended files changed.
5. Commit with a focused subject under the ScapeLift identity.
6. Push `main` to GitHub.
7. Watch the Netlify deployment until it reports **Published**.
8. Verify the production URL after deployment.

Example:

```sh
git switch main
git pull --ff-only origin main
git status
git add path/to/approved-file
git commit -m "Describe the approved change"
git push origin main
```

### Roll back using GitHub

Use `git revert` to create a traceable commit that reverses a bad change. Do not rewrite shared production history.

```sh
git switch main
git pull --ff-only origin main
git log --oneline
git revert <commit-hash>
git push origin main
```

Netlify automatically deploys the reverted state. For an urgent temporary rollback, Netlify can republish a previous successful deploy, but the corresponding GitHub revert should still be made so GitHub remains the source of truth.

### Update wording

1. Edit only the required text in `index.html`.
2. Do not change surrounding structure unless approved.
3. Preserve approved branding, phone number, service area, tagline, services, and natural-first messaging.
4. Test locally, commit, push, and verify the Netlify deployment.

### Update images

1. Put general images in `assets/` and work-gallery images in `assets/work/`.
2. To avoid layout changes, replace the existing file with the same filename and a compatible aspect ratio.
3. If the filename changes, update the matching `src` in `index.html` with the exact case-sensitive path.
4. Keep accurate alternative text.
5. Confirm the image loads; gallery images must also open and close correctly in the lightbox.
6. Commit the image and any associated HTML change together, push, and verify production.

## Project boundaries

Future developers must not do any of the following without explicit client approval:

- Convert the site to React.
- Convert the site to Vue.
- Convert the site to Angular.
- Add Tailwind CSS.
- Add Bootstrap.
- Add a backend or database.
- Add a build process, Node.js dependency, or package manager.
- Modify branding.
- Modify approved colors.
- Modify wording or business information.

The existing HTML, CSS, JavaScript, imagery, and content are the approved production version.

## Final verification checklist

- [x] GitHub repository is reachable.
- [x] Netlify production deployment is working.
- [x] Automatic GitHub-to-Netlify deployment is enabled.
- [x] Working tree was clean at the start of final handoff creation.
- [x] Published GitHub history contains the intended two-commit structure.
- [x] Business ownership and repository-local ScapeLift identity are established.
- [x] No personal developer identity remains in repository configuration or published Git history.
- [x] Netlify HTML, CSS, and JavaScript match the recovered production version.
- [x] All referenced images load successfully on Netlify.
- [ ] `scapeliftpm.com` DNS is connected and propagated.
- [ ] HTTPS and final behavior are verified on `scapeliftpm.com`.

See `DEPLOYMENT-STATUS.md` for the deployment snapshot and `CREDENTIAL-HANDOFF.md` for the password-free ownership-transfer template.

