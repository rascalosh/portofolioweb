import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Media } from '../../data/portfolio-data';

/**
 * The picture area of a project card. Shows the supplied image or video, or, when there is none yet,
 * a typographic placeholder. It never fakes a screenshot.
 */
@Component({
  selector: 'app-project-media',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative block aspect-[16/10] overflow-hidden bg-muted data-[empty]:aspect-[16/7]',
    '[attr.data-empty]': 'media() ? null : ""',
  },
  template: `
    @if (media(); as m) {
      @if (m.type === 'image') {
        <img
          [src]="m.src"
          [alt]="m.alt"
          [attr.width]="m.width"
          [attr.height]="m.height"
          loading="lazy"
          decoding="async"
          class="size-full object-contain transition-transform duration-300 ease-out group-hover/card:scale-[1.02]"
        />
      } @else {
        <video
          #video
          [src]="m.src"
          [poster]="m.poster ?? ''"
          [attr.width]="m.width"
          [attr.height]="m.height"
          [attr.aria-label]="m.alt"
          muted
          loop
          playsinline
          preload="none"
          class="size-full object-cover"
        ></video>
      }
    } @else {
      <div class="flex size-full items-end p-5" aria-hidden="true">
        <span class="font-mono text-5xl font-medium leading-none tracking-tight text-muted-foreground sm:text-6xl">{{ mark() }}</span>
      </div>
    }
  `,
})
export class ProjectMediaComponent {
  readonly media = input.required<Media | null>();
  /** Large typographic mark for the placeholder, e.g. "AI-ML". */
  readonly mark = input.required<string>();

  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.video()?.nativeElement;
      if (!element) return;

      // Reduced motion: no autoplay, hand control to the person.
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        element.controls = true;
        return;
      }

      // Otherwise play only while on screen.
      if (typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) void element.play().catch(() => undefined);
        else element.pause();
      });
      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
