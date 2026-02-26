import { Component, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { PROJECTS } from '../../data/portfolio-data';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'projects.html',
})
export class ProjectsComponent implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  private readonly scrollAnim = inject(ScrollAnimationService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly projects = PROJECTS;

  protected readonly bannerGradients = [
    'bg-gradient-to-r from-primary-400 to-primary-600',
    'bg-gradient-to-r from-accent-400 to-accent-500',
    'bg-gradient-to-r from-primary-500 to-accent-400',
    'bg-gradient-to-r from-accent-500 to-primary-400',
  ];

  ngAfterViewInit(): void {
    // Section header
    this.scrollAnim.animateOnScroll(
      '#projects .text-center',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '#projects',
    );

    // Project cards stagger
    this.scrollAnim.staggerOnScroll(
      '#projects .grid',
      '> article',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      0.1,
    );
  }
}
