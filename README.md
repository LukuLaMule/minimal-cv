# ◈ Minimal CV

A clean, self-hosted, single-page CV template.  
**Edit one file. Deploy anywhere.**

![Preview](preview.png)

---

## Features

- 📄 **Single config file** — all your data lives in `config.js`
- 🖼 **Logo support** — add company/school/tech logos in `/logos/`
- 🎯 **Interactive** — custom cursor, scroll reveal, hover effects, animated skill bars
- 🖨 **Print-ready** — clean print layout via `@media print`
- 📱 **Responsive** — works on mobile
- ⚡ **Zero dependencies** — pure HTML / CSS / JS, no framework needed

---

## Quick Start

```bash
git clone https://github.com/yourname/minimal-cv
cd minimal-cv
# open index.html in your browser — that's it
```

Or deploy instantly:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourname/minimal-cv)

---

## Customization

**The only file you need to edit is `config.js`.**

```
minimal-cv/
├── index.html       ← structure (don't edit)
├── style.css        ← styles (edit if you want to restyle)
├── app.js           ← rendering logic (don't edit)
├── config.js        ← ✏️  YOUR DATA GOES HERE
└── logos/
    ├── oxya.png     ← company logos
    ├── imt.png
    └── tech/
        ├── sap.png  ← technology logos
        ├── linux.png
        └── ...
```

### 1. Edit your info in `config.js`

```js
const CV = {
  name: { first: "Jane", last: "Doe" },
  role: "Backend Engineer",
  // ...
}
```

### 2. Add logos (optional)

Drop PNG/SVG files into the `logos/` folder.  
Reference them in `config.js` via `logo: "logos/company.png"`.  
If an image is missing or fails to load, the `logoFallback` text is shown instead — so logos are always optional.

```js
{
  company: "Acme Corp",
  logo: "logos/acme.png",   // optional
  logoFallback: "AC",       // always shown as backup
}
```

### 3. Deploy

Any static host works:

| Host | Command |
|------|---------|
| **GitHub Pages** | Push to `main`, enable Pages in repo settings |
| **Netlify** | Drag & drop the folder |
| **Vercel** | `vercel --prod` |
| **Anywhere** | It's just HTML — upload the folder |

---

## Config Reference

```js
const CV = {

  name: { first: "", last: "" },
  role: "",                          // subtitle under your name

  availability: {
    open: true,                      // shows a green pulsing badge
    label: "Open to opportunities",
  },

  contact: [
    { icon: "✉", label: "you@email.com", href: "mailto:you@email.com" },
    { icon: "⌖", label: "City, Country", href: null },
    { icon: "◈", label: "linkedin.com/in/you", href: "https://..." },
    { icon: "⌗", label: "github.com/you", href: "https://..." },
  ],

  about: "Your bio here.",

  experience: [
    {
      title: "Job Title",
      type: "Full-time",             // Full-time / Internship / Freelance / etc.
      company: "Company Name",
      location: "City, Country",
      period: "2023 → Present",
      logo: "logos/company.png",     // optional
      logoFallback: "CO",
      color: "#0057ff",              // brand color (reserved for future use)
      bullets: ["Did X", "Built Y"],
      tags: ["React", "Node.js"],
    },
  ],

  education: [
    {
      degree: "Degree Name",
      school: "School Name",
      location: "City, Country",
      period: "2020 → 2023",
      logo: "logos/school.png",
      logoFallback: "SCH",
      color: "#e63012",
      description: "Short description of the program.",
      tags: ["Tag1", "Tag2"],
    },
  ],

  skills: [
    {
      category: "Category Name",
      items: [
        { name: "Skill", logo: "logos/tech/skill.png", logoFallback: "SK" },
      ],
    },
  ],

  certifications: [
    {
      name: "Certification Name",
      issuer: "Issuer",
      year: "2024",
      logo: "logos/tech/issuer.png",
      logoFallback: "ISS",
    },
  ],

  languages: [
    { name: "English", level: "Native", bar: 100 },  // bar: 0-100
    { name: "French",  level: "B2",     bar: 70  },
  ],

};
```

---

## License

MIT — free to use, modify, and share.  
If you make something cool with it, a ⭐ on the repo is always appreciated!
