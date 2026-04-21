'use client';

/**
 * Global GSAP ScrollTrigger configuration.
 *
 * The site uses a custom scroll container (#main-content) inside a
 * flex layout (DashboardLayout). The body/window never scrolls —
 * only #main-content does. This component tells ScrollTrigger to
 * watch that element by default.
 */

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GsapScrollConfig() {
    useLayoutEffect(() => {
        const scroller = document.getElementById('main-content');
        if (!scroller) return;

        // Tell every future ScrollTrigger to watch #main-content
        ScrollTrigger.defaults({ scroller });

        // Force a refresh after a short delay so all triggers recalculate
        const rafId = requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            cancelAnimationFrame(rafId);
            // Reset defaults on unmount (e.g. route changes)
            ScrollTrigger.defaults({ scroller: window });
        };
    }, []);

    return null; // renders nothing
}
