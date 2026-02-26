import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SKILLS, Skill } from '../../data/portfolio-data';

type SkillCategory = 'all' | Skill['category'];

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="skills"
      class="py-24 px-6"
      aria-labelledby="skills-heading"
    >
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-sm font-semibold tracking-widest uppercase"
            [class]="isDark() ? 'text-primary-400' : 'text-primary-500'"
          >
            Skills
          </span>
          <h2 id="skills-heading" class="font-display text-3xl sm:text-4xl font-bold mt-2">
            Technologies I Work With
          </h2>
          <p class="mt-4 max-w-2xl mx-auto"
            [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
          >
            Programming Languages, Tech Stack, and Tools
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center gap-2 mb-12" role="tablist" aria-label="Filter skills by category">
          @for (cat of categories; track cat.value) {
            <button
              type="button"
              role="tab"
              [attr.aria-selected]="activeCategory() === cat.value"
              (click)="setCategory(cat.value)"
              class="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border-0"
              [class]="activeCategory() === cat.value
                ? (isDark()
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-primary-500 text-white shadow-lg shadow-primary-500/25')
                : (isDark()
                  ? 'bg-card-dark text-muted-dark hover:text-text-dark'
                  : 'bg-card-light text-muted-light hover:text-text-light')"
            >
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" role="tabpanel">
          @for (skill of filteredSkills(); track skill.name) {
            <div
              class="rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 group"
              [class]="isDark()
                ? 'bg-card-dark border border-border-dark hover:border-primary-500/30'
                : 'bg-card-light border border-border-light hover:border-primary-300 shadow-sm hover:shadow-md'"
            >
              <div class="text-2xl mb-2 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                {{ skill.icon }}
              </div>
              <div class="text-sm font-medium">
                {{ skill.name }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly activeCategory = signal<SkillCategory>('all');

  protected readonly categories: readonly { value: SkillCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'tools', label: 'Tools' },
  ];

  protected readonly filteredSkills = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return SKILLS;
    return SKILLS.filter((s) => s.category === cat);
  });

  protected setCategory(category: SkillCategory): void {
    this.activeCategory.set(category);
  }
}
