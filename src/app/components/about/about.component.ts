import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ABOUT_DATA } from '../../data/portfolio-data';

@Component({
    selector: 'app-about',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section
      id="about"
      class="py-24 px-6"
      aria-labelledby="about-heading"
    >
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-sm font-semibold tracking-widest uppercase"
            [class]="isDark() ? 'text-primary-400' : 'text-primary-500'"
          >
            About
          </span>
          <h2 id="about-heading" class="font-display text-3xl sm:text-4xl font-bold mt-2">
            {{ aboutData.heading }}
          </h2>
        </div>

        <div class="grid md:grid-cols-5 gap-12 items-start">
          <!-- Text Content -->
          <div class="md:col-span-3 space-y-5">
            @for (paragraph of aboutData.paragraphs; track $index) {
              <p class="text-base leading-relaxed"
                [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
              >
                {{ paragraph }}
              </p>
            }
          </div>

          <!-- Stats Grid -->
          <div class="md:col-span-2 grid grid-cols-2 gap-4">
            @for (stat of aboutData.stats; track stat.label) {
              <div
                class="rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
                [class]="isDark()
                  ? 'bg-card-dark border border-border-dark hover:border-primary-500/30'
                  : 'bg-card-light border border-border-light hover:border-primary-300 shadow-sm hover:shadow-md'"
              >
                <div class="font-display text-3xl font-bold"
                  [class]="isDark() ? 'text-primary-400' : 'text-primary-500'"
                >
                  {{ stat.value }}
                </div>
                <div class="text-sm mt-1"
                  [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
                >
                  {{ stat.label }}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutComponent {
    private readonly themeService = inject(ThemeService);

    protected readonly isDark = this.themeService.isDark;
    protected readonly aboutData = ABOUT_DATA;
}
