# SAT Mastery

Free, open-source SAT practice platform: adaptive practice, full-length mock tests, mastery analytics and a study planner. No server, no database, no analytics. Everything lives in your browser.

## Run it

It is plain HTML, CSS and JavaScript with no build step.

```sh
git clone https://github.com/zedansoorya-ui/sat-mastery.git
cd sat-mastery
python3 -m http.server 8080    # then open http://localhost:8080
```

You can also open `index.html` directly, but the service worker, content packs and Web sources only work over `http(s)`. To host it, drag the folder onto https://app.netlify.com/drop (see `DEPLOY.md`) or enable GitHub Pages.

## What's inside

| | |
|---|---|
| Original practice questions | 3,572 (3,218 Math · 354 Reading & Writing) |
| Full-length adaptive mock tests | 10 built in, plus unlimited generated |
| Lessons with worked examples | 54 |
| Vocabulary entries | 594, including 81 at the hardest tier |
| Spaced-repetition flashcards | 599 |
| Student-produced response (grid-in) questions | 1,049 — about the share the real test carries |
| Questions at the top two hardness tiers | 2,421 |
| Skills tracked individually | 30 (the full digital SAT taxonomy) |
| Extra questions in the hosted content pack | 260, including 49 grid-ins (downloaded automatically) |

## First 10 minutes

1. Enter a name, target score and test date.
2. Take the 20-question diagnostic from the dashboard.
3. Open **Study plan** → Generate. The planner builds a week-by-week schedule from your test date and available hours, then reprioritises it as your mastery changes.
4. Ask **SAT Coach** "what am I weakest at?" — it answers from your actual attempt history, with the numbers.

## How the engine works

- **Mastery (0–100 per skill)** — recency-weighted, difficulty-adjusted accuracy, shrunk toward 50 where you have few attempts, so one lucky question doesn't declare you strong.
- **Adaptive selection** — ranks every candidate question by your weakness in that skill, how well its difficulty fits your current level, whether the skill is under-sampled, and how recently you saw it.
- **Mock routing** — Module 1 performance decides whether Module 2 is the lower or upper form, exactly as the digital SAT does. You need 60% on Reading & Writing Module 1 or 55% on Math Module 1 to earn the higher-difficulty form. A screen between the modules tells you which one you got and why; the real test does not, so you can switch that screen off in your profile for a truer simulation.
- **The two forms are genuinely different.** Ace Module 1 and the second module arrives with 14–16 hard questions and no easy ones. Struggle and it arrives with 2–4 hard and 9–12 easy. The upper form is the only route to the top of the scale; the lower form caps it — which is exactly how the real thing behaves.
- **Question order follows the real test** — Reading questions before Writing ones, multiple choice before grid-ins.
- **The hard module changes its question mix, not just its difficulty.** Published analysis of the hardest official practice papers counts only about a quarter of the hard module's questions coming from the accessible types — vocabulary, grammar, transitions — against roughly half in an easier form. This app matches that: the upper form drops to 20% and fills the space with inference, command of evidence, text structure and cross-text pairs.
- **Hard Math is word-dense.** Real hard questions make you build the model before any algebra starts. The upper Math module now runs a median of 54 words per question with 64% full scenarios, against 33 words and 9% before.
- **Two scoring curves.** The published papers do not all score alike. Choose the strict curve when starting a mock and a wrong answer near the top of the range costs about 10 scaled points rather than 7 or 8, matching the harshest official papers. Same questions either way — it changes only what errors cost.
- **Score estimate** — blends practice mastery with your most recent mock, weighted by how recent that mock is, and reports a confidence band rather than a single number.

## What hosting adds

Open the URL on a phone and it installs to the home screen. After the first visit a service worker caches the whole app, so it keeps working on a train with no signal.

Three things only work on the hosted version, under **Web sources**:

- **Content packs.** The app checks `packs/index.json` on its own server at startup and downloads any question pack it does not have. Ship new questions by dropping a file in `packs/` and re-deploying — nobody loses progress.
- **Passage studio.** Pulls a live Wikipedia article and builds practice from it: a words-in-context item using a word from the study list as it appears in real academic prose, and a main-idea item whose wrong answers come from neighbouring articles in the same field. Every item carries attribution and the CC BY-SA 4.0 licence, and is labelled as machine-generated — these are not up to the standard of the 1,725 authored questions.
- **Import from a URL.** Fetches a JSON question pack from anywhere. It tries a direct request, then the site's own proxy function, then a proxy you supply.

## Grid-ins

About a quarter of real SAT Math is typed rather than chosen, and the entry rules cost people points. The app enforces the real ones: fractions and decimals both accepted and treated as equal, at least four characters for a repeating decimal, no mixed numbers, no units, no percent signs, no commas. It shows you how your entry will be read as you type.

## Honest limits

- Scores are this platform's own estimate. They are **not** official College Board scores and will differ from them.
- All questions, passages and explanations are original. No College Board material is reproduced.
- The coach and the "explain differently" feature are rule-based analysts running offline over your own data, not a live language model — the file has no server to call one.
- Web-built items are machine-generated from live text and are not hand-reviewed. They are labelled as such everywhere and can be deleted in Admin.
- Real SAT questions are College Board copyright and must not be imported. The web sources here are Wikipedia (CC BY-SA) and packs you own.

## Keyboard

`A`–`D` select · `Enter` submit/next · `←` `→` navigate · `F` flag · `/` search · Alt-click a choice to cross it out.

## Data

Everything is stored in this browser's local storage. **Admin → Data → Export backup** gives you a JSON file you can restore in another browser. Chrome, Edge and Firefox all persist correctly when the file is opened from disk; Safari may block local storage on `file://` URLs, in which case the app warns you on the Profile page and runs from memory for that session.


## Contributing

Pull requests are welcome: new original questions (drop a pack in `packs/` and list it in `packs/index.json`), bug fixes, and accessibility improvements. **Do not submit real College Board questions or passages.** They are copyrighted and will be rejected.

## Licence and trademarks

[MIT](LICENSE) © 2026 Zedan Soorya. SAT is a registered trademark of the College Board, which is not affiliated with and does not endorse this project.
