'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData, getProjectBySlug, getProjectImages } from '../data';
import ProjectCard from '../../components/ProjectCard';
import styles from './ProjectDetailPage.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const images = getProjectImages(project);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIdx, setLightboxIdx] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const sectionRef = useRef<HTMLDivElement>(null);
    const galleryGridRef = useRef<HTMLDivElement>(null);
    const timelineSectionRef = useRef<HTMLElement>(null);

    const navigateLightbox = (step: number) => {
        setDirection(step);
        setLightboxIdx((i) => (i + step + images.length) % images.length);
    };

    const openLightbox = (idx: number) => {
        setDirection(0);
        setLightboxIdx(idx);
        setLightboxOpen(true);
    };

    // GSAP ScrollTrigger reveals for general sections
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
            elements?.forEach((el) => {
                if (el.classList.contains(styles.gallerySection)) return; // Handle separately

                gsap.fromTo(el,
                    { autoAlpha: 0, y: 30 },
                    {
                        autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                );
            });

            // Staggered Gallery Items
            const galleryItems = galleryGridRef.current?.querySelectorAll(`.${styles.galleryItem}`);
            if (galleryItems && galleryItems.length > 0) {
                gsap.from(galleryItems,
                    {
                        autoAlpha: 0,
                        scale: 0.9,
                        y: 40,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: galleryGridRef.current,
                            start: 'top 85%',
                        }
                    }
                );
            }

            // Ensure markers and triggers are correct after calculations
            ScrollTrigger.refresh();
        }, sectionRef);
        return () => ctx.revert();
    }, [project, images]);

    // Timeline cards entrance animation
    useLayoutEffect(() => {
        const section = timelineSectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const cards = section.querySelectorAll(`.${styles.detailCard}`);
            if (cards.length === 0) return;

            gsap.fromTo(cards,
                { autoAlpha: 0, y: 30, scale: 0.95 },
                {
                    autoAlpha: 1, y: 0, scale: 1,
                    duration: 0.6, stagger: 0.1, ease: 'back.out(1.3)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                    }
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    // Close lightbox on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
        };
        if (lightboxOpen) {
            window.addEventListener('keydown', handleKey);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxOpen, images.length]);
    const otherProjects = projectsData.filter((p) => p.slug !== slug);
    const heroImage = images[0] || '/logo - RGB.png';

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active': return styles.statusActive;
            case 'completed': return styles.statusCompleted;
            case 'phase': return styles.statusPhase;
            default: return '';
        }
    };

    return (
        <div className={styles.pageWrapper} ref={sectionRef}>
            {/* ===== HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroImageWrap}>
                    <Image
                        src={heroImage}
                        alt={project.title}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                </div>
                <div className={styles.heroOverlay} aria-hidden="true" />
                <div className={styles.heroContent}>
                    <Link href="/projects" className={styles.backLink}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Retour aux projets
                    </Link>

                    <span className={styles.heroCategoryBadge}>{project.category}</span>
                    <h1 className={styles.heroTitle}>{project.title}</h1>

                    <div className={styles.heroMeta}>
                        <div className={styles.heroStatus}>
                            <span className={`${styles.statusDot} ${getStatusClass(project.status)}`} />
                            <span>{project.statusLabel}</span>
                        </div>
                        <div className={styles.heroProgress}>
                            <span>{project.progress}%</span>
                            <div className={styles.heroProgressTrack}>
                                <div
                                    className={styles.heroProgressFill}
                                    style={{ width: `${project.progress}%`, background: project.color }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HORIZONTAL TIMELINE ===== */}
            <section ref={timelineSectionRef} className={styles.detailsSection}>
                <div className={styles.timelineHeader}>
                    <span className="sectionEyebrow">En détail</span>
                    <h2 className={styles.sectionTitle} style={{ textAlign: 'center', justifyContent: 'center' }}>
                        Fiche projet
                    </h2>
                </div>

                <div className={styles.timelineWrapper}>
                    <div className={styles.timelineTrack}>

                        <div className={styles.detailCard}>
                            <span className={styles.stepBadge}>01</span>
                            <div className={styles.detailIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <h3 className={styles.detailLabel}>Description</h3>
                            <p className={styles.detailText}>{project.description}</p>
                        </div>

                        <div className={styles.detailCard}>
                            <span className={styles.stepBadge}>02</span>
                            <div className={styles.detailIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="16" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                </svg>
                            </div>
                            <h3 className={styles.detailLabel}>Objectif</h3>
                            <p className={styles.detailText}>{project.objective}</p>
                        </div>

                        <div className={styles.detailCard}>
                            <span className={styles.stepBadge}>03</span>
                            <div className={styles.detailIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h3 className={styles.detailLabel}>Public cible</h3>
                            <p className={styles.detailText}>{project.audience}</p>
                        </div>

                        <div className={styles.detailCard}>
                            <span className={styles.stepBadge}>04</span>
                            <div className={styles.detailIcon}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className={styles.detailLabel}>Impact</h3>
                            <p className={styles.detailText}>{project.impact}</p>
                        </div>

                        {project.partnership && (
                            <div className={`${styles.detailCard} ${styles.partnershipCard}`}>
                                <span className={styles.stepBadge}>05</span>
                                <div className={styles.detailIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </div>
                                <h3 className={styles.detailLabel}>Partenariat</h3>
                                <p className={styles.detailText}>{project.partnership}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY ===== */}
            {images.length > 1 && (
                <section className={styles.gallerySection}>
                    <h2 className={styles.sectionTitle}>
                        <span className="sectionEyebrow">Galerie</span>
                        Photos du projet
                    </h2>
                    <div ref={galleryGridRef} className={styles.galleryGrid}>
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                className={styles.galleryItem}
                                onClick={() => openLightbox(idx)}
                                aria-label={`Voir image ${idx + 1}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${project.shortTitle} – Photo ${idx + 1}`}
                                    fill
                                    className={styles.galleryImage}
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className={styles.galleryHover}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="11" y1="8" x2="11" y2="14" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* ===== OTHER PROJECTS ===== */}
            <section className={`${styles.otherSection} ${styles.reveal}`}>
                <h2 className={styles.sectionTitle}>
                    <span className="sectionEyebrow">Découvrir</span>
                    Nos autres projets
                </h2>
                <div className={styles.otherScroll}>
                    {otherProjects.map((p) => (
                        <ProjectCard key={p.slug} project={p} className={styles.otherCard} />
                    ))}
                </div>
            </section>

            {/* ===== LIGHTBOX ===== */}
            {lightboxOpen && (
                <div className={styles.lightbox} onClick={() => setLightboxOpen(false)} role="dialog" aria-modal="true" aria-label="Galerie d'images">
                    <button className={styles.lightboxClose} onClick={() => setLightboxOpen(false)} aria-label="Fermer">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.lightboxArrow} ${styles.lightboxPrev}`}
                        onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                        aria-label="Précédent"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
                        <Image
                            key={lightboxIdx} // Key facilitates entry animation on change
                            src={images[lightboxIdx]}
                            alt={`${project.shortTitle} – Photo ${lightboxIdx + 1}`}
                            fill
                            className={`${styles.lightboxImage} ${direction > 0 ? styles.slideInRight : direction < 0 ? styles.slideInLeft : styles.scaleIn}`}
                            sizes="90vw"
                        />
                    </div>
                    <button
                        className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                        onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                        aria-label="Suivant"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                    <div className={styles.lightboxCounter}>
                        {lightboxIdx + 1} / {images.length}
                    </div>
                </div>
            )}
        </div>
    );
}
