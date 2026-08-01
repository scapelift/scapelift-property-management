# Decap CMS Core Integration Report

## Scope

Phase 3 adds the Decap CMS administration surface and maps the four Phase 2 JSON documents into editable file collections. It does not change the public website templates, styles, runtime content renderer, URLs, navigation, footer, or Estimate page.

## Files added

- `admin/index.html`: static `/admin/` entry point loading Decap CMS Core 3.11.0 from jsDelivr.
- `admin/config.yml`: GitHub backend, media settings, and JSON file collections.
- `assets/images/.gitkeep`: establishes the upload directory without moving existing assets.
- `docs/decap-cms-report.md`: records configuration and remaining setup.

## Files modified

- `README.md`: adds the CMS administration files to the repository map.
- `docs/architecture.md`: records the CMS layer and authentication boundary.
- `docs/roadmap.md`: updates the current phase and remaining production prerequisites.

No public website files were modified.

## Collection configuration

The CMS uses four separate file collections with explicit `format: json` configuration:

| CMS collection | Source file | Editable structure |
|---|---|---|
| Company Information | `content/company.json` | Identity, contact details, service area, slogan, and nested hero content |
| Services | `content/services.json` | Section labels and ordered service items |
| Finished Work Gallery | `content/gallery.json` | Section labels and ordered image, alternative-text, and caption entries |
| Before & After Gallery | `content/before-after.json` | Heading labels and ordered image, alternative-text, and caption entries |

Field names match the JSON keys exactly so saving an entry preserves the data shape consumed by `script.js`. Ordered list widgets preserve the visible service and gallery order.

## Media configuration

- Repository upload directory: `assets/images`
- Published path prefix: `/assets/images`

No existing images were moved, renamed, or changed. Current content continues to reference its existing paths under `assets/` and `assets/work/`. Newly uploaded CMS media will be committed under `assets/images/` and stored in JSON with the published `/assets/images/...` path.

## GitHub backend

The backend is configured for `scapelift/scapelift-property-management` and the production `main` branch. CMS users must have appropriate repository write access. No Netlify Identity or Git Gateway configuration is present.

## Authentication requirements

GitHub does not allow a static GitHub Pages site to exchange an OAuth authorization code securely by itself. A trusted external OAuth proxy is required because the GitHub OAuth client secret must never be exposed in this repository or browser-delivered JavaScript.

The repository intentionally does not specify `backend.base_url` yet because no OAuth proxy hostname has been selected or provisioned. Authentication and authenticated collection loading cannot be completed until the following manual setup is finished.

## Remaining manual setup

1. Select and deploy a trusted Decap-compatible GitHub OAuth proxy on an external server or edge-worker platform. It must provide `/auth` and `/callback` endpoints.
2. Create a GitHub OAuth App owned by the appropriate ScapeLift GitHub account or organization.
3. Set the OAuth App homepage to `https://scapeliftpm.com/admin/` and its authorization callback URL to `https://<oauth-proxy-host>/callback`.
4. Store the GitHub OAuth client ID and client secret only in the proxy’s protected environment configuration.
5. Add the real proxy origin to `admin/config.yml` as `backend.base_url`. Add `backend.auth_endpoint: auth` only if the selected proxy requires it explicitly.
6. Merge and deploy the reviewed integration so `/admin/` and all four content files exist on the configured `main` branch.
7. Give each approved editor sufficient GitHub repository access, then test login, collection reads, image previews, media upload, content save, and production rendering.
8. Confirm branch-protection rules are compatible with the desired CMS publishing workflow before allowing production edits.

No proxy URL, OAuth credentials, or authentication workaround has been invented or committed.

## Validation status

- The admin entry point, CDN asset URL, YAML syntax, collection definitions, JSON field mappings, and media paths can be validated locally without credentials.
- Existing content and image references can be verified directly against the configured file and field definitions.
- A complete authenticated `/admin/` session and save operation remain blocked by the required external OAuth setup described above.
