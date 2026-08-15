# upbss

A demo property marketplace for **upbss.com** — search listings, request a free
appraisal, submit an enquiry. Built for the Austrian market: euro pricing,
`de-AT` number formatting, and listings across Linz, Vienna, Graz, Salzburg and
six other cities.

**This is a demo, not a live site.** All content is placeholder pending real
data. See [Known gaps](#known-gaps) before showing it to anyone.

## What's in here

There are three builds of the same site. Only one is current.

| | | |
|---|---|---|
| [`main_files/`](main_files/) | **Current build** | 17 pages, static, no backend wired up |
| [`zoha-supabase.zip`](zoha-supabase.zip) | Supabase variant | Same site, reads listings and writes leads to Postgres |
| [`prototype/`](prototype/) | Superseded | The original single-page version, July 2026 |

[`project (1).docx`](<project (1).docx>) is the client brief.
[`zoha-supabase-schema.sql`](zoha-supabase-schema.sql) is the schema for the
Supabase variant.

## Running it

Static HTML with no build step and no dependencies. Open
[`main_files/index.html`](main_files/index.html) in a browser and it works.

A local server is only needed if you want clean URLs or to avoid `file://`
quirks:

```bash
npx serve main_files
```

## How the current build works

Six JavaScript modules on a single `window.UPBSS` namespace, loaded per page —
no framework, no bundler:

| Module | Role |
|---|---|
| `data.js` | All site content: 20 listings, 9 sold, 18 FAQs, 6 guides, testimonials, valuation multipliers |
| `main.js` | Shared behaviour: icons, theme toggle, nav, carousel, scroll reveal, form validation |
| `listings.js` | Featured grid, search with filters/sort/pagination, sold archive |
| `property.js` | Single property view (`property.html?ref=UP2291`) |
| `appraisal.js` | Three-step instant valuation wizard |
| `content.js` | FAQ accordion and guide rendering |

A few things worth knowing:

- **Listings have no photographs.** `UPBSS.propertyScene()` in `main.js`
  generates a deterministic SVG illustration from each listing's `scene` and
  `seed`, so no card ever renders a broken image. Swap it for `<img>` when real
  photography arrives.
- **The appraisal figure is deliberately blunt** — area × sector rate ×
  location factor × condition factor. It is a lead-generation estimate, and
  the UI says so. Extreme or out-of-area inputs are routed to a human instead.
- **Design system** lives in `assets/css/style.css` (~1,500 lines), tokenised
  and layered: tokens, reset, primitives, layout, components, pages. Navy /
  paper / amber, with a dark theme that follows the OS and can be overridden.
  The choice is stored in `localStorage` and applied before first paint.

## Data

Everything is hard-coded in `assets/js/data.js`. It is shaped to match the
Supabase schema, so switching to live data means replacing the arrays with a
`fetch()` and changing nothing else.

## Known gaps

Carried deliberately — this is a demo awaiting real data.

- **Forms work, but only from a real host.** The contact form, viewing request
  and appraisal wizard all post through `UP.submitLead()` in `main.js` to
  `api/enquiry.php` on the same server, which emails
  `customerservice@upbss.com`. They cannot work from `file://` — a page opened
  from disk has no origin, so the request is refused. Serve over `http://` to
  test. Verified working on the live site.
- **No SSL certificate.** The site serves a self-signed certificate, so
  browsers warn. 123reg appear to have disabled cPanel AutoSSL in favour of a
  paid product; free alternatives are Let's Encrypt via their support, or
  Cloudflare. Must be resolved before real customers use the forms.
- **Mail routing is worth checking.** The MX records for upbss.com point at
  GoDaddy (`smtp.secureserver.net`), not the cPanel server, so mail addressed
  to the domain does not necessarily reach the cPanel mailbox. If enquiries
  stop arriving, that is the first thing to look at — cPanel → Email Routing.
- **The Supabase variant ships with empty credentials.** `SUPABASE_URL` and
  `SUPABASE_ANON_KEY` are blank, so it falls back to the static arrays. It is
  otherwise complete: listings load from Postgres, and the enquiry and
  appraisal forms insert real rows.
- **Company details are placeholders.** 23 bracketed fields across the legal
  pages — `[SC company number]`, `[registered office address]`,
  `[redress scheme]`, VAT, ICO and HMRC numbers. Social links are still `#`.
- **Listing photography is stock.** All 30 images are Pexels placeholders. They
  must be replaced with the seller's own photographs before any real listing is
  published: showing a different building is a misleading action under the
  Consumer Protection from Unfair Trading Regulations 2008. See
  `main_files/assets/img/CREDITS.md`.
- **Legal pages are drafts.** Privacy, terms, cookies, complaints and
  accessibility all carry a visible banner saying they need a lawyer's review.
  Do not go live on them.

### Hosting and the back end

The client has hosting on 123reg with cPanel, and the domain is **upbss.com**.
cPanel means Apache and PHP, which changes the sensible answer for the forms:
a PHP handler on the same server is unlimited, costs nothing extra, sends from
`customerservice@upbss.com` rather than a third party, and removes a data
processor from the privacy policy. Switching to it is two lines in `main.js`:

```js
provider: 'custom',
endpoint: '/api/enquiry.php',
```

Deploy note: upload the **contents** of `main_files/` into `public_html/`, not
the folder itself, or the site lands at `upbss.com/main_files/`.

Still to settle: the brief specifies **MS SQL**, while the only working schema
is **PostgreSQL** (Supabase), using Postgres-specific features — `text[]`,
`generated always as identity`, row-level security. Standard cPanel hosting
offers MySQL/MariaDB rather than either, so whichever way this goes the schema
needs porting. Worth agreeing before more is built on it.

## Repository layout

```
├── main_files/               current build
│   ├── assets/css/style.css  design system
│   ├── assets/js/            six modules
│   └── *.html                17 pages
├── prototype/                superseded July build
├── project (1).docx          client brief
├── zoha-supabase-schema.sql  Postgres schema + RLS + seed data
└── zoha-supabase.zip         Supabase-wired variant
```

`main_files.zip` is intentionally untracked — it was a byte-identical archive
of `main_files/`. The Supabase variant stays zipped because it holds the only
copy of `supabase-client.js`; unpacking it into the tree is the obvious next
tidy-up if that build becomes the one to carry forward.
