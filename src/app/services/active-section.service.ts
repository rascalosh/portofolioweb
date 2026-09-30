import { Injectable, OnDestroy, signal } from '@angular/core';

/** Tracks which page section sits in a thin band near the top of the viewport, for the nav's current state. */
@Injectable({ providedIn: 'root' })
export class ActiveSectionService implements OnDestroy {
    /** Fragment of the current section; empty while the hero is in view. */
    readonly activeFragment = signal('');

    private observer?: IntersectionObserver;

    init(sectionIds: readonly string[]): void {
        if (this.observer || typeof IntersectionObserver === 'undefined') return;

        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        this.activeFragment.set(entry.target.id === 'hero' ? '' : entry.target.id);
                    }
                }
            },
            { rootMargin: '-40% 0px -55% 0px' },
        );

        for (const id of sectionIds) {
            const element = document.getElementById(id);
            if (element) this.observer.observe(element);
        }
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
