import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Text that is cut to three lines below `md`, with a Read More button that only appears when text is
 * actually hidden. From `md` up the full text always shows.
 */
@Component({
  selector: 'app-clamped-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p
      #text
      class="text-[0.9375rem] leading-relaxed text-muted-foreground data-[clamped]:line-clamp-3 md:data-[clamped]:line-clamp-none"
      [attr.data-clamped]="expanded() ? null : ''"
    >
      {{ text_() }}
    </p>
    @if (expanded() || overflowing()) {
      <button
        type="button"
        class="mt-1 inline-flex min-h-11 items-center text-[0.9375rem] font-medium underline underline-offset-4 hover:text-muted-foreground md:hidden"
        [attr.aria-expanded]="expanded()"
        (click)="expanded.set(!expanded())"
      >
        {{ expanded() ? 'Show Less' : 'Read More' }}
      </button>
    }
  `,
})
export class ClampedTextComponent {
  /** The text to show. */
  readonly text_ = input.required<string>({ alias: 'text' });

  protected readonly expanded = signal(false);
  protected readonly overflowing = signal(false);

  private readonly textElement = viewChild.required<ElementRef<HTMLElement>>('text');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.textElement().nativeElement;
      // Only measure while clamped; once expanded the button stays so the text can be collapsed again.
      const measure = () => {
        if (element.hasAttribute('data-clamped')) this.overflowing.set(element.scrollHeight > element.clientHeight + 1);
      };
      measure();
      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(measure);
      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
