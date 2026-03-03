'use client';

import { useEffect, useRef } from 'react';
import styles from './HomeProjets.module.css';

const projets = [
    { id: 'p1', title: 'Coopérative Féminine de Tissage', category: 'Autonomisation', time: 'En cours', image: '/rose-hill-placeholder.jpg' },
    { id: 'p2', title: 'Reboisement Haut Atlas', category: 'Environnement', time: 'Achevé 2023', image: '/rose-hill-placeholder.jpg' },
    { id: 'p3', title: 'Soutien Scolaire Rural', category: 'Éducation', time: 'Phase 2', image: '/rose-hill-placeholder.jpg' },
    { id: 'p4', title: 'Eau Potable Douar', category: 'Infrastructure', time: 'En cours', image: '/rose-hill-placeholder.jpg' },
];

export default function HomeProjets() {
    const containerRef = useRef<HTMLDivElement>(null);

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

        const elements = containerRef.current?.querySelectorAll(`.${styles.reveal}`);
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={containerRef} className={styles.section}>
            <header className={styles.header}>
                <h2 className={`${styles.title} ${styles.reveal}`}>Derniers Projets</h2>
                <div className={`${styles.navArrows} ${styles.reveal}`}>
                    <button className={styles.arrowBtn} aria-label="Précédent">&larr;</button>
                    <button className={styles.arrowBtn} aria-label="Suivant">&rarr;</button>
                </div>
            </header>

            <div className={`${styles.track} ${styles.reveal} ${styles.delay1}`}>
                {projets.map((projet) => (
                    <div key={projet.id} className={styles.projetCard}>
                        <div className={styles.imageBg} style={{ backgroundImage: `url(${projet.image})` }} />
                        <div className={styles.overlay} />

                        <div className={styles.content}>
                            <span className={styles.badge}>{projet.category}</span>
                            <h3 className={styles.cardTitle}>{projet.title}</h3>

                            <div className={styles.cardFooter}>
                                <span className={styles.timeLabel}>{projet.time}</span>
                                <button className={styles.linkIcon} aria-label="Voir le projet">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
