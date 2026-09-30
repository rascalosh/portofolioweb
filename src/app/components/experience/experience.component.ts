import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { EXPERIENCES } from '../../data/portfolio-data';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmAccordionImports, HlmBadgeImports],
  templateUrl: 'experience.html',
})
export class ExperienceComponent {
  protected readonly experiences = EXPERIENCES;
}
