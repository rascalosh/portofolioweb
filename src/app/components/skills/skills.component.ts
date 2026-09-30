import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { SKILLS, SKILL_LEVELS } from '../../data/portfolio-data';
import { SkillFocusService } from '../../services/skill-focus.service';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmBadgeImports],
  templateUrl: 'skills.html',
})
export class SkillsComponent {
  protected readonly focus = inject(SkillFocusService);
  protected readonly total = SKILLS.length;

  protected readonly levels = SKILL_LEVELS.map((level) => ({
    ...level,
    skills: SKILLS.filter((skill) => skill.level === level.id).map((skill) => ({
      name: skill.name,
      // Only skills that appear in a project or role can be selected; the rest stay plain.
      usable: this.focus.evidenceFor(skill.name).length > 0,
    })),
  }));

  /** Hover previews for mouse users only. Keyboard and touch users select by pressing. */
  protected preview(event: PointerEvent, skill: string | null): void {
    if (event.pointerType === 'mouse') this.focus.preview(skill);
  }
}
