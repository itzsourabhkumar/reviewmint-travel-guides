# ReviewMint — Vanilla HTML/CSS/JS Port

A no-build, framework-free port of the ReviewMint travel-guide site. Same template, same features as the React version in `src/`, but written using only HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — static shell (nav, footer, modal/toast mounts)
- `styles.css` — hand-rolled CSS that mirrors the dark/mint design, fully responsive
- `app.js` — destinations data, view router, all renderers, event delegation
- `README.md` — this file

No `node_modules`. No build step. No dependencies fetched at runtime except the Google Fonts stylesheet (`Plus Jakarta Sans`).

## Features ported

- Top nav with **Destinations / Persona Guides / About / LOGIN** routing
- Mobile search icon focuses the hero search
- Hero search bar — submit on Enter or icon click
- 8-option **personality filter** (filters home grid)
- Seven destinations: Agra, Varanasi, Jaipur, Delhi, Udaipur, Rishikesh, Goa
- Full **city detail** page: hero card, getting-there list, survival tips, 24h timeline (with persona dimming), Mint Score gauge (animated needle), Trip ROI matrix bars, pros/cons split, blueprint budget tiers, must-try bites
- **Persona Guides** page — pick a persona, see matching cities
- **About** page — stats, pillars, CTA
- **Search** results page with live refine input
- **Info** pages for: How it Works, Mint Scoring, Careers, Travel Tribes, Ambassadors, Support, Privacy, Terms, Cookies
- Footer with all links wired
- **Newsletter** Join — validates email, toast confirmation
- **Login modal** (demo) — opens on LOGIN click, closes on backdrop click / X / Escape
- **Toast** notification system (auto-dismiss 2.8s)

## Running

This is a static site. You can:

**Option 1 — open the file directly:**
```
open vanilla/index.html      # macOS
start vanilla/index.html     # Windows
xdg-open vanilla/index.html  # Linux
```

**Option 2 — serve via any static server:**
```
# Using Node (one-off)
npx serve vanilla

# Using Python
cd vanilla && python -m http.server 8000

# Then visit:
http://localhost:8000
```

## Deployment

This folder can be uploaded to any static host as-is:
- **Vercel / Netlify / Cloudflare Pages** — drag-and-drop `vanilla/` or point to it as the publish directory
- **GitHub Pages** — push to `gh-pages` branch with `vanilla/` as the root, or configure Pages to serve from `/vanilla`
- **Plain S3 / nginx** — copy the three files

Because there is no build step, what you see is what gets served.
