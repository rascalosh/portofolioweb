import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { CaseStudy } from '../../data/portfolio-data';

@Component({
  selector: 'app-case-study',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButtonImports, HlmDialogImports],
  templateUrl: 'case-study.html',
})
export class CaseStudyComponent {
  readonly title = input.required<string>();
  readonly study = input.required<CaseStudy>();
}
