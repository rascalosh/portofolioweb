import { ChangeDetectionStrategy, Component, input } from '@angular/core';

const REPEATS = Array.from({ length: 10 });

/**
 * A slanted caution-tape band that sits in the gap between two sections.
 * Purely decorative: hidden from assistive tech, and it stops moving under reduced motion.
 */
@Component({
  selector: 'app-tape',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Clip sideways only: the rotated band needs vertical room so its top and bottom edges are never cut.
    class: 'pointer-events-none relative z-10 -my-10 block overflow-x-clip py-14 md:-my-14 md:py-20',
    'aria-hidden': 'true',
  },
  template: `
    <div
      class="-mx-[15%] overflow-hidden border-y-2 border-active-foreground bg-active py-2 text-active-foreground"
      [class]="tilt() === 1 ? 'rotate-[2.5deg]' : '-rotate-[2.5deg]'"
    >
      <div class="flex w-max animate-tape whitespace-nowrap font-[family-name:var(--font-tape)] text-xl font-extrabold uppercase leading-none tracking-[0.12em]">
        @for (copy of [0, 1]; track copy) {
          <div class="flex shrink-0">
            @for (_ of repeats; track $index) {
              <span class="px-5">{{ label() }}</span>
              <span class="px-5 opacity-60">&times;</span>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class TapeComponent {
  /** Text repeated along the band, usually the name of the section that follows. */
  readonly label = input.required<string>();
  /** Slant direction; alternate it so a run of bands does not look stamped. */
  readonly tilt = input<1 | -1>(1);
  protected readonly repeats = REPEATS;
}
