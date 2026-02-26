import { Injectable, inject, OnDestroy, NgZone, signal } from '@angular/core';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'] as const;
type SectionId = typeof SECTION_IDS[number];

/** Tags where arrow keys should NOT trigger section navigation. */
const INTERACTIVE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

@Injectable({ providedIn: 'root' })
export class KeyboardNavService implements OnDestroy {
    private readonly ngZone = inject(NgZone);

    /** Index of the section currently most visible in the viewport. */
    readonly activeSectionIndex = signal(0);

    private observer: IntersectionObserver | null = null;
    private keydownHandler: ((e: KeyboardEvent) => void) | null = null;
    private isScrolling = false;

    /**
     * Call once from AppComponent's ngAfterViewInit to start listening.
     */
    init(): void {
        this.ngZone.runOutsideAngular(() => {
            this.observeSections();
            this.listenKeyboard();
        });
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        if (this.keydownHandler) {
            document.removeEventListener('keydown', this.keydownHandler);
        }
    }

    // ── Intersection Observer ──────────────────────────────────
    /** Track which section is most visible to determine the "active" one. */
    private observeSections(): void {
        const visibilityMap = new Map<string, number>();

        this.observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    visibilityMap.set(entry.target.id, entry.intersectionRatio);
                }

                // Find the section with the highest visibility
                let maxRatio = 0;
                let activeId: string = SECTION_IDS[0];
                for (const [id, ratio] of visibilityMap) {
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        activeId = id;
                    }
                }

                const idx = SECTION_IDS.indexOf(activeId as SectionId);
                if (idx !== -1 && this.activeSectionIndex() !== idx) {
                    this.ngZone.run(() => this.activeSectionIndex.set(idx));
                }
            },
            { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
        );

        for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el) this.observer.observe(el);
        }
    }

    // ── Keyboard listener ──────────────────────────────────────
    private listenKeyboard(): void {
        this.keydownHandler = (e: KeyboardEvent) => {
            // Don't hijack arrow keys when user is in an interactive element
            const tag = (document.activeElement as HTMLElement)?.tagName;
            if (tag && INTERACTIVE_TAGS.has(tag)) return;

            // Also skip if contentEditable
            if ((document.activeElement as HTMLElement)?.isContentEditable) return;

            let direction: 1 | -1 | null = null;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    direction = 1;
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    direction = -1;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            if (this.isScrolling) return;

            const currentIdx = this.activeSectionIndex();
            const nextIdx = currentIdx + direction;

            if (nextIdx < 0 || nextIdx >= SECTION_IDS.length) return;

            const targetEl = document.getElementById(SECTION_IDS[nextIdx]);
            if (!targetEl) return;

            this.isScrolling = true;
            targetEl.scrollIntoView({ behavior: 'smooth' });

            // Debounce: prevent rapid-fire navigation
            setTimeout(() => {
                this.isScrolling = false;
            }, 800);
        };

        document.addEventListener('keydown', this.keydownHandler, { passive: false });
    }
}
