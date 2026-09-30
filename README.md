<p align="center">
  <img src="https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif" alt="Angular Logo" width="80" />
</p>

<h1 align="center">Willbert Budi Lian's Portfolio</h1>

<p align="center">
  <strong>A modern, performant, and accessible personal portfolio website built with Angular 21.</strong>
</p>

<p align="center">
  <a href="https://angular.dev"><img src="https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 21" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://spartan.ng"><img src="https://img.shields.io/badge/Spartan_UI-1-000000?style=for-the-badge" alt="Spartan UI" /></a>
  <a href="https://threejs.org"><img src="https://img.shields.io/badge/Three.js-0.186-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

---

## Preview

> A single-page portfolio for recruiters: who I am, what I have built, and how to reach me. Monochrome and typography-led, with one green accent that only ever means "selected". The hero is a 3D ID card you can hover, drag and flip.

---

## Features

| Feature | Description |
|---|---|
| **ID card** | A Three.js badge: hover to tilt, drag to turn, flip to read the back. Without WebGL, or with reduced motion, a static card with a CSS flip is used and Three.js never loads |
| **Projects** | Category filter (arrow keys, Home, End), a media area per card with a typographic placeholder until you add images or video, and a case study dialog |
| **Skills by strength** | Strong in, Comfortable with, Familiar with. Hover or press a skill to see, and highlight, the projects and roles that used it |
| **Experience timeline** | Engineering and teaching roles first, then leadership. Long text is clamped on phones with Read More |
| **System theme** | Follows the system setting; the toggle overrides it and is saved only while it differs from the system |
| **Sharing** | Open Graph and Twitter cards, a generated preview image, favicons, robots.txt and llms.txt |
| **One data file** | All content lives in `portfolio-data.ts`; every `TODO:` in it is for you to fill in |

---

## Tech Stack

### Core
- **Framework:** [Angular 21](https://angular.dev) (standalone components, signals, zoneless)
- **Language:** [TypeScript 5.9](https://typescriptlang.org)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) with Spartan's theme variables (oklch)
- **Components:** [Spartan UI](https://spartan.ng) (Helm components over Brain primitives)
- **3D:** [Three.js](https://threejs.org)

### Libraries
- **Icons:** [ng-icons](https://ng-icons.github.io/ng-icons/) with Lucide
- **Fonts:** Geist and Geist Mono

### Dev & Tooling
- **Testing:** [Vitest](https://vitest.dev) with jsdom
- **Deployment:** [Vercel](https://vercel.com)

---

##Project Structure

```
latihan-angular/
├── public/                     # og.png, favicons, robots.txt, llms.txt, assets/ (put cv.pdf here)
├── components.json             # Spartan CLI config
├── src/
│   ├── index.html              # Meta tags, fonts and the pre-paint theme script
│   ├── styles.css              # Theme variables, type scale, motion and contrast rules
│   └── app/
│       ├── components/
│       │   ├── header/  hero/  id-card/      # nav, intro, 3D card
│       │   ├── work/                         # filter, cards, media area
│       │   ├── detail-dialog/                # case study dialog
│       │   ├── skills/  experience/  contact/  footer/
│       ├── ui/                 # Generated Spartan Helm components (edit freely)
│       ├── data/portfolio-data.ts
│       └── services/           # theme, active-section, skill-focus
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or use `packageManager` field: npm 11.9.0)

### Installation

```bash
# Clone the repository
git clone https://github.com/rascalosh/latihan-angular.git
cd latihan-angular

# Install dependencies
npm install
```

### Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload on file changes.

### Build for Production

```bash
npm run build
```

Build artifacts will be stored in the `dist/latihan-angular/browser` directory.

### Running Tests

```bash
npm test
```
---

## 📝 Customization

All content is in **[`src/app/data/portfolio-data.ts`](src/app/data/portfolio-data.ts)**. Search for `TODO:` to find what still needs your input.

| What | Where | Notes |
|---|---|---|
| CV | `public/cv.pdf` | The "Download CV" buttons already point at `/cv.pdf` |
| Project images or video | `public/assets/projects/`, then `media` on the project | `{ type, src, alt, width, height, poster? }`; describe the picture in `alt` |
| Outcomes and metrics | `outcome` on each project | Hidden while `null`; use only real numbers |
| "Now" line | `HERO_DATA.now` | Shown in the hero and on the card back once set |
| Case study copy | `caseStudy.result` and `caseStudy.different` | Sections appear once filled |
| Skill grouping | `SKILLS[].level` | `strong`, `comfortable` or `familiar`; the first draft needs your review |

To add another Spartan component: `npx ng g @spartan-ng/cli:ui <name>`.

---

## ♿ Accessibility

- **Semantics**: one `<h1>`, labelled sections, skip link, current section marked with `aria-current`
- **Keyboard**: nothing is hijacked; filter chips take arrow keys; the card takes Enter, Space and the arrow keys; dialogs and the menu close with Esc and return focus
- **Contrast**: WCAG AA in both themes, darker text and solid borders under Increase Contrast
- **Motion**: no looping animation; `prefers-reduced-motion` removes transitions, scroll reveals and view transitions, and keeps the card static
- **Transparency**: the header blur becomes a solid bar under `prefers-reduced-transparency`
- **Touch targets**: 44 px minimum for buttons and links
- **Text size**: type and breakpoints are in `rem`, so the layout follows the browser's font size

---

## 📄 License

This project is for personal/educational use.

---

## 🤝 Connect

<p align="center">
  <a href="https://github.com/rascalosh"><img src="https://img.shields.io/badge/GitHub-rascalosh-181717?style=for-the-badge&logo=github" alt="GitHub" /></a>
  <a href="https://linkedin.com/in/willbert-budi-lian"><img src="https://img.shields.io/badge/LinkedIn-Willbert_Budi_Lian-0A66C2?style=for-the-badge&logo=linkedin" alt="LinkedIn" /></a>
  <a href="mailto:lianwillbert@gmail.com"><img src="https://img.shields.io/badge/Email-lianwillbert@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://instagram.com/willbertbudi"><img src="https://img.shields.io/badge/Instagram-willbertbudi-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
</p>

---

<p align="center">
  Built with ❤️ using <a href="https://angular.dev">Angular</a>
</p>
