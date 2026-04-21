'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './HomeFeatured.module.css';
import { ArrowDown } from 'lucide-react';

export default function HomeFeatured() {
    const wrapperRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set([taglineRef.current, titleRef.current, descRef.current, buttonsRef.current], { 
                autoAlpha: 0, 
                y: 30 
            });
            gsap.set(scrollIndicatorRef.current, { autoAlpha: 0 });

            // Entrance animation timeline
            const tl = gsap.timeline({ delay: 0.3 });

            tl.to(taglineRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
            .to(titleRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.6')
            .to(descRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .to(buttonsRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .to(scrollIndicatorRef.current, {
                autoAlpha: 1,
                duration: 1,
                ease: 'power2.out'
            }, '-=0.4');

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    const handleDonationScroll = () => {
        const donationSection = document.getElementById('donation');
        if (donationSection) {
            donationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section ref={wrapperRef} className={styles.heroSection}>
            {/* Background Video */}
            <video 
                className={styles.backgroundVideo} 
                autoPlay 
                loop 
                muted 
                playsInline
            >
                <source src="/alhaouz.mp4" type="video/mp4" />
            </video>
            <div className={styles.videoOverlay} aria-hidden="true" />

            <div className={styles.content}>
                <div ref={taglineRef} className={styles.taglineWrapper}>
                    <span className={styles.tagline}>Association Rose Winarouz</span>
                </div>
                
                <h1 ref={titleRef} className={styles.title}>
                    Agir localement pour <br />
                    <span>transformer durablement</span> <br />
                    les territoires
                </h1>

                <p ref={descRef} className={styles.subtitle}>
                    Rose Winarouz est une association qui agit localement pour transformer durablement les territoires — à travers le développement territorial durable et l’intelligence des territoires au Maroc.
                </p>

                <div ref={buttonsRef} className={styles.actions}>
                    <Link href="/about" className={styles.primaryBtn}>
                        <span>Découvrir notre vision</span>
                    </Link>
                    <button onClick={handleDonationScroll} className={styles.secondaryBtn}>
                        <span>Soutenir l'action</span>
                    </button>
                </div>
            </div>

            <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
                <ArrowDown className={styles.scrollIcon} size={20} />
            </div>
        </section>
    );
}
