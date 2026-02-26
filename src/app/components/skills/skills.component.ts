import { Component, ChangeDetectionStrategy, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SKILLS, Skill } from '../../data/portfolio-data';

type SkillCategory = 'all' | Skill['category'];

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: 'skills.html',
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
