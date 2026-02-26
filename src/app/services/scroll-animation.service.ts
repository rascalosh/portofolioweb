import { Injectable, NgZone, inject } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
    private readonly ngZone = inject(NgZone);

    private scrollTriggerLoaded = false;
    private loadingPromise: Promise<void> | null = null;

    constructor() {
        this.loadScrollTrigger();
    }

    /**
     * Dynamically load ScrollTrigger (production safe).
     */
    private loadScrollTrigger(): Promise<void> {
        if (this.scrollTriggerLoaded) {
            return Promise.resolve();
        }

        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        if (typeof window === 'undefined') {
            return Promise.resolve();
        }

        this.loadingPromise = import('gsap/ScrollTrigger').then((module) => {
            gsap.registerPlugin(module.ScrollTrigger);
            this.scrollTriggerLoaded = true;

            // Small delay to ensure layout is stable
            setTimeout(() => {
                module.ScrollTrigger.refresh();
            }, 200);
        });

        return this.loadingPromise;
    }

    /**
     * Animate elements when they enter the viewport.
     */
    async animateOnScroll(
        elements: string | Element | Element[],
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        triggerElement?: string | Element,
    ): Promise<gsap.core.Tween | null> {
        await this.loadScrollTrigger();

        return this.ngZone.runOutsideAngular(() =>
            gsap.fromTo(elements, fromVars, {
                ...toVars,
                scrollTrigger: {
                    trigger: triggerElement ?? elements,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play reverse play reverse',
                    ...(toVars.scrollTrigger as any),
                },
            }),
        );
    }

    /**
     * Stagger animate children inside container.
     */
    async staggerOnScroll(
        container: string | Element,
        children: string,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        stagger = 0.1,
    ): Promise<gsap.core.Tween | null> {
        await this.loadScrollTrigger();

        return this.ngZone.runOutsideAngular(() =>
            gsap.fromTo(`${container} ${children}`, fromVars, {
                ...toVars,
                stagger,
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse',
                    ...(toVars.scrollTrigger as any),
                },
            }),
        );
    }

    /**
     * Create a timeline with ScrollTrigger.
     */
    async timelineOnScroll(
        trigger: string | Element,
        scrollTriggerVars?: any,
    ): Promise<gsap.core.Timeline | null> {
        await this.loadScrollTrigger();

        return this.ngZone.runOutsideAngular(() =>
            gsap.timeline({
                scrollTrigger: {
                    trigger,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse',
                    ...scrollTriggerVars,
                },
            }),
        );
    }

    /**
     * Refresh all ScrollTriggers.
     */
    async refresh(): Promise<void> {
        await this.loadScrollTrigger();
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        ScrollTrigger.refresh();
    }

    /**
     * Kill all ScrollTriggers.
     */
    async killAll(): Promise<void> {
        await this.loadScrollTrigger();
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        ScrollTrigger.killAll();
    }
}