'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { projectsData } from './data';
import styles from './ProjectsPage.module.css';
import ProjectCard from '../components/ProjectCard';

const categories = ['Tous', 'Infrastructure', 'Éducation', 'Autonomisation', 'Santé'];

const stats = [
    { number: '+28', label: 'projets', sublabel: 'Projets réalisés' },
    { number: '+230', label: 'bénévoles', sublabel: 'Bénévoles engagés' },
    { number: '30', label: 'campagnes de dons', sublabel: 'Dons et campagnes de soutien' },
    { number: '+70k', label: 'bénéficiaires', sublabel: 'Personnes bénéficiaires' },
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

    return (
        <div className={styles.pageWrapper} ref={sectionRef}>
            <div className={styles.blob1} />
            <div className={styles.blob2} />
            <div className={styles.blob3} />

            <header className={`${styles.heroHeader} ${styles.reveal}`}>
                <span className="sectionEyebrow">Nos Projets</span>
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
                        <div className={styles.statSublabel}>{stat.sublabel}</div>
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
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>Aucun projet trouvé dans cette catégorie.</p>
                        <button onClick={() => setActiveFilter('Tous')} className={styles.resetFilter}>
                            Voir tous les projets
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
