# Nguyen Tuan Dinh — Business Analyst portfolio

A hand-built static site (plain HTML/CSS/JS, no framework, no build step).
Bilingual EN/VI, light/dark, all contact details injected at runtime.

## Structure

```
index.html          Home
case-study-1.html    Case study 1 — Access Control & Approval Workflow
assets/styles.css    Design system (Notion-inspired: warm ground, indigo accent)
assets/app.js        Theme + language toggle, contact injection
```

## Edit your contact details

Open **`assets/app.js`** and edit the `CONTACT` object near the top:

```js
var CONTACT = {
  email:    "ngtuandinh2004@gmail.com",
  phone:    "",   // e.g. "0869 159 656" — leave "" to hide
  linkedin: "",   // full URL, e.g. "https://www.linkedin.com/in/your-handle"
  github:   "https://github.com/ngtuandinh123",
  cv:       ""    // link to your CV PDF, e.g. "assets/cv.pdf"
};
```

Any value left as `""` is hidden everywhere on the site.

## Run locally

```bash
python -m http.server 4173
# open http://localhost:4173
```

## Deploy

GitHub Pages serves this repo's `main` branch from the root.
Live URL: `https://ngtuandinh123.github.io/portfolio/`

---

Case studies are representative reconstructions based on real project experience;
company-specific and confidential material has been removed or fictionalised.
