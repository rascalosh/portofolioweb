import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HERO_DATA, SOCIAL_LINKS } from '../../data/portfolio-data';
import type { CardContent, CardScene } from './id-card-scene';

const PHOTO_URL = 'assets/foto-card.jpg';

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, '');

/**
 * An ID badge you can hold: hover to tilt, drag to turn, flip to read the back.
 * The static card below is the first paint, and stays as the whole experience without WebGL or with reduced motion.
 */
@Component({
  selector: 'app-id-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButtonImports],
  templateUrl: 'id-card.html',
})
export class IdCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  protected readonly hero = HERO_DATA;
  protected readonly content: CardContent = {
    name: HERO_DATA.name,
    title: HERO_DATA.title,
    school: HERO_DATA.school,
    program: HERO_DATA.program,
    status: HERO_DATA.status,
    email: SOCIAL_LINKS.find((link) => link.label === 'Email')?.displayValue ?? '',
    github: stripProtocol(SOCIAL_LINKS.find((link) => link.label === 'GitHub')?.url ?? ''),
    linkedin: stripProtocol(SOCIAL_LINKS.find((link) => link.label === 'LinkedIn')?.url ?? ''),
  };

  protected readonly showingBack = signal(false);
  protected readonly sceneReady = signal(false);
  protected readonly announcement = signal('');
  protected readonly label = computed(
    () => `ID card for ${HERO_DATA.name}, showing the ${this.showingBack() ? 'back' : 'front'}. Press Enter to flip.`,
  );

  private scene?: CardScene;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.scene?.destroy();
    });
    afterNextRender(() => void this.loadScene());
  }

  protected flip(direction: 1 | -1 = 1): void {
    if (this.scene) {
      this.scene.flip(direction);
    } else {
      this.setFace(!this.showingBack());
    }
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.flip(-1);
    } else if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.flip(1);
    }
  }

  private setFace(back: boolean): void {
    if (back === this.showingBack()) return;
    this.showingBack.set(back);
    this.announcement.set(`Showing the ${back ? 'back' : 'front'} of the card`);
  }

  private async loadScene(): Promise<void> {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reducedMotion || !hasWebGL()) return;
    await whenIdle();
    if (this.destroyed) return;

    try {
      const { createCardScene } = await import('./id-card-scene');
      if (this.destroyed) return;
      const scene = await createCardScene({
        container: this.stage().nativeElement.querySelector<HTMLElement>('[data-canvas]')!,
        photoUrl: PHOTO_URL,
        content: this.content,
        onFace: (back) => this.setFace(back),
        onLost: () => this.dropScene(),
      });
      if (this.destroyed) {
        scene.destroy();
        return;
      }
      this.scene = scene;
      this.sceneReady.set(true);
    } catch {
      // Keep the static card; it is a complete experience on its own.
    }
  }

  private dropScene(): void {
    this.scene?.destroy();
    this.scene = undefined;
    this.sceneReady.set(false);
  }
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 1500 });
    else setTimeout(resolve, 200);
  });
}
