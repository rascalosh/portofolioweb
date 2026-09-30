import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { PROJECTS, SOCIAL_LINKS } from '../../data/portfolio-data';

// Column spans from lg up, in PROJECTS order. The trailing GitHub card takes the last 3.
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-2', 'lg:col-span-3'];

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmBadgeImports, HlmButtonImports, HlmCardImports],
  providers: [provideIcons({ lucideArrowUpRight })],
  templateUrl: 'work.html',
})
export class WorkComponent {
  protected readonly projects = PROJECTS.map((project, index) => ({ project, span: SPANS[index] ?? 'lg:col-span-2' }));
  protected readonly github = SOCIAL_LINKS.find((link) => link.label === 'GitHub')!;
}
