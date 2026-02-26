import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NAV_LINKS } from '../../data/portfolio-data';
import { KeyboardNavService } from '../../services/keyboard-nav.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'banner',
  },
  templateUrl: 'header.html',
})
export class HeaderComponent {
  private readonly themeService = inject(ThemeService);
  private readonly keyboardNav = inject(KeyboardNavService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly navLinks = NAV_LINKS;
  protected readonly mobileMenuOpen = signal(false);
  protected readonly activeFragment = this.keyboardNav.activeFragment;

  protected readonly headerClasses = computed(() =>
    this.isDark()
      ? 'bg-surface-dark/80 backdrop-blur-xl border-b border-border-dark'
      : 'bg-surface-light/80 backdrop-blur-xl border-b border-border-light'
  );

  protected toggleTheme(): void {
    this.themeService.toggle();
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
