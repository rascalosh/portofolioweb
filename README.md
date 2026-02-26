<p align="center">
  <img src="https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif" alt="Angular Logo" width="80" />
</p>

<h1 align="center">🚀 Willbert Budi Lian's Portfolio</h1>

<p align="center">
  <strong>A modern, performant, and accessible personal portfolio website built with Angular 21.</strong>
</p>

<p align="center">
  <a href="https://angular.dev"><img src="https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 21" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://gsap.com"><img src="https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" /></a>
  <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

---

## 📸 Preview

> A sleek, single-page portfolio showcasing my projects, skills, experience, and contact information — complete with dark/light theme toggling, scroll-triggered animations, and full keyboard navigation support.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Dark / Light Theme** | Seamless theme switcher with persistent preference via `ThemeService` |
| 🖥️ **Responsive Design** | Fully responsive layout built with Tailwind CSS mobile to desktop |
| 🎬 **Scroll Animations** | Smooth reveal animations powered by GSAP `ScrollTrigger` |
| ⌨️ **Keyboard Navigation** | Full accessibility with keyboard shortcuts for section navigation |
| 🧩 **Component Architecture** | Modular, standalone Angular components with `OnPush` change detection |
| 📊 **Dynamic Data** | All portfolio content driven by a centralized `portfolio-data.ts` file |
| ⬆️ **Scroll-to-Top** | Floating button to quickly scroll back to the top of the page |
| ⚡ **Performant** | Optimized with Angular's `OnPush` strategy and lazy-loaded icons |

---

## 🛠️ Tech Stack

### Core
- **Framework:** [Angular 21](https://angular.dev) (Standalone Components)
- **Language:** [TypeScript 5.9](https://typescriptlang.org)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) with PostCSS
- **Animations:** [GSAP 3](https://gsap.com) (GreenSock Animation Platform)

### Libraries
- **Icons:** [Iconify](https://iconify.design)
- **RxJS:** Reactive programming for services

### Dev & Tooling
- **Testing:** [Vitest](https://vitest.dev) with jsdom
- **Code Formatting:** Prettier (with Angular HTML parser)
- **Deployment:** [Vercel](https://vercel.com)

---

## 📁 Project Structure

```
latihan-angular/
├── public/                     # Static assets
├── src/
│   ├── index.html              # Main HTML entry point
│   ├── app/
│   │   ├── app.ts              # Root component (standalone)
│   │   ├── app.config.ts       # Application configuration
│   │   ├── app.routes.ts       # Route definitions
│   │   ├── app.css             # Global styles
│   │   ├── components/
│   │   │   ├── header/         # Navigation bar with theme toggle
│   │   │   ├── hero/           # Hero section with profile photo & CTA
│   │   │   ├── about/          # About me section with stats
│   │   │   ├── skills/         # Skills grid (Frontend / Backend / Tools)
│   │   │   ├── projects/       # Project showcase cards
│   │   │   ├── experience/     # Experience timeline
│   │   │   ├── contact/        # Contact form & social links
│   │   │   ├── footer/         # Footer with copyright
│   │   │   └── scroll-top/     # Scroll-to-top floating button
│   │   ├── data/
│   │   │   └── portfolio-data.ts   # All portfolio content & interfaces
│   │   └── services/
│   │       ├── theme.service.ts            # Dark/Light theme management
│   │       ├── scroll-animation.service.ts # GSAP ScrollTrigger animations
│   │       └── keyboard-nav.service.ts     # Keyboard navigation (a11y)
├── angular.json                # Angular workspace configuration
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── .postcssrc.json             # PostCSS configuration (Tailwind)
```

---

## 🚀 Getting Started

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

## 🌐 Deployment

This project is configured for deployment on **Vercel** with the following settings (see [`vercel.json`](vercel.json)):

```json
{
  "buildCommand": "ng build --configuration production",
  "outputDirectory": "dist/latihan-angular/browser",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect the configuration from `vercel.json`
4. Your site will be live! 🎉

---

## 📝 Customization

All portfolio content is centralized in a single file for easy editing:

**[`src/app/data/portfolio-data.ts`](src/app/data/portfolio-data.ts)**

| Data Export | Description |
|---|---|
| `HERO_DATA` | Name, greeting, title, and subtitle |
| `ABOUT_DATA` | About me paragraphs and statistics |
| `SKILLS` | Categorized skill list with Iconify icons |
| `PROJECTS` | Project cards with descriptions, tags, and links |
| `EXPERIENCES` | Experience timeline entries with achievements |
| `SOCIAL_LINKS` | Social media links (GitHub, LinkedIn, Email, etc.) |
| `NAV_LINKS` | Navigation menu items |

Simply edit the data objects to update your portfolio content — no need to touch component files!

---

## ♿ Accessibility

This portfolio is built with accessibility in mind:

- ✅ **Semantic HTML** — Proper use of `<section>`, `<main>`, `<nav>`, `<header>`, `<footer>`
- ✅ **ARIA Labels** — All interactive elements have descriptive ARIA attributes
- ✅ **Keyboard Navigation** — Full keyboard support via `KeyboardNavService`
- ✅ **Focus Management** — Logical focus order and visible focus indicators
- ✅ **Color Contrast** — Tested for WCAG-compliant contrast ratios
- ✅ **Reduced Motion** — Respects `prefers-reduced-motion` user preferences

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
