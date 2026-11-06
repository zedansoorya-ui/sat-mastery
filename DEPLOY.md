# Putting SAT Mastery online

## The 60-second version

1. Go to **https://app.netlify.com/drop**
2. Drag this whole folder onto the page (or drag the `.zip` — Netlify unpacks it).
3. Wait about twenty seconds. You get a URL like `https://silly-name-123abc.netlify.app`.
4. Open it on your phone and add it to your home screen.

No account is needed for the first URL. Netlify will offer to claim the site — do that if you want the link to be permanent.

Nothing here needs a build step. It is plain files.

## What being hosted changes

| | Local file | Hosted |
|---|---|---|
| Open from any device | no | yes |
| Install to a phone home screen | no | yes |
| Works with no connection | yes | yes (after the first visit, via the service worker) |
| Auto-downloads new question packs | no | yes |
| Import packs from other sites | limited by CORS | proxy function included |

## Shipping new questions later

Progress lives in each visitor's browser, so content updates cost nobody their history.

1. Write a JSON file in the format shown under **Web sources -> See the format**. Multiple choice and grid-in questions are both supported.
2. Drop it into `packs/`.
3. Add an entry to `packs/index.json`. The build stamps each pack with a content hash as its version, so any change to the file produces a new version and clients pick it up.
4. Re-drop the folder on Netlify.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire application - questions, tests, lessons, engine. |
| `packs/index.json` | The catalogue the app checks at startup. |
| `packs/math-extra-01.json` | Extra Math questions, downloaded automatically. |
| `sw.js` | Service worker: caches the app for offline use. |
| `manifest.webmanifest`, `icon-*.png` | Makes it installable as an app. |
| `netlify/functions/fetch.js` | Optional CORS proxy for importing packs from other sites. Harmless if unused. |
| `netlify.toml`, `_redirects` | Cache headers and routing. |

## Other hosts

The site is static, so anything works. `netlify.toml` and `_redirects` are Netlify-specific and ignored elsewhere; only the proxy function is Netlify-shaped.

- **Cloudflare Pages** - connect a repo, or `wrangler pages deploy .`
- **GitHub Pages** - push the folder and enable Pages. It serves over HTTPS, which the service worker needs.
- **Vercel** - `vercel deploy` in this folder.

## Privacy

There is no database and no analytics. Every answer, score and setting stays in the visitor's own browser. Share the URL and each person gets their own separate copy of everything.
