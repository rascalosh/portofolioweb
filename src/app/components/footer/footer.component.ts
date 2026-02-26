import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { SOCIAL_LINKS } from '../../data/portfolio-data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'footer.html',
})
export class FooterComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly socialLinks = SOCIAL_LINKS;
}
