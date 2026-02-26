import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-contact',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <section id="contact" class="py-24 px-6"
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
          <p class="mt-4 max-w-xl mx-auto"
            [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
          >
            Feel free to reach out through any of the platforms below, I'd love to connect!
          </p>
        </div>

        <!-- Contact Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          @for (contact of contacts; track contact.label) {
            <a
              [href]="contact.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex flex-col items-center gap-4 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              [class]="isDark()
                ? 'bg-card-dark border border-border-dark hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/5'
                : 'bg-card-light border border-border-light hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100'"
              [attr.aria-label]="'Contact via ' + contact.label"
            >
              <!-- Icon -->
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                [class]="isDark()
                  ? 'bg-primary-600/15 text-primary-300 group-hover:bg-primary-600/25'
                  : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7" aria-hidden="true">
                  <path [attr.d]="contact.svgPath" />
                </svg>
              </div>

              <!-- Label -->
              <h3 class="font-display text-lg font-semibold">
                {{ contact.label }}
              </h3>

              <!-- Value -->
              <span class="text-sm text-center"
                [class]="isDark() ? 'text-muted-dark' : 'text-muted-light'"
              >
                {{ contact.displayValue }}
              </span>

              <!-- Hover CTA -->
              <span class="text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                [class]="isDark()
                  ? 'bg-primary-600/15 text-primary-300'
                  : 'bg-primary-50 text-primary-600'"
              >
                {{ contact.cta }}
              </span>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
    private readonly themeService = inject(ThemeService);
    protected readonly isDark = this.themeService.isDark;

    protected readonly contacts = [
        {
            label: 'WhatsApp',
            url: 'https://wa.me/6288297999171',
            displayValue: '+62 882-9799-9171',
            cta: 'Send a message →',
            svgPath: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
        },
        {
            label: 'Email',
            url: 'mailto:willbertlian@gmail.com',
            displayValue: 'willbertlian@gmail.com',
            cta: 'Send an email →',
            svgPath: 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
        },
        {
            label: 'Instagram',
            url: 'https://instagram.com/willbertbudi',
            displayValue: '@willbertlian',
            cta: 'Follow me →',
            svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
        },
    ];
}
