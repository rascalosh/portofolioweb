import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { EXPERIENCES, PROJECTS, SKILLS, SKILL_GROUPS } from '../../data/portfolio-data';

interface Evidence {
  href: string;
  where: string;
}

/** The first project, then role, whose tags name this skill. Skills with no match stay plain text. */
function evidenceFor(skill: string): Evidence | null {
  const name = skill.toLowerCase();
  const project = PROJECTS.find((item) => item.tags.some((tag) => tag.toLowerCase() === name));
  if (project) return { href: `#project-${project.id}`, where: project.title };
  const role = EXPERIENCES.find((item) => item.tags.some((tag) => tag.toLowerCase() === name));
  if (role) return { href: `#experience-${role.id}`, where: `${role.role} at ${role.company}` };
  return null;
}

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmBadgeImports, HlmCardImports],
  providers: [provideIcons({ lucideArrowUpRight })],
  templateUrl: 'skills.html',
})
export class SkillsComponent {
  protected readonly groups = SKILL_GROUPS.map((group, index) => ({
    ...group,
    span: index < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
    skills: SKILLS.filter((skill) => skill.group === group.id).map((skill) => ({
      name: skill.name,
      evidence: evidenceFor(skill.name),
    })),
  }));
}
