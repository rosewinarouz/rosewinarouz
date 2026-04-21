'use client';

import { useState, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './MainPreloader.module.css';

export default function MainPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useLayoutEffect(() => {
        // Only run for home page and first overall load
        const hasLoaded = sessionStorage.getItem('main_preloaded');
        const isHome = pathname === '/';

        if (hasLoaded && !isHome) {
            setIsLoading(false);
            return;
        }

        // Optional: If you only want it on the very first session load, uncomment this:
        // if (hasLoaded) { setIsLoading(false); return; }

        if (!containerRef.current || !logoRef.current || !textRef.current) return;

        // Block scrolling during preloader
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    sessionStorage.setItem('main_preloaded', 'true');
                    document.body.style.overflow = '';
                    setIsLoading(false);
                }
            });

            // Initial state
            gsap.set(containerRef.current, { autoAlpha: 1 });
            gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.8, filter: 'blur(10px)' });
            gsap.set(textRef.current, { autoAlpha: 0, y: 20 });

            // Entrance
            tl.to(logoRef.current, {
                autoAlpha: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out'
            })
                .to(textRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                }, "-=0.6")

                // Hold
                .to({}, { duration: 0.6 })

                // Exit: The whole container slides up while logo scales down
                .to(logoRef.current, {
                    scale: 0.9,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: 'power2.inOut'
                })
                .to(textRef.current, {
                    autoAlpha: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in'
                }, "<")
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'expo.inOut',
                    clearProps: 'all' // Cleanup
                }, "-=0.2");
        });

        return () => {
            document.body.style.overflow = '';
            ctx.revert();
        };
    }, [pathname]);

    if (!isLoading) return null;

    return (
        <div ref={containerRef} className={styles.preloaderContainer}>
            <div className={styles.content}>
                <div ref={logoRef} className={styles.logoWrapper}>
                    <Image
                        src="/logo - RGB.png"
                        alt="Rose Winarouz"
                        width={240}
                        height={240}
                        priority
                        className={styles.logoImage}
                    />
                </div>
                <div ref={textRef} className={styles.textWrapper}>
                    <span className={styles.subtitle}>Agir localement. Transformer durablement.</span>
                    <div className={styles.progressLine}>
                        <div className={styles.progressFill}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
