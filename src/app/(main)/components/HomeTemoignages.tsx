'use client';

import type React from 'react';
import { useState, useCallback, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import styles from './HomeTemoignages.module.css';

const testimonials = [
    // Projet "Ana w Sa7ti" – Santé & Sensibilisation
    {
        quote: 'Avant les séances, beaucoup de sujets restaient tabous. Aujourd\'hui, je comprends mieux mon corps et je sais quand consulter. Cela m\'a donné une vraie autonomie.',
        author: 'Meryem',
        role: 'Bénéficiaire, 22 ans',
        company: 'Projet Ana w Sa7ti',
    },
    {
        quote: 'La formation en premiers secours m\'a donné des compétences pratiques que j\'utilise dans mon douar. Je me sens utile et responsable.',
        author: 'Ahmed',
        role: 'Relais Communautaire',
        company: 'Projet Ana w Sa7ti',
    },
    {
        quote: 'Nous avons appris des gestes simples mais essentiels pour protéger la santé de nos enfants. L\'impact est visible dans notre quotidien.',
        author: 'Latifa',
        role: 'Mère de famille',
        company: 'Projet Ana w Sa7ti',
    },
    // Projet "Tifawin" – Résilience & Reconstruction territoriale
    {
        quote: 'Après le séisme, nous avions perdu espoir. Le projet nous a aidés à reprendre confiance et à reconstruire une dynamique collective.',
        author: 'Aïcha',
        role: 'Membre coopérative',
        company: 'Projet Tifawin',
    },
    {
        quote: 'La formation m\'a montré que l\'agriculture peut être moderne et rentable. Je vois désormais un avenir dans mon territoire.',
        author: 'Hamza',
        role: 'Bénéficiaire, 19 ans',
        company: 'Projet Tifawin',
    },
    {
        quote: 'L\'accompagnement proposé est structuré et durable. Il ne s\'agit pas d\'une aide ponctuelle, mais d\'un vrai renforcement des capacités locales.',
        author: 'Membre comité local',
        role: 'Comité local',
        company: 'Projet Tifawin',
    },
    // Renforcement des capacités & Entrepreneuriat
    {
        quote: 'Je n\'avais jamais osé lancer mon propre projet. Grâce à la formation, j\'ai acquis les bases et j\'ai aujourd\'hui ma petite entreprise.',
        author: 'Samira',
        role: 'Jeune entrepreneure',
        company: 'Renforcement des capacités',
    },
    {
        quote: 'Les ateliers m\'ont beaucoup apporté sur le plan de la gestion et de l\'organisation. C\'est une formation de qualité.',
        author: 'Omar',
        role: 'Gérant de coopérative',
        company: 'Renforcement des capacités',
    },
    {
        quote: 'Le projet a permis de créer une dynamique locale positive et encourageante pour les jeunes.',
        author: 'Yassine',
        role: 'Bénéficiaire, 24 ans',
        company: 'Renforcement des capacités',
    },
    // Réhabilitation d'espaces communautaires
    {
        quote: 'La réhabilitation de l\'espace a profondément amélioré notre quotidien. Nous disposons désormais d\'un lieu sécurisé et fonctionnel.',
        author: 'Fatima',
        role: 'Habitante',
        company: 'Réhabilitation communautaire',
    },
    {
        quote: 'Aujourd\'hui, nous pouvons organiser des activités dans des conditions dignes et adaptées.',
        author: 'Anouar',
        role: 'Bénéficiaire, 18 ans',
        company: 'Réhabilitation communautaire',
    },
    {
        quote: 'Le projet a également renforcé la gestion collective et la responsabilité locale autour de l\'espace réhabilité.',
        author: 'Membre comité de gestion',
        role: 'Comité de gestion',
        company: 'Réhabilitation communautaire',
    },
    // Orientation scolaire & professionnelle
    {
        quote: 'La séance d\'orientation m\'a permis de clarifier mon projet d\'études et d\'envisager l\'avenir avec plus de confiance.',
        author: 'Youssef',
        role: 'Bénéficiaire, 20 ans',
        company: 'Orientation scolaire',
    },
    {
        quote: 'Nous avons été accompagnés pour identifier les opportunités de formation qui correspondent à nos aspirations professionnelles.',
        author: 'Khadija',
        role: 'Bachelière',
        company: 'Orientation scolaire',
    },
    {
        quote: 'Bénéficier d\'un tel accompagnement dans notre région est une chance inestimable pour les jeunes qui veulent poursuivre leurs études.',
        author: 'Ahmed',
        role: 'Parent d\'élève',
        company: 'Orientation scolaire',
    },
];

function SplitText({ text, activeIndex }: { text: string; activeIndex: number }) {
    const words = text.split(' ');
    const containerRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;
            const spans = containerRef.current.children;
            gsap.fromTo(spans,
                { opacity: 0, y: 20, filter: 'blur(8px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.4,
                    stagger: 0.03,
                    ease: "power3.out",
                    overwrite: "auto"
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [activeIndex, text]);

    return (
        <span ref={containerRef} style={{ display: 'inline' }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{ display: 'inline-block', marginRight: '0.25em', opacity: 0 }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}

export default function HomeTemoignages() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const cursorOuterRef = useRef<HTMLDivElement>(null);
    const cursorInnerRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLSpanElement>(null);
    const indexIndicatorRef = useRef<HTMLDivElement>(null);
    const avatarDotsRef = useRef<HTMLDivElement>(null);
    const currentQuoteRef = useRef<HTMLQuoteElement>(null);
    const authorInfoRef = useRef<HTMLDivElement>(null);
    const authorLineRef = useRef<HTMLDivElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);

    const xTo = useRef<gsap.QuickToFunc | null>(null);
    const yTo = useRef<gsap.QuickToFunc | null>(null);

    // Setup cursor tracking — runs once
    useLayoutEffect(() => {
        if (cursorOuterRef.current) {
            xTo.current = gsap.quickTo(cursorOuterRef.current, "x", { duration: 0.4, ease: "power3.out" });
            yTo.current = gsap.quickTo(cursorOuterRef.current, "y", { duration: 0.4, ease: "power3.out" });
        }

        // Initial reveals
        if (indexIndicatorRef.current && avatarDotsRef.current) {
            gsap.to(indexIndicatorRef.current, { opacity: 1, delay: 0.5, duration: 0.3 });
            gsap.to(avatarDotsRef.current, { opacity: 0.7, delay: 0.6, duration: 0.3 });
        }
    }, []);

    // Cursor hover state — lightweight, no context needed
    useLayoutEffect(() => {
        if (!cursorInnerRef.current || !cursorTextRef.current) return;
        if (isHovered) {
            gsap.to(cursorInnerRef.current, { width: 80, height: 80, opacity: 1, duration: 0.4, ease: "back.out(1.7)", overwrite: "auto" });
            gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.3, delay: 0.1, overwrite: "auto" });
        } else {
            gsap.to(cursorInnerRef.current, { width: 0, height: 0, opacity: 0, duration: 0.3, ease: "power3.out", overwrite: "auto" });
            gsap.to(cursorTextRef.current, { opacity: 0, duration: 0.2, overwrite: "auto" });
        }
    }, [isHovered]);

    // Quote transition animations — per activeIndex
    useLayoutEffect(() => {
        if (!authorInfoRef.current || !authorLineRef.current || !currentQuoteRef.current || !progressFillRef.current) return;

        // Quote entrance
        gsap.fromTo(currentQuoteRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" }
        );

        // Author info entrance
        gsap.fromTo([authorInfoRef.current, authorLineRef.current],
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2, ease: "power2.out" }
        );

        // Progress bar: reset then fill over 5s
        gsap.set(progressFillRef.current, { scaleX: 0 });
        gsap.to(progressFillRef.current, {
            scaleX: 1,
            duration: 5,
            ease: "none",
        });
    }, [activeIndex]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current || !xTo.current || !yTo.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            xTo.current(e.clientX - rect.left);
            yTo.current(e.clientY - rect.top);
        },
        [],
    );

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const current = testimonials[activeIndex];

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className="sectionEyebrow">Témoignages</span>
                <h2 className="sectionTitle">
                    Ce qu&apos;ils <span>disent</span> de nous
                </h2>
            </div>

            <div
                ref={containerRef}
                className={styles.container}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleNext}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNext(); } }}
                role="button"
                tabIndex={0}
                aria-label={`Témoignage ${activeIndex + 1} sur ${testimonials.length}. Appuyez pour le suivant.`}
            >
                {/* Custom magnetic cursor */}
                <div
                    ref={cursorOuterRef}
                    className={styles.cursorOuter}
                    style={{
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        ref={cursorInnerRef}
                        className={styles.cursorInner}
                        style={{ width: 0, height: 0, opacity: 0 }}
                    >
                        <span
                            ref={cursorTextRef}
                            className={styles.cursorText}
                            style={{ opacity: 0 }}
                        >
                            Suivant
                        </span>
                    </div>
                </div>

                {/* Index indicator */}
                <div
                    ref={indexIndicatorRef}
                    className={styles.indexIndicator}
                    style={{ opacity: 0 }}
                >
                    <span
                        className={styles.indexCurrent}
                        key={activeIndex}
                        style={{ display: 'inline-block' }}
                    >
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.indexSep}>/</span>
                    <span className={styles.indexTotal}>{String(testimonials.length).padStart(2, '0')}</span>
                </div>

                {/* Quote */}
                <div className={styles.content}>
                    <blockquote
                        ref={currentQuoteRef}
                        key={`quote-${activeIndex}`}
                        className={styles.quote}
                    >
                        &ldquo;<SplitText text={current.quote} activeIndex={activeIndex} />&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className={styles.authorRow}>
                        <div className={styles.authorAvatar}>
                            <span className={styles.authorInitials}>
                                {current.author.split(' ').map(w => w[0]).join('')}
                            </span>
                        </div>

                        <div
                            key={`author-${activeIndex}`}
                            ref={authorInfoRef}
                            className={styles.authorInfo}
                        >
                            <div
                                ref={authorLineRef}
                                className={styles.authorLine}
                            />
                            <span className={styles.authorName}>{current.author}</span>
                            <span className={styles.authorRole}>
                                {current.role} — {current.company}
                            </span>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className={styles.progressTrack}>
                        <div
                            ref={progressFillRef}
                            className={styles.progressFill}
                            style={{ transformOrigin: 'left center' }}
                        />
                    </div>
                </div>

                {/* Hint */}
                <div
                    className={styles.hint}
                    style={{ opacity: isHovered ? 0.4 : 0.2, transition: 'opacity 0.3s' }}
                >
                    Cliquez pour suivant
                </div>

                {/* Mobile Next Arrow */}
                <button
                    className={styles.mobileNextBtn}
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    aria-label="Témoignage suivant"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </section>
    );
}
