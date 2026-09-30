import { Injectable, computed, signal } from '@angular/core';
import { EXPERIENCES, PROJECTS } from '../data/portfolio-data';

export interface UsedIn {
  href: string;
  label: string;
}

const matches = (tags: readonly string[], skill: string) => tags.some((tag) => tag.toLowerCase() === skill.toLowerCase());

/**
 * Which skill is being looked at, and where it was used. Hovering or focusing a skill previews it;
 * clicking pins it. Projects and roles read `highlighted*` to show a ring.
 */
@Injectable({ providedIn: 'root' })
export class SkillFocusService {
  private readonly pinned = signal<string | null>(null);
  private readonly previewed = signal<string | null>(null);

  /** The skill currently shown: a preview wins over the pinned one. */
  readonly active = computed(() => this.previewed() ?? this.pinned());
  readonly pinnedSkill = this.pinned.asReadonly();

  readonly usedIn = computed<UsedIn[]>(() => {
    const skill = this.active();
    return skill ? this.evidenceFor(skill) : [];
  });

  private readonly highlightedIds = computed(() => new Set(this.usedIn().map((item) => item.href.slice(1))));

  evidenceFor(skill: string): UsedIn[] {
    const projects = PROJECTS.filter((project) => matches(project.tags, skill)).map((project) => ({
      href: `#project-${project.id}`,
      label: project.title,
    }));
    const roles = EXPERIENCES.filter((role) => matches(role.tags, skill)).map((role) => ({
      href: `#experience-${role.id}`,
      label: `${role.role}, ${role.company}`,
    }));
    return [...projects, ...roles];
  }

  isProjectHighlighted(id: string): boolean {
    return this.highlightedIds().has(`project-${id}`);
  }

  isExperienceHighlighted(id: string): boolean {
    return this.highlightedIds().has(`experience-${id}`);
  }

  preview(skill: string | null): void {
    this.previewed.set(skill);
  }

  togglePin(skill: string): void {
    this.pinned.update((current) => (current === skill ? null : skill));
  }
}
