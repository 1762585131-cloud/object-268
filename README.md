# Object-268 — personal site

A small, hand-written four-page personal site. No framework, no build step, no tracking.

The layout is **inspired by** the simple, hand-coded structure of `hannove-cn.github.io/My-site/`. All text, design decisions and the hero SVG here are original; no text or images were copied from that site.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: hero, three entry cards, useless joystick, "Now" strip |
| `notes.html` | Six quotes with sources; "Pick a note" button |
| `projects.html` | Four project ideas and a short process list |
| `about.html` | About, tools, learning list, contact |
| `404.html` | Friendly not-found page |

### The useless joystick

On the homepage. Drag it with a mouse or finger, or focus it and use the arrow keys. It springs back and reports what happened — which is always nothing. It has no other function, by design.

Shared files:

- `style.css` — one external stylesheet for every page
- `site.js` — mobile navigation, current year, random note
- `assets/hero.svg` — original SVG hero illustration
- `assets/favicon.svg` — tab icon

## Preview locally

From this folder:

```bash
python -m http.server 4174
```

Open `http://127.0.0.1:4174/`.

Do **not** open the HTML by double-clicking if you want to test the full site; a local server is closer to the real thing.

## Personalise it

1. **Name** — search for `Object-268` and replace it with your name or handle in all pages.
2. **Email** — in `about.html`, replace `hello@object-268.example` with your real address.
3. **GitHub** — in `about.html`, replace `https://github.com/` with your profile URL.
4. **Projects** — edit the four `<article class="project">` blocks in `projects.html`.
5. **Notes** — edit or remove `<article class="note">` blocks in `notes.html`.
6. **Hero** — replace `assets/hero.svg` with your own image, or edit the SVG.
7. **Year** — the footer updates automatically with JavaScript; the static fallback says 2026.

## Publish with GitHub Pages

1. Create a repository, for example `my-site`.
2. Put these files at the **root** of the repository (not inside another folder).
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add personal site"
   git push
   ```
4. On GitHub: **Settings → Pages → Build and deployment**.
5. Source: **Deploy from a branch**; branch: `main`; folder: `/ (root)`; save.
6. The site appears at `https://<username>.github.io/<repository>/`.

For a user site at `https://<username>.github.io/`, name the repository `<username>.github.io`.

## Notes for the WebTech project

This site deliberately practices the things in the written exam:

- semantic HTML: `header`, `nav`, `main`, `footer`, `article`, `section`, headings in order
- one external stylesheet; no inline styles
- classes for repeated cards, an id for the footer
- relative paths and lowercase file names
- `alt` text on the hero image
- labelled navigation, skip link, visible focus, `aria-current="page"`
- a mobile menu that works without a framework
- a no-JavaScript fallback for navigation
- responsive layout at phone width
- reduced-motion support

## Browser support

Current Chrome, Edge, Firefox and Safari. The layout uses CSS Grid, Flexbox, custom properties and `clamp()`.

## Credit

- Structure inspiration: [Hannove — My-site](https://hannove-cn.github.io/My-site/)
- Type: Georgia + system UI
- Hero and favicon: original SVG, made for this site
