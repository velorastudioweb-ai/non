# Blog editorial workflow

Blog content is persisted in `build/published-blogs.js` and published by the static build. This is the authorised Git-managed workflow selected for this site.

1. Edit or add an article object in the source file.
2. Keep patient-perspective material explicitly fictional and retain its disclosure.
3. Verify every clinical claim against the linked primary source; do not claim clinical review unless it occurred.
4. Run `npm run qa` and `node build/responsive-qa.js --quick --standard`.
5. Commit, review, and deploy through the authorised Git workflow.

To unpublish an article, remove it from the exported `articles` collection and add a redirect if an existing public URL must remain available. Scheduled publication requires the authorised deploy workflow to publish at the agreed time; this static site does not use browser storage as a content source.
