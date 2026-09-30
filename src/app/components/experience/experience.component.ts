import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { EXPERIENCES, EXPERIENCE_GROUPS } from '../../data/portfolio-data';
import { SkillFocusService } from '../../services/skill-focus.service';
import { ClampedTextComponent } from './clamped-text.component';

interface Segment {
  text: string;
  number: boolean;
}

/** Splits text so figures such as "80", "20%" or "200+" can be set in emphasized mono. The words are unchanged. */
function withNumbers(text: string): Segment[] {
  return text
    .split(/(\d[\d,.]*\+?%?)/)
    .filter(Boolean)
    .map((part) => ({ text: part, number: /^\d/.test(part) }));
}

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmBadgeImports, ClampedTextComponent],
  templateUrl: 'experience.html',
})
export class ExperienceComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly focus = inject(SkillFocusService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly total = EXPERIENCES.length;

  /** Engineering and teaching first, then leadership, each in the order they were written. */
  protected readonly groups = EXPERIENCE_GROUPS.map((group) => ({
    ...group,
    roles: EXPERIENCES.filter((role) => role.kind === group.id).map((role) => ({
      ...role,
      achievementSegments: (role.achievements ?? []).map(withNumbers),
    })),
  }));

  constructor() {
    // Fade items in as they scroll into view. The hidden starting state exists only when scripts run and motion is allowed.
    afterNextRender(() => {
      const items = this.host.nativeElement.querySelectorAll('[data-reveal]');
      if (typeof IntersectionObserver === 'undefined') {
        items.forEach((element) => element.setAttribute('data-revealed', ''));
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.setAttribute('data-revealed', '');
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      items.forEach((element) => observer.observe(element));
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected isHighlighted(id: string): boolean {
    return this.focus.isExperienceHighlighted(id);
  }
}
