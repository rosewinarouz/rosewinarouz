'use client';

import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
    /** CSS selector for elements to reveal (default: '.reveal') */
    selector?: string;
    /** Stagger delay between elements in seconds (default: 0.12) */
    stagger?: number;
    /** Animation duration in seconds (default: 0.8) */
    duration?: number;
    /** ScrollTrigger start position (default: 'top 85%') */
    start?: string;
    /** Whether to batch all elements in one timeline vs individual triggers (default: false) */
    batch?: boolean;
}

/**
 * Reusable GSAP ScrollTrigger reveal hook.
 * Finds all elements matching `selector` inside `containerRef` and animates them
 * from invisible (autoAlpha: 0, y: 30) to visible on scroll.
 * Uses gsap.context() for bulletproof React cleanup.
 */
export function useGsapReveal(
    containerRef: RefObject<HTMLElement | null>,
    options: RevealOptions = {},
    deps: unknown[] = []
) {
    const {
        selector = '.reveal',
        stagger = 0.12,
        duration = 0.8,
        start = 'top 85%',
        batch = false,
    } = options;

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const elements = container.querySelectorAll<HTMLElement>(selector);
            if (elements.length === 0) return;

            if (batch) {
                // Batch mode: one ScrollTrigger, all elements stagger together
                gsap.fromTo(
                    elements,
                    { autoAlpha: 0, y: 30 },
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration,
                        stagger,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: elements[0],
                            start,
                            toggleActions: 'play none none none',
                        },
                    }
                );
            } else {
                // Individual mode: each element gets its own ScrollTrigger
                elements.forEach((el) => {
                    gsap.fromTo(
                        el,
                        { autoAlpha: 0, y: 30 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: el,
                                start,
                                toggleActions: 'play none none none',
                            },
                        }
                    );
                });
            }
        }, container);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}

/**
 * Creates a gsap.context() scoped to a container ref.
 * Returns cleanup via revert(). Use this for custom GSAP logic
 * that needs proper React lifecycle management.
 */
export function useGsapContext(
    containerRef: RefObject<HTMLElement | null>,
    callback: (ctx: gsap.Context) => void,
    deps: unknown[] = []
) {
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            callback(ctx);
        }, container);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
