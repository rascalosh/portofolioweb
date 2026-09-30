import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { CV_URL, HERO_DATA, SOCIAL_LINKS } from '../../data/portfolio-data';

const IDLE_LABEL = 'Copy Email';
const RESET_MS = 2000;

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideCheck, lucideCopy })],
  templateUrl: 'contact.html',
})
export class ContactComponent {
  private readonly emailElement = viewChild.required<ElementRef<HTMLElement>>('emailText');

  protected readonly status = HERO_DATA.status;
  protected readonly cvUrl = CV_URL;
  protected readonly email = SOCIAL_LINKS.find((link) => link.label === 'Email')!;
  protected readonly profileLinks = SOCIAL_LINKS.filter((link) => link.label !== 'Email');

  protected readonly label = signal(IDLE_LABEL);
  protected readonly done = computed(() => this.label() !== IDLE_LABEL);
  /** Read out by screen readers through a live region. */
  protected readonly announcement = signal('');

  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email.displayValue);
      this.show('Copied', 'Email address copied to the clipboard');
    } catch {
      // No clipboard access (insecure context or blocked): select the text so Ctrl+C or Cmd+C works.
      const range = document.createRange();
      range.selectNodeContents(this.emailElement().nativeElement);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.show('Email Selected', 'Email address selected. Press Control C to copy it.');
    }
  }

  private show(label: string, announcement: string): void {
    this.label.set(label);
    this.announcement.set(announcement);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.label.set(IDLE_LABEL), RESET_MS);
  }
}
