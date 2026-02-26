import { Component, ChangeDetectionStrategy, inject, signal, computed, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SKILLS, Skill } from '../../data/portfolio-data';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

type SkillCategory = 'all' | Skill['category'];

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: 'skills.html',
})
export class SkillsComponent implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  private readonly scrollAnim = inject(ScrollAnimationService);

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

  ngAfterViewInit(): void {
    this.scrollAnim.animateOnScroll(
      '#skills .text-center',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '#skills',
    );

    this.scrollAnim.animateOnScroll(
      '#skills [role="tablist"]',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '#skills', start: 'top 75%' } },
    );

    this.scrollAnim.staggerOnScroll(
      '#skills [role="tabpanel"]',
      '> div',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
      0.05,
    );
  }
}
