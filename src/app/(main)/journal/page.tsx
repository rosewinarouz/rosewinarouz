'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { journalData, JournalArticle } from './data';
import styles from './JournalPage.module.css';

const categories = ['Tous', 'Entrepreneuriat', 'RSE', 'Technologie', 'Social'];

const JournalCard = ({ article }: { article: JournalArticle }) => (
    <Link href={`/journal/${article.slug}`} className={styles.journalCard}>
        <div className={styles.cardImageWrapper}>
            <Image 
                src={article.imageCover} 
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.cardImage}
            />
            <div className={styles.cardImageOverlay} />
            <span className={styles.cardCategory}>{article.category}</span>
        </div>
        
        <div className={styles.cardContent}>
            <span className={styles.cardDate}>{article.date}</span>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardExcerpt}>{article.excerpt}</p>
            
            <div className={styles.cardFooter}>
                <span className={styles.cardAuthor}>{article.author}</span>
                <span className={styles.cardLink}>
                    Lire l&apos;article
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </span>
            </div>
        </div>
    </Link>
);

export default function JournalPage() {
    const [activeFilter, setActiveFilter] = useState('Tous');
    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredArticles = activeFilter === 'Tous'
        ? journalData
        : journalData.filter(a => a.category === activeFilter);

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
                <span className="sectionEyebrow">Notre Journal</span>
                <h1 className={styles.heroTitle}>
                    Actualités & <span>Rapports</span>
                </h1>
                <p className={styles.heroDesc}>
                    Découvrez nos dernières actions, nos rapports d'impact et les histoires inspirantes
                    des territoires que nous accompagnons.
                </p>
            </header>

            <div className={`${styles.filterBar} ${styles.reveal} ${styles.delay1}`}>
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

            <div className={`${styles.journalGrid} ${styles.reveal} ${styles.delay2}`}>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <JournalCard key={article.slug} article={article} />
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>Aucun article trouvé dans cette catégorie.</p>
                        <button onClick={() => setActiveFilter('Tous')} className={styles.resetFilter}>
                            Voir tous les articles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
