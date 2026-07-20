# Deployment and Maintenance

## Netlify configuration

- Source: GitHub repository
- Production branch: `main`
- Base directory: repository root (leave blank)
- Build command: leave blank
- Publish directory: `.`
- Functions directory: none
- Package installation: none

The repository's `netlify.toml` records the publish directory. Each push to `main` should trigger a production deployment automatically.

## Connect or reconnect Netlify to GitHub

1. Sign in to Netlify as the site owner.
2. Open **Add new project > Import an existing project**, or open the existing site's **Project configuration > Build & deploy > Continuous deployment**.
3. Select GitHub and authorize the Netlify GitHub App for the ScapeLift repository. If reconnecting, use **Manage repository** or **Link to a different repository**.
4. Select the repository and set the production branch to `main`.
5. Leave the build command blank and use `.` as the publish directory.
6. Save, trigger a deployment, and verify the published site.

If the repository is not listed, a GitHub organization owner may need to grant the Netlify GitHub App access under GitHub **Settings > Applications > Installed GitHub Apps > Netlify**.

## Reconnect GitHub locally

From the project directory, add or replace the GitHub remote using the repository URL shown by GitHub:

```sh
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

If `origin` already exists but points to the wrong repository:

```sh
git remote set-url origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Authenticate with GitHub when prompted. SSH repository URLs may be used instead if SSH keys are configured.

## Add or update scapeliftpm.com

1. In Netlify, open **Domain management > Production domains > Add a domain**.
2. Add `scapeliftpm.com`, then add or confirm `www.scapeliftpm.com` as an alias.
3. Choose the preferred primary domain and enable the automatic redirect from the other hostname.
4. At the domain registrar, enter the exact DNS values displayed by Netlify.
5. Wait for Netlify DNS verification and automatic TLS certificate provisioning.

For external DNS, Netlify normally requests:

- Apex (`scapeliftpm.com`): an `ALIAS`/`ANAME`/flattened CNAME to the assigned Netlify hostname when supported; otherwise Netlify's currently displayed apex A records.
- `www`: a CNAME to the assigned `*.netlify.app` hostname.

Do not copy example IP addresses into production. Netlify's domain panel is the authority for the current site-specific target values. Remove conflicting A, AAAA, or CNAME records for the same hostname, but preserve unrelated email records such as MX and TXT.

## Update text

1. Edit the relevant wording in `index.html` without changing the surrounding HTML structure unnecessarily.
2. Preserve approved branding, business information, phone number, service area, and natural-first wording.
3. Open `index.html` locally and inspect the affected section at desktop and mobile widths.
4. Commit and push the change to `main`; Netlify deploys it automatically.

## Update images

1. Place general images in `assets/` or gallery images in `assets/work/`.
2. Prefer replacing an image with the same filename and compatible aspect ratio when the layout should remain unchanged.
3. Otherwise update the matching `src` in `index.html`. Use an exact, case-sensitive relative path and keep meaningful `alt` text.
4. Verify the image appears on the page and, for work-gallery images, opens correctly in the lightbox.
5. Commit and push the image and HTML change together.

## Verification after every deployment

- Compare the deployed page visually with the approved version at desktop and mobile widths.
- Confirm `styles.css` and `script.js` return HTTP 200 responses.
- Confirm all files under `assets/` referenced by the HTML return HTTP 200 responses.
- Test header navigation, telephone links, scroll behavior, reveal animations, the current footer year, gallery opening, lightbox close button, backdrop close, and Escape-key close.
- Confirm HTTPS is valid on the Netlify URL and both custom-domain hostnames.
- Confirm no unapproved wording, business claims, services, or technology changes were introduced.

