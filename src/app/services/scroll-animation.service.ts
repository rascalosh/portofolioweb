import { Injectable, NgZone, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({ providedIn: 'root' })
export class ScrollAnimationService {
    private readonly ngZone = inject(NgZone);

    /**
     * Animate elements when they enter the viewport.
     * Runs outside Angular zone for performance.
     */
    animateOnScroll(
        elements: string | Element | Element[],
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        triggerElement?: string | Element,
    ): gsap.core.Tween {
        return this.ngZone.runOutsideAngular(() =>
            gsap.fromTo(elements, fromVars, {
                ...toVars,
                scrollTrigger: {
                    trigger: (triggerElement as any) ?? (elements as any),
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play reverse play reverse',
                    ...(toVars.scrollTrigger as any),
                },
            }),
        );
    }

    /**
     * Stagger animate children of a container.
     */
    staggerOnScroll(
        container: string | Element,
        children: string,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        stagger = 0.1,
    ): gsap.core.Tween {
        return this.ngZone.runOutsideAngular(() =>
            gsap.fromTo(`${container} ${children}`, fromVars, {
                ...toVars,
                stagger,
                scrollTrigger: {
                    trigger: container as any,
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
    timelineOnScroll(
        trigger: string | Element,
        scrollTriggerVars?: ScrollTrigger.Vars,
    ): gsap.core.Timeline {
        return this.ngZone.runOutsideAngular(() =>
            gsap.timeline({
                scrollTrigger: {
                    trigger: trigger as any,
                    start: 'top 85%',
                    toggleActions: 'play reverse play reverse',
                    ...scrollTriggerVars,
                },
            }),
        );
    }

    /**
     * Refresh all ScrollTrigger instances.
     */
    refresh(): void {
        ScrollTrigger.refresh();
    }

    /**
     * Kill all ScrollTrigger instances — call on destroy if needed.
     */
    killAll(): void {
        ScrollTrigger.killAll();
    }
}
