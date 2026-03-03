'use client';

import { useEffect, useRef } from 'react';
import styles from './HomeTemoignages.module.css';

const temoignages = [
    {
        id: 't1',
        name: 'Fatima Z.',
        role: 'Bénéficiaire, Coopérative Agricole',
        quote: "L'accompagnement de Rose Winarouz a transformé notre vision de l'agriculture locale. Nous sommes aujourd'hui indépendantes.",
        avatar: 'F'
    },
    {
        id: 't2',
        name: 'Youssef M.',
        role: 'Jeune Entrepreneur',
        quote: "Grâce aux formations, j'ai pu structurer mon projet numérique et trouver des financements. Un véritable tremplin.",
        avatar: 'Y'
    },
    {
        id: 't3',
        name: 'Amina El K.',
        role: 'Actrice Associative',
        quote: "Leur approche basée sur l'intelligence collective est exactement ce dont notre région avait besoin pour avancer ensemble.",
        avatar: 'A'
    }
];

export default function HomeTemoignages() {
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
                <h2 className={`${styles.title} ${styles.reveal}`}>Témoignages</h2>
                <p className={`${styles.subtitle} ${styles.reveal} ${styles.delay1}`}>
                    Ceux qui partagent notre aventure
                </p>
            </header>

            <div className={`${styles.grid} ${styles.reveal} ${styles.delay2}`}>
                {temoignages.map((t, index) => (
                    <div key={t.id} className={styles.card} style={{ transitionDelay: `${index * 0.1}s` }}>
                        <div className={styles.quoteIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036c0 1.028 1 2 4 2zm14 0c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.036c0 1.028 1 2 4 2z"></path>
                            </svg>
                        </div>

                        <p className={styles.quote}>"{t.quote}"</p>

                        <div className={styles.author}>
                            <div className={styles.avatar}>{t.avatar}</div>
                            <div className={styles.authorInfo}>
                                <h4 className={styles.name}>{t.name}</h4>
                                <span className={styles.role}>{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
