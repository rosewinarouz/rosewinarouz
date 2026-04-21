'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './RadioPreloader.module.css';

export default function RadioPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const wavesRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    useLayoutEffect(() => {

        const hasLoaded = sessionStorage.getItem('radio_preloaded');
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        if (!containerRef.current || !wavesRef.current || !textRef.current) return;

        // Block scrolling during preloader
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('radio_preloaded', 'true');
                    document.body.style.overflow = '';
                    setIsLoading(false);
                }
            });

            // Initial state
            gsap.set(containerRef.current, { autoAlpha: 1 });
            gsap.set(textRef.current, { autoAlpha: 0, y: 15 });

            const bars = wavesRef.current?.children;
            if (bars) {
                gsap.set(bars, { scaleY: 0.1, autoAlpha: 0 });
            }

            // Entrance
            tl.to(textRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            if (bars) {
                // Wave pulsing entrance
                tl.to(bars, {
                    autoAlpha: 1,
                    scaleY: "random(0.4, 1)",
                    duration: 0.4,
                    stagger: {
                        each: 0.1,
                        yoyo: true,
                        repeat: 4
                    },
                    ease: "sine.inOut"
                }, "-=0.4");
            }

            // Hold and exit
            tl.to(containerRef.current, {
                autoAlpha: 0,
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.inOut',
                clearProps: 'all'
            }, "+=0.2");

        });

        return () => {
            document.body.style.overflow = '';
            ctx.revert();
        };
    }, []);

    if (!isLoading) return null;

    return (
        <div ref={containerRef} className={styles.radioPreloader}>
            <div className={styles.content}>
                <div ref={wavesRef} className={styles.soundWaves}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <h1 ref={textRef} className={styles.radioTitle}>
                    Radio <span className={styles.goldText}>Winarouz</span>
                </h1>
            </div>
        </div>
    );
}
