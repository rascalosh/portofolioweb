import { ChangeDetectionStrategy, Component, ApplicationRef, computed, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { PROJECTS, PROJECT_FILTERS, ProjectCategory, SOCIAL_LINKS } from '../../data/portfolio-data';
import { SkillFocusService } from '../../services/skill-focus.service';
import { CaseStudyComponent } from '../detail-dialog/case-study.component';
import { ProjectMediaComponent } from './project-media.component';

type Filter = 'all' | ProjectCategory;

const CATEGORY_MARK: Record<ProjectCategory, string> = { ai: 'AI-ML', web: 'WEB', mobile: 'APP', games: 'GAME' };

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmToggleGroupImports,
    CaseStudyComponent,
    ProjectMediaComponent,
  ],
  providers: [provideIcons({ lucideArrowUpRight })],
  templateUrl: 'work.html',
})
export class WorkComponent {
  private readonly appRef = inject(ApplicationRef);
  private readonly focus = inject(SkillFocusService);

  protected readonly filters = PROJECT_FILTERS;
  protected readonly filter = signal<Filter>('all');
  protected readonly github = SOCIAL_LINKS.find((link) => link.label === 'GitHub')!;

  protected readonly visible = computed(() => {
    const filter = this.filter();
    return filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === filter);
  });

  /** A true count, for the section label and the screen-reader announcement. */
  protected readonly count = computed(() => {
    const shown = this.visible().length;
    const total = PROJECTS.length;
    return shown === total ? `${total} projects` : `${shown} of ${total} projects`;
  });

  protected mark(category: ProjectCategory): string {
    return CATEGORY_MARK[category];
  }

  protected isHighlighted(id: string): boolean {
    return this.focus.isProjectHighlighted(id);
  }

  /** Arrow keys, Home and End move focus along the chips; Enter or Space selects. */
  protected onFilterKey(event: KeyboardEvent): void {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    const items = [...(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[data-slot="toggle-group-item"]')];
    const current = items.indexOf(document.activeElement as HTMLElement);
    if (current < 0) return;
    const last = items.length - 1;
    const next =
      event.key === 'Home' ? 0 : event.key === 'End' ? last : (current + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    event.preventDefault();
    items[next].focus();
  }

  protected setFilter(selected: string | readonly string[] | undefined | null): void {
    const value = Array.isArray(selected) ? selected[0] : selected;
    if (typeof value !== 'string' || value === this.filter()) return;
    const apply = () => {
      this.filter.set(value as Filter);
      this.appRef.tick();
    };

    // Animate the regrouping with the browser's own View Transitions, unless motion is reduced.
    const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduced) doc.startViewTransition(apply);
    else apply();
  }
}
