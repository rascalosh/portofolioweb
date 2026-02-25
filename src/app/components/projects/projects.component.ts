import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { PROJECTS } from '../../data/portfolio-data';

@Component({
    selector: 'app-projects',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section
      id="projects"
      class="py-24 px-6"
      aria-labelledby="projects-heading"
    >
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-sm font-semibold tracking-widest uppercase"
            [class]="isDark() ? 'text-primary-400' : 'text-primary-500'"
          >
            Projects
          </span>
          <h2 id="projects-heading" class="font-display text-3xl sm:text-4xl font-bold mt-2">
            Featured Work
          </h2>
        </div>

        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          @for (project of projects; track project.title; let idx = $index) {
            <article
              class="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              [class]="isDark()
                ? 'bg-card-dark border border-border-dark hover:border-primary-500/30'
                : 'bg-card-light border border-border-light hover:border-primary-300 shadow-sm hover:shadow-xl'"
            >
              <!-- Project Color Banner -->
              <div
                class="h-2 transition-all duration-300 group-hover:h-3"
                [class]="bannerGradients[idx % bannerGradients.length]"
                aria-hidden="true"
              ></div>

              <div class="p-7">
                <!-- Title & Links -->
                <div class="flex items-start justify-between mb-3 gap-3">
                  <h3 class="font-display text-xl font-bold">{{ project.title }}</h3>
                  <div class="flex items-center gap-2 shrink-0">
                    @if (project.repoUrl) {
                      <a
                        [href]="project.repoUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="'View ' + project.title + ' source code on GitHub'"
                        class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        [class]="isDark()
                          ? 'text-muted-dark hover:text-text-dark hover:bg-border-dark'
                          : 'text-muted-light hover:text-text-light hover:bg-primary-50'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    }
                    @if (project.liveUrl) {
                      <a
                        [href]="project.liveUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        [attr.aria-label]="'View ' + project.title + ' live demo'"
                        class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                        [class]="isDark()
                          ? 'text-muted-dark hover:text-text-dark hover:bg-border-dark'
                          : 'text-muted-light hover:text-text-light hover:bg-primary-50'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    }
                  </div>
                </div>

                <!-- Description -->
                <p class="text-sm leading-relaxed mb-5"
                  [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
                >
                  {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  @for (tag of project.tags; track tag) {
                    <span
                      class="px-3 py-1 text-xs font-medium rounded-lg transition-colors duration-200"
                      [class]="isDark()
                        ? 'bg-primary-600/15 text-primary-300'
                        : 'bg-primary-50 text-primary-600'"
                    >
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsComponent {
    private readonly themeService = inject(ThemeService);

    protected readonly isDark = this.themeService.isDark;
    protected readonly projects = PROJECTS;

    protected readonly bannerGradients = [
        'bg-gradient-to-r from-primary-400 to-primary-600',
        'bg-gradient-to-r from-accent-400 to-accent-500',
        'bg-gradient-to-r from-primary-500 to-accent-400',
        'bg-gradient-to-r from-accent-500 to-primary-400',
    ];
}
