# Prototype (superseded)

The original single-page version of upbss, committed 20 July 2026. Kept for
reference only — **the current site is in [`../main_files/`](../main_files/)**.

| File | |
|---|---|
| `index.html` | The whole page: hero, listings, enquiry form, FAQ, story |
| `style.css` | Standalone stylesheet, unrelated to the current design system |
| `script.js` | Mobile menu, testimonial carousel, listing filter, form validation |

Open `index.html` directly in a browser — no build step, no dependencies.

## Notes

`index.html` was previously named `index (1).html`, and for a while it did not
work at all: `script.js` had only ever been committed to GitHub and was missing
from the working folder, so every listing, filter and carousel on the page was
dead. The two are back together here.

The current build in `../main_files/` replaced this with a 17-page site, a
tokenised design system with a dark theme, and data-driven listings. Nothing
here is loaded by it — the two share no files.
