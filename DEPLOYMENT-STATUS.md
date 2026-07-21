# ScapeLift Property Management — Deployment Status

## Production snapshot

| Item | Current value |
|---|---|
| Repository | <https://github.com/scapelift/scapelift-property-management> |
| GitHub owner | `scapelift` |
| Production branch | `main` |
| Hosting provider | Netlify |
| Netlify project | `scapelift-property-management` |
| Netlify URL | <https://scapelift-property-management.netlify.app/> |
| Deployment method | GitHub → Netlify Continuous Deployment |
| Build command | None |
| Publish directory | `.` |
| Current deployment | Successful |
| Deployment response | HTTP 200 over HTTPS |
| Custom domain | `scapeliftpm.com` — pending connection and DNS |

## Verified state

- GitHub `main` is the production source branch.
- Netlify serves the static repository without a framework or build process.
- The deployed `index.html`, `styles.css`, and `script.js` match the repository byte-for-byte.
- All 22 referenced image assets return HTTP 200 from Netlify.
- The published Git history contains two commits authored and committed by `ScapeLift <307291071+scapelift@users.noreply.github.com>`.
- No personal developer identity appears in reachable published commit metadata.
- The repository working tree was clean immediately before the three final handoff documents were created.

## Continuous deployment configuration

Netlify is configured to deploy from GitHub using:

```text
Repository:        scapelift/scapelift-property-management
Production branch: main
Base directory:    repository root
Build command:     none
Publish directory: .
```

Every push to `main` should start a production deployment. Confirm each deployment reaches the **Published** state in Netlify and verify the production URL after it completes.

## Remaining domain launch work

1. Add `scapeliftpm.com` under **Netlify > Domain management > Production domains**.
2. Add or confirm `www.scapeliftpm.com` and select the preferred primary hostname.
3. Copy Netlify's site-specific DNS targets into the authoritative DNS provider.
4. Preserve unrelated email and verification records.
5. Wait for DNS propagation and Netlify verification.
6. Confirm Netlify provisions HTTPS for both hostnames.
7. Confirm the non-primary hostname redirects to the primary hostname.
8. Compare the custom-domain site with the verified Netlify URL on desktop and mobile.

## Final custom-domain checks

- [ ] `scapeliftpm.com` resolves to Netlify.
- [ ] `www.scapeliftpm.com` resolves and redirects as intended.
- [ ] HTTPS certificates are valid with no browser warning.
- [ ] HTTP redirects to HTTPS.
- [ ] Navigation anchors work.
- [ ] Telephone links use `(262) 853-2381`.
- [ ] Scroll effects and reveal animations work.
- [ ] Every work-gallery image opens in the lightbox.
- [ ] Lightbox closes by button, backdrop, and Escape key.
- [ ] Images and Google Fonts load without browser-console errors.
- [ ] Branding and wording match the approved production version.

## Incident and rollback procedure

If a deployment is incorrect:

1. Identify the problematic commit in GitHub.
2. Revert it on `main` with `git revert <commit-hash>`.
3. Push the revert to GitHub.
4. Confirm Netlify publishes the reverted state.
5. Verify the production and custom-domain URLs.

Avoid force-pushing normal production changes. History rewriting was used only for the authorized initial identity cleanup and is not the standard rollback process.

