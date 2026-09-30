import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

/** Floating "back to top" button. Appears once the visitor has scrolled roughly one screen. */
@Component({
  selector: 'app-back-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideArrowUp })],
  host: { class: 'fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8' },
  template: `
    <button
      hlmBtn
      variant="outline"
      size="icon"
      type="button"
      aria-label="Back to top"
      title="Back to top"
      class="bg-background transition-[opacity,translate] duration-200 ease-out"
      [class.pointer-events-none]="!visible()"
      [class.opacity-0]="!visible()"
      [class.translate-y-2]="!visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : 'true'"
      (click)="scrollToTop()"
    >
      <ng-icon name="lucideArrowUp" size="18" aria-hidden="true" />
    </button>
  `,
})
export class BackToTopComponent {
  protected readonly visible = signal(false);

  constructor(destroyRef: DestroyRef) {
    afterNextRender(() => {
      const update = () => this.visible.set(window.scrollY > window.innerHeight);
      update();
      window.addEventListener('scroll', update, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  protected scrollToTop(): void {
    // Smooth scrolling is already gated by prefers-reduced-motion in styles.css.
    window.scrollTo({ top: 0 });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }
}
