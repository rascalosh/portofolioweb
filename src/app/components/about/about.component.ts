import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ABOUT_DATA } from '../../data/portfolio-data';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'about.html',
  styleUrl: 'about.css',
})
export class AboutComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly aboutData = ABOUT_DATA;
}
