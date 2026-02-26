import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-scroll-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'scroll-top.html',
  styleUrl: 'scroll-top.css',
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly ngZone = inject(NgZone);

  protected readonly isDark = this.themeService.isDark;
  protected readonly isVisible = signal(false);
  protected readonly footerVisibleHeight = signal(0);

  private scrollListener: (() => void) | null = null;
  private footerObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      // Scroll listener for showing/hiding the button
      this.scrollListener = () => {
        const shouldShow = window.scrollY > 400;
        if (this.isVisible() !== shouldShow) {
          this.ngZone.run(() => this.isVisible.set(shouldShow));
        }
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });

      // Intersection Observer for footer
      const footer = document.querySelector('footer');
      if (footer) {
        this.footerObserver = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            const visibleHeight = entry.isIntersecting
              ? entry.intersectionRect.height
              : 0;
            this.ngZone.run(() => this.footerVisibleHeight.set(visibleHeight));
          },
          { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
        );
        this.footerObserver.observe(footer);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.footerObserver) {
      this.footerObserver.disconnect();
    }
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
