import { Component, ChangeDetectionStrategy, inject, AfterViewInit, afterNextRender } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SOCIAL_LINKS } from '../../data/portfolio-data';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'contact.html',
  styleUrl: 'contact.css',
})
export class ContactComponent {
  private readonly themeService = inject(ThemeService);
  private readonly scrollAnim = inject(ScrollAnimationService);
  protected readonly isDark = this.themeService.isDark;
  protected readonly socialLinks = SOCIAL_LINKS;

  constructor() {
    afterNextRender(() => {

      this.scrollAnim.animateOnScroll(
        '#contact .text-center',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '#contact',
      );


      this.scrollAnim.staggerOnScroll(
        '#contact .grid',
        '> a',
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
        0.12,
      );
    });
  }
}