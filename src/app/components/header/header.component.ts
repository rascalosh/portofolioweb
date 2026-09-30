import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { NAV_LINKS } from '../../data/portfolio-data';
import { ActiveSectionService } from '../../services/active-section.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmButtonImports, HlmSheetImports],
  providers: [provideIcons({ lucideMenu, lucideMoon, lucideSun })],
  templateUrl: 'header.html',
})
export class HeaderComponent {
  private readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isDark = this.theme.isDark;
  protected readonly activeFragment = inject(ActiveSectionService).activeFragment;
  protected readonly navLinks = NAV_LINKS;
  protected readonly scrolled = signal(false);

  constructor() {
    afterNextRender(() => {
      const update = () => this.scrolled.set(window.scrollY > 8);
      update();
      window.addEventListener('scroll', update, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  protected toggleTheme(): void {
    this.theme.toggle();
  }
}
