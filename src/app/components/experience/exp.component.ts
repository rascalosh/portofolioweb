import { Component, ChangeDetectionStrategy, inject, signal, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { EXPERIENCES } from '../../data/portfolio-data';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-exp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'exp.html',
})
export class ExperienceComponent {
  private readonly themeService = inject(ThemeService);
  private readonly scrollAnim = inject(ScrollAnimationService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly experiences = EXPERIENCES;


  constructor() {
    afterNextRender(() => {

      this.scrollAnim.animateOnScroll(
        '#experience .text-center',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '#experience',
      );

      // Timeline cards stagger from left
      this.scrollAnim.staggerOnScroll(
        '#experience .space-y-10',
        '> .relative',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.2,
      );
    });
  }
}

