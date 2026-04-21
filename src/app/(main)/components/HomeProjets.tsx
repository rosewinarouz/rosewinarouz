'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeProjets.module.css';
import { projectsData } from '../projects/data';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

// Highlighting 4 specific projects as requested
const highlightedSlugs = ['reconstruction', 'prescolaire', 'entrepreneuriat', 'sante'];
const highlightedProjects = highlightedSlugs
    .map(slug => projectsData.find(p => p.slug === slug))
    .filter(Boolean);

export default function HomeProjets() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const root = containerRef.current;
            if (!root) return;

            // Header reveal
            const header = root.querySelector('header');
            if (header) {
                gsap.fromTo(header,
                    { autoAlpha: 0, y: 30 },
                    {
                        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: header, start: 'top 85%' }
                    }
                );
            }

            // Cards stagger
            const cards = root.querySelectorAll(`.${styles.homeProjectCard}`);
            if (cards.length > 0) {
                gsap.fromTo(cards,
                    { autoAlpha: 0, y: 40, scale: 0.95 },
                    {
                        autoAlpha: 1, y: 0, scale: 1,
                        duration: 0.7, stagger: 0.12, ease: 'power3.out',
                        scrollTrigger: { trigger: trackRef.current, start: 'top 85%' }
                    }
                );
            }

            // CTA reveal
            const cta = root.querySelector(`.${styles.ctaContainer}`);
            if (cta) {
                gsap.fromTo(cta,
                    { autoAlpha: 0, y: 20 },
                    {
                        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out',
                        scrollTrigger: { trigger: cta, start: 'top 90%' }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!trackRef.current) return;

        const scrollAmount = 350;
        const currentScroll = trackRef.current.scrollLeft;
        const targetScroll = direction === 'left'
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount;

        trackRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <section ref={containerRef} className={styles.section}>
            <header className={styles.header}>
                <div className={styles.headerTitles}>
                    <span className="sectionEyebrow">Nos Réalisations</span>
                    <h2 className="sectionTitle">
                        Derniers <span>Projets</span>
                    </h2>
                </div>
                <div className={styles.navArrows}>
                    <button
                        className={styles.arrowBtn}
                        aria-label="Précédent"
                        onClick={() => handleScroll('left')}
                    >
                        &larr;
                    </button>
                    <button
                        className={styles.arrowBtn}
                        aria-label="Suivant"
                        onClick={() => handleScroll('right')}
                    >
                        &rarr;
                    </button>
                </div>
            </header>

            <div
                ref={trackRef}
                className={styles.track}
            >
                {highlightedProjects.map((projet) => (
                    <ProjectCard
                        key={projet!.slug}
                        project={projet!}
                        className={styles.homeProjectCard}
                    />
                ))}
            </div>

            <div className={styles.ctaContainer}>
                <Link href="/projects" className={styles.viewAllBtn}>
                    <span>Découvrir tous nos projets</span>
                    <svg className={styles.btnArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
