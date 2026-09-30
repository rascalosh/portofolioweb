import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

/**
 * Follows the system theme by default. A choice made with the toggle is saved and wins until it
 * matches the system theme again, at which point the override is cleared and the site follows the system.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly win = this.document.defaultView;

    private readonly systemDark = signal(false);
    private readonly saved = signal<Theme | null>(null);

    readonly isDark = computed(() => (this.saved() ?? (this.systemDark() ? 'dark' : 'light')) === 'dark');

    constructor() {
        if (this.win) {
            const query = this.win.matchMedia?.('(prefers-color-scheme: dark)');
            if (query) {
                this.systemDark.set(query.matches);
                query.addEventListener('change', (event) => this.systemDark.set(event.matches));
            }

            try {
                const stored = this.win.localStorage.getItem('theme');
                if (stored === 'light' || stored === 'dark') this.saved.set(stored);
            } catch {
                // Storage can be blocked; the site then simply follows the system.
            }
        }

        effect(() => this.document.documentElement.classList.toggle('dark', this.isDark()));
    }

    toggle(): void {
        const next: Theme = this.isDark() ? 'light' : 'dark';
        const matchesSystem = (next === 'dark') === this.systemDark();
        this.saved.set(matchesSystem ? null : next);

        try {
            if (matchesSystem) this.win?.localStorage.removeItem('theme');
            else this.win?.localStorage.setItem('theme', next);
        } catch {
            // Ignore blocked storage; the choice still applies for this visit.
        }
    }
}
