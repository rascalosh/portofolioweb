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

> A single-page portfolio for recruiters: who I am, what I have built, and how to reach me. Monochrome, typography-led, and built on Spartan UI. The hero is a 3D ID card you can hover, drag and flip.

---

## Features

| Feature | Description |
|---|---|
|**ID card** | A Three.js badge: hover to tilt, drag to turn (it springs to the nearest face), flip to read the back. Without WebGL, or with reduced motion, a static card with a CSS flip is used and Three.js never loads |
|**System theme** | Follows the system light or dark setting. The toggle overrides it; a choice is saved only while it differs from the system, so matching the system again clears it |
|**Spartan UI** | Button, card, badge, accordion and sheet, generated into `src/app/ui` and built on Spartan's accessible Brain primitives |
|**Work grid** | Project cards with a mono spec panel built from the facts in the data file |


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
├── public/assets/              # Photo (foto-card.jpg is the 1024px version used on the card)
├── components.json             # Spartan CLI config
├── src/
│   ├── index.html              # Fonts and the pre-paint theme script
│   ├── styles.css              # Theme variables, type scale, motion and contrast rules
│   └── app/
│       ├── app.ts              # Root component
│       ├── components/
│       │   ├── header/         # Nav, availability badge, theme toggle, mobile sheet
│       │   ├── hero/           # Name, role, bio, actions
│       │   ├── id-card/        # Static card + lazy Three.js scene
│       │   ├── work/           # Project bento
│       │   ├── skills/         # Grouped skills linked to evidence
│       │   ├── experience/     # Accordion
│       │   ├── contact/        # Copy email and links
│       │   └── footer/
│       ├── ui/                 # Generated Spartan Helm components (edit freely)
│       ├── data/portfolio-data.ts
│       └── services/           # theme.service, active-section.service
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

All portfolio content is centralized in a single file:

**[`src/app/data/portfolio-data.ts`](src/app/data/portfolio-data.ts)**

| Data Export | Description |
|---|---|
| `HERO_DATA` | Name, title, bio, school, availability text |
| `SKILL_GROUPS` / `SKILLS` | Skill groups and skills |
| `PROJECTS` | Project cards: kind, description, spec panel facts, tags, links |
| `EXPERIENCES` | Accordion entries; `current: true` opens by default |
| `SOCIAL_LINKS` | GitHub, LinkedIn and email shown on the page |
| `UNLISTED_LINKS` | Contact channels kept but not shown |
| `NAV_LINKS` | Header navigation |

To add another Spartan component: `npx ng g @spartan-ng/cli:ui <name>` (generated into `src/app/ui`).

---

## ♿ Accessibility

- ✅ **Semantics** — one `<h1>`, labelled sections, skip link, current section marked with `aria-current`
- ✅ **Keyboard** — nothing is hijacked (arrow keys scroll normally); the card takes ← / → to turn and Enter or Space to flip; the menu closes with Esc and returns focus
- ✅ **Contrast** — WCAG AA in both themes (muted text 4.9:1 light, 7.7:1 dark; link and focus blue 5.4:1 light, 6.5:1 dark), and darker text and solid borders under Increase Contrast
- ✅ **Motion** — no looping animation; `prefers-reduced-motion` removes transitions and keeps the card static
- ✅ **Transparency** — the header blur is replaced by a solid bar under `prefers-reduced-transparency`
- ✅ **Touch targets** — 44 px minimum for buttons and links, with larger tap areas on skill links
- ✅ **Text size** — type and breakpoints are in `rem`, so the layout follows the browser's font size

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
