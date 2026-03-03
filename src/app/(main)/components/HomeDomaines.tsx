'use client';

import { useEffect, useRef } from 'react';
import styles from './HomeDomaines.module.css';

const domaines = [
    {
        id: 'd1',
        title: 'Développement territorial',
        desc: 'Analyse des réalités locales et co-construction de solutions.',
        icon: '🌍',
        image: '/rose-hill-placeholder.jpg',
    },
    {
        id: 'd2',
        title: 'Autonomisation économique',
        desc: 'Soutien à l\'entrepreneuriat des jeunes et des femmes.',
        icon: '💡',
        image: '/rose-hill-placeholder.jpg',
    },
    {
        id: 'd3',
        title: 'Climat & Environnement',
        desc: 'Actions de reboisement et sensibilisation écologique.',
        icon: '🌱',
        image: '/rose-hill-placeholder.jpg',
    },
];

export default function HomeDomaines() {
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
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Nos Domaines d&apos;Intervention</h2>
            <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
                Nos champs d&apos;action prioritaires pour traduire concrètement notre vision.
            </p>

            <div className={`${styles.grid} ${styles.reveal} ${styles.delay1}`}>
                {domaines.map((dom, i) => (
                    <div key={dom.id} className={`${styles.card} ${styles.reveal}`} style={{ transitionDelay: `${i * 0.1 + 0.2}s` }}>
                        <div className={styles.imageWrapper}>
                            {/* Note: In a real scenario, these would be valid image paths */}
                            <div className={styles.imagePlaceholder} />
                            <div className={styles.overlay} />
                        </div>

                        <div className={styles.content}>
                            <span className={styles.icon}>{dom.icon}</span>
                            <h3 className={styles.cardTitle}>{dom.title}</h3>
                            <p className={styles.cardDesc}>{dom.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
