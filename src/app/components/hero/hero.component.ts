import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HERO_DATA, SOCIAL_LINKS } from '../../data/portfolio-data';
import { IdCardComponent } from '../id-card/id-card.component';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmBadgeImports, HlmButtonImports, IdCardComponent],
  templateUrl: 'hero.html',
})
export class HeroComponent {
  protected readonly hero = HERO_DATA;
  protected readonly profileLinks = SOCIAL_LINKS.filter((link) => link.label === 'GitHub' || link.label === 'LinkedIn');
}
