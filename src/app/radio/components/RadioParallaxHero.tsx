'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './RadioParallaxHero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function RadioParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !imageWrapperRef.current || !textContainerRef.current) return;

            // Text entrance with stagger
            const title = textContainerRef.current.querySelector('h1');
            if (title) {
                const spans = title.querySelectorAll('span');
                gsap.fromTo(
                    textContainerRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
                );
                if (spans.length > 0) {
                    gsap.fromTo(spans,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, stagger: 0.1, ease: "power3.out" }
                    );
                }
            }

            // Parallax scrolling — scroller set globally by GsapScrollConfig
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            }).to(imageWrapperRef.current, {
                yPercent: 50,
                opacity: 0.5,
                ease: "none"
            });

        }, containerRef); // Scoped to container for proper cleanup

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={styles.heroContainer}>
            <div ref={imageWrapperRef} className={styles.imageWrapper}>
                <Image
                    src="/radio rose winarouz.png"
                    alt="Radio Associative Rose Winarouz"
                    fill
                    priority
                    className={styles.backgroundImage}
                />
            </div>

            <div className={styles.contentOverlay}>
                <div
                    ref={textContainerRef}
                    className={styles.textContainer}
                >
                    <h1 className={styles.mainTitle}>
                        Radio Associative <br />
                        <span>Rose Winarouz</span>
                    </h1>
                </div>
            </div>

            {/* Bottom gradient fade into page content */}
            <div className={styles.bottomGradient} />
        </div>
    );
}
