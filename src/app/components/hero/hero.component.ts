import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { HERO_DATA, SOCIAL_LINKS } from '../../data/portfolio-data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="hero"
      class="min-h-screen flex items-center px-6 pt-16 relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <!-- Decorative blobs -->
      <div
        class="absolute top-20 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        [class]="isDark() ? 'bg-primary-600' : 'bg-primary-200'"
        aria-hidden="true"
      ></div>
      <div
        class="absolute bottom-20 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        [class]="isDark() ? 'bg-accent-500' : 'bg-accent-400'"
        aria-hidden="true"
      ></div>

      <div class="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div class="text-left order-2 md:order-1">
          <!-- Greeting Tag -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mt-5 mb-5 transition-colors duration-300"
            [class]="isDark()
              ? 'bg-primary-600/15 text-primary-300 border border-primary-500/20'
              : 'bg-primary-50 text-primary-600 border border-primary-200'"
          >
            <span class="inline-block w-2 h-2 rounded-full bg-accent-500 animate-pulse" aria-hidden="true"></span>
            {{ heroData.greeting }}
          </div>

          <!-- Name + Social Links -->
          <h1 id="hero-heading" class="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-4">
            {{ heroData.name }}
            <span class="inline-flex items-center gap-2 align-middle ml-2" role="list" aria-label="Social links">
              @for (social of socialLinks; track social.label) {
                <a
                  [href]="social.url"
                  [attr.aria-label]="social.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  class="inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                  [class]="isDark()
                    ? 'text-muted-dark hover:text-primary-300 hover:bg-card-dark'
                    : 'text-muted-light hover:text-primary-600 hover:bg-primary-50'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" aria-hidden="true">
                    <path [attr.d]="social.svgPath" />
                  </svg>
                </a>
              }
            </span>
          </h1>

          <!-- Title -->
          <p class="text-xl sm:text-2xl font-medium mb-6"
            [class]="isDark() ? 'text-primary-300' : 'text-primary-600'"
          >
            {{ heroData.title }}
          </p>

          <!-- Subtitle -->
          <p class="text-lg max-w-xl mb-10 leading-relaxed"
            [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
          >
            {{ heroData.subtitle }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold text-sm bg-primary-500 hover:bg-primary-600 transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
            >
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
            <a
              href="#contact"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              [class]="isDark()
                ? 'border border-border-dark text-text-dark hover:bg-card-dark hover:border-primary-500/40'
                : 'border border-border-light text-text-light hover:bg-card-light hover:border-primary-300'"
            >
              Get In Touch
            </a>
          </div>

        </div>

        <!-- Right: Profile Photo -->
        <div class="flex justify-center md:justify-end order-1 md:order-2 mt-10">
          <div class="relative">
            <!-- Decorative glow blob -->
            <div
              class="absolute -inset-3 opacity-20 blur-md blob-morph"
              [class]="isDark()
                ? 'bg-gradient-to-br from-primary-500 to-accent-500'
                : 'bg-gradient-to-br from-primary-300 to-accent-400'"
              aria-hidden="true"
            ></div>
            <!-- Dotted ring decoration -->
            <div
              class="absolute -inset-6 border-2 border-dashed opacity-30 animate-spin blob-morph-reverse"
              [class]="isDark() ? 'border-primary-500' : 'border-primary-300'"
              aria-hidden="true"
            ></div>
            <!-- Photo container (blob) -->
            <div
              class="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 overflow-hidden border-4 shadow-2xl rounded-full"
              [class]="isDark()
                ? 'border-border-dark shadow-primary-500/10'
                : 'border-white shadow-primary-200/50'"
            >
              <img src="assets/foto.jpg" alt="Willbert Budi Lian" class="w-full h-full object-cover" />
            </div>
            <!-- Status dot -->
            <div
              class="absolute bottom-4 right-4 w-6 h-6 rounded-full border-4 bg-accent-500 animate-pulse"
              [class]="isDark() ? 'border-surface-dark' : 'border-white'"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    .blob-morph {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: blob-shift 8s ease-in-out infinite;
    }

    .blob-morph-reverse {
      border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
      animation: blob-shift-reverse 10s ease-in-out infinite;
    }

    @keyframes blob-shift {
      0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50%  { border-radius: 50% 60% 30% 60% / 40% 70% 60% 30%; }
      75%  { border-radius: 40% 30% 60% 50% / 60% 40% 30% 70%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }

    @keyframes blob-shift-reverse {
      0%   { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
      25%  { border-radius: 70% 30% 50% 60% / 30% 50% 70% 40%; }
      50%  { border-radius: 30% 50% 60% 40% / 70% 30% 40% 60%; }
      75%  { border-radius: 60% 70% 40% 30% / 50% 60% 50% 40%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
    }
  `],
})
export class HeroComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly heroData = HERO_DATA;
  protected readonly socialLinks = SOCIAL_LINKS;
}
