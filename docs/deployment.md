# Deployment

## Current state

The production site is hosted with GitHub Pages at <https://scapeliftpm.com/>. The former Netlify deployment has been abandoned, and no Netlify configuration remains in this repository.

The site has no build process. Production consists of the committed HTML, CSS, JavaScript, and assets from the production branch.

## Release workflow

1. Create a topic branch from the latest `main`.
2. Make and locally validate a narrowly scoped change.
3. Review the diff for unintended content or asset changes.
4. Merge the reviewed work into `main` according to repository permissions.
5. Confirm GitHub Pages finishes publishing.
6. Verify <https://scapeliftpm.com/> and <https://scapeliftpm.com/estimate.html> over HTTPS.

## Post-deployment checks

- Load the home and Estimate pages without console errors.
- Test desktop and mobile navigation.
- Confirm section links and the gallery lightbox work.
- Confirm all local images, scripts, and styles return successfully.
- Check that the Estimate page clearly reports that online requests are temporarily unavailable.

## Estimate submissions

The Estimate page currently preserves its interface and validation but does not submit customer information. A replacement submission solution must be selected, secured, tested, and documented before network submission is enabled again. It should support spam prevention, file validation, delivery monitoring, and a clear success/failure response.
