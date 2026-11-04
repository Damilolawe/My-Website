# On-demand desktop preview screenshots

Use the same GitHub Actions + Playwright setup as mobile QA. The desktop workflow does not need Work mode or a local browser.

- Trigger: update `qa/desktop-request.json` on `main` with a new `requestId` and `sites` set to `"all"`, one slug, or an array of slugs; alternatively dispatch **Desktop preview visual QA** and enter comma-separated slugs.
- Screenshots: the workflow captures both a full-page and an above-the-fold viewport PNG for each selected site at **1440×900** and **1920×1080**.
- Review: fetch images from the `desktop-qa-screenshots` branch under `screenshots/`, named `<slug>-desktop-1440.png`, `<slug>-desktop-1440-viewport.png`, etc. The Actions run also provides `desktop-preview-screenshots` as a downloadable artifact for 14 days.
- Automatic capture: runs on `preview/**` changes to `main` and on script/workflow/request changes.
- Diagnostics: layout overflow, clipped text, broken images, HTTP errors, plus moving-banner tests for selected animation-heavy previews. A failed audit does **not** prevent screenshots from being uploaded or published.
- Mobile QA is unchanged: use `qa/mobile-request.json` and the `mobile-qa-screenshots` branch.

When ChatGPT is asked to check desktop appearance, it should update the request JSON through the GitHub connection, inspect the run and resulting screenshots, then make any necessary source fixes. Never conclude that the site looks good purely because the workflow ran: review actual screenshots and diagnostics. The screenshot workflow does not itself deploy website changes.
