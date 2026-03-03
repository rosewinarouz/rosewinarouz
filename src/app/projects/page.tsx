'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { projectsData } from './data';
import styles from './ProjectsPage.module.css';

const categories = ['Tous', 'Infrastructure', 'Éducation', 'Autonomisation', 'Santé'];

const stats = [
    { number: '7', label: 'Projets lancés' },
    { number: '8 500+', label: 'Bénéficiaires' },
    { number: '24', label: 'Douars couverts' },
    { number: '5', label: 'Partenaires' },
];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeFilter === 'Tous'
        ? projectsData
        : projectsData.filter(p => p.category === activeFilter);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animateIn);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

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
            <div className={styles.blob1} />
            <div className={styles.blob2} />
            <div className={styles.blob3} />

            <header className={`${styles.heroHeader} ${styles.reveal}`}>
                <span className={styles.eyebrow}>Nos Projets</span>
                <h1 className={styles.heroTitle}>
                    Construire un avenir <span>durable</span> pour nos territoires
                </h1>
                <p className={styles.heroDesc}>
                    Chaque projet est une réponse concrète aux besoins de nos communautés.
                    De l&apos;éducation à l&apos;infrastructure, nous agissons là où l&apos;impact est le plus fort.
                </p>
            </header>

            <div className={`${styles.statsBar} ${styles.reveal} ${styles.delay1}`}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.statNumber}>{stat.number}</div>
                        <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className={`${styles.filterBar} ${styles.reveal} ${styles.delay2}`}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={`${styles.projectsGrid} ${styles.reveal} ${styles.delay3}`}>
                {filteredProjects.map((project) => (
                    <Link
                        href={`/projects/${project.slug}`}
                        key={project.slug}
                        className={styles.projectCardLink}
                    >
                        <article className={styles.projectCard}>
                            <div
                                className={styles.cardImage}
                                style={{
                                    backgroundImage: `url(${project.imageDir}/1.jpg)`,
                                }}
                            />
                            <div className={styles.cardOverlay} />

                            <div className={styles.cardContent}>
                                <div className={styles.statusRow}>
                                    <span className={`${styles.statusDot} ${getStatusClass(project.status)}`} />
                                    <span className={styles.statusLabel}>{project.statusLabel}</span>
                                </div>

                                <span className={styles.categoryBadge}>{project.category}</span>

                                <h3 className={styles.cardTitle}>{project.shortTitle}</h3>
                                <p className={styles.cardDesc}>{project.description}</p>

                                <div className={styles.cardFooter}>
                                    <div className={styles.progressWrapper}>
                                        <div className={styles.progressLabel}>
                                            <span>Avancement</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className={styles.progressTrack}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <span className={styles.arrowLink} aria-label="Voir le projet">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
