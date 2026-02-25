import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    private readonly darkMode = signal(this.getInitialTheme());

    readonly isDark = computed(() => this.darkMode());

    constructor() {
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const body = this.document.body;
                if (this.darkMode()) {
                    body.classList.add('dark');
                } else {
                    body.classList.remove('dark');
                }
                localStorage.setItem('theme', this.darkMode() ? 'dark' : 'light');
            }
        });
    }

    toggle(): void {
        this.darkMode.update((v) => !v);
    }

    private getInitialTheme(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const stored = localStorage.getItem('theme');
            if (stored) {
                return stored === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }
}
