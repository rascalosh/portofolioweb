import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-scroll-top',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (isVisible()) {
      <button
        type="button"
        (click)="scrollToTop()"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer border-0 hover:scale-110 hover:-translate-y-1 animate-fade-in"
        [class]="isDark()
          ? 'bg-primary-500 text-white hover:bg-primary-400 shadow-primary-500/25'
          : 'bg-primary-500 text-white hover:bg-primary-600 shadow-primary-500/30'"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="2.5" stroke="currentColor" class="w-5 h-5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    }
  `,
    styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
  `],
})
export class ScrollTopComponent implements OnInit, OnDestroy {
    private readonly themeService = inject(ThemeService);
    private readonly ngZone = inject(NgZone);

    protected readonly isDark = this.themeService.isDark;
    protected readonly isVisible = signal(false);

    private scrollListener: (() => void) | null = null;

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.scrollListener = () => {
                const shouldShow = window.scrollY > 400;
                if (this.isVisible() !== shouldShow) {
                    this.ngZone.run(() => this.isVisible.set(shouldShow));
                }
            };
            window.addEventListener('scroll', this.scrollListener, { passive: true });
        });
    }

    ngOnDestroy(): void {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
        }
    }

    protected scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
