import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-contact',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule],
    template: `
    <section
      id="contact"
      class="py-24 px-6"
      aria-labelledby="contact-heading"
    >
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="text-sm font-semibold tracking-widest uppercase"
            [class]="isDark() ? 'text-primary-400' : 'text-primary-500'"
          >
            Contact
          </span>
          <h2 id="contact-heading" class="font-display text-3xl sm:text-4xl font-bold mt-2">
            Get In Touch
          </h2>
          <p class="mt-4 max-w-lg mx-auto"
            [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <!-- Contact Form -->
        <div
          class="rounded-2xl p-8 sm:p-10 transition-colors duration-300"
          [class]="isDark()
            ? 'bg-card-dark border border-border-dark'
            : 'bg-card-light border border-border-light shadow-sm'"
        >
          @if (submitted()) {
            <div class="text-center py-8" role="status">
              <div class="text-4xl mb-4" aria-hidden="true">✉️</div>
              <h3 class="font-display text-xl font-bold mb-2">Message Sent!</h3>
              <p [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          } @else {
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
              <div class="grid sm:grid-cols-2 gap-6 mb-6">
                <!-- Name -->
                <div>
                  <label
                    for="contact-name"
                    class="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="name"
                    class="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 border outline-none"
                    [class]="isDark()
                      ? 'bg-surface-dark border-border-dark text-text-dark placeholder:text-muted-dark focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                      : 'bg-surface-light border-border-light text-text-light placeholder:text-muted-light focus:border-primary-400 focus:ring-1 focus:ring-primary-400'"
                    placeholder="Your name"
                    [attr.aria-invalid]="contactForm.controls.name.touched && contactForm.controls.name.invalid"
                    [attr.aria-describedby]="contactForm.controls.name.touched && contactForm.controls.name.invalid ? 'name-error' : null"
                  >
                  @if (contactForm.controls.name.touched && contactForm.controls.name.invalid) {
                    <p id="name-error" class="text-red-500 text-xs mt-1.5" role="alert">Name is required.</p>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label
                    for="contact-email"
                    class="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    class="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 border outline-none"
                    [class]="isDark()
                      ? 'bg-surface-dark border-border-dark text-text-dark placeholder:text-muted-dark focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                      : 'bg-surface-light border-border-light text-text-light placeholder:text-muted-light focus:border-primary-400 focus:ring-1 focus:ring-primary-400'"
                    placeholder="you@example.com"
                    [attr.aria-invalid]="contactForm.controls.email.touched && contactForm.controls.email.invalid"
                    [attr.aria-describedby]="contactForm.controls.email.touched && contactForm.controls.email.invalid ? 'email-error' : null"
                  >
                  @if (contactForm.controls.email.touched && contactForm.controls.email.invalid) {
                    <p id="email-error" class="text-red-500 text-xs mt-1.5" role="alert">
                      @if (contactForm.controls.email.errors?.['required']) {
                        Email is required.
                      } @else {
                        Please enter a valid email.
                      }
                    </p>
                  }
                </div>
              </div>

              <!-- Message -->
              <div class="mb-6">
                <label
                  for="contact-message"
                  class="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  rows="5"
                  class="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 border outline-none resize-y"
                  [class]="isDark()
                    ? 'bg-surface-dark border-border-dark text-text-dark placeholder:text-muted-dark focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                    : 'bg-surface-light border-border-light text-text-light placeholder:text-muted-light focus:border-primary-400 focus:ring-1 focus:ring-primary-400'"
                  placeholder="Tell me about your project..."
                  [attr.aria-invalid]="contactForm.controls.message.touched && contactForm.controls.message.invalid"
                  [attr.aria-describedby]="contactForm.controls.message.touched && contactForm.controls.message.invalid ? 'message-error' : null"
                ></textarea>
                @if (contactForm.controls.message.touched && contactForm.controls.message.invalid) {
                  <p id="message-error" class="text-red-500 text-xs mt-1.5" role="alert">Message is required.</p>
                }
              </div>

              <!-- Submit -->
              <button
                type="submit"
                [disabled]="contactForm.invalid"
                class="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 cursor-pointer border-0 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/25"
              >
                Send Message
              </button>
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
    private readonly themeService = inject(ThemeService);
    private readonly fb = inject(FormBuilder);

    protected readonly isDark = this.themeService.isDark;
    protected readonly submitted = signal(false);

    protected readonly contactForm = this.fb.nonNullable.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required],
    });

    protected onSubmit(): void {
        if (this.contactForm.valid) {
            // In a real app, you'd send the form data to an API here
            this.submitted.set(true);
        } else {
            this.contactForm.markAllAsTouched();
        }
    }
}
