import { Component, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ABOUT_DATA } from '../../data/portfolio-data';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'about.html',
  styleUrl: 'about.css',
})
export class AboutComponent implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  private readonly scrollAnim = inject(ScrollAnimationService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly aboutData = ABOUT_DATA;

  ngAfterViewInit(): void {
    // Section header fade in
    this.scrollAnim.animateOnScroll(
      '#about .text-center',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '#about',
    );

    // Text paragraphs slide from left
    this.scrollAnim.staggerOnScroll(
      '#about .md\\:col-span-3',
      '> p',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      0.15,
    );

    // Stats stagger in
    this.scrollAnim.staggerOnScroll(
      '#about .md\\:col-span-2',
      '> div',
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
      0.1,
    );
  }
}
