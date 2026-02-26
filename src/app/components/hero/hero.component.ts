import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { HERO_DATA, SOCIAL_LINKS } from '../../data/portfolio-data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'hero.html',
  styles: [`
    .blob-morph {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: blob-shift 8s ease-in-out infinite;
    }

    .blob-morph-reverse {
      border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
      animation: blob-shift-reverse 10s ease-in-out infinite;
    }

    @keyframes blob-shift {
      0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50%  { border-radius: 50% 60% 30% 60% / 40% 70% 60% 30%; }
      75%  { border-radius: 40% 30% 60% 50% / 60% 40% 30% 70%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }

    @keyframes blob-shift-reverse {
      0%   { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
      25%  { border-radius: 70% 30% 50% 60% / 30% 50% 70% 40%; }
      50%  { border-radius: 30% 50% 60% 40% / 70% 30% 40% 60%; }
      75%  { border-radius: 60% 70% 40% 30% / 50% 60% 50% 40%; }
      100% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
    }
  `],
})
export class HeroComponent {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly heroData = HERO_DATA;
  protected readonly socialLinks = SOCIAL_LINKS;
}
