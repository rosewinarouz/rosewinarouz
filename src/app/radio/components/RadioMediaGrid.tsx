'use client';

import { useState } from 'react';
import styles from './RadioMediaGrid.module.css';

const TABS = ['Tous', 'Podcasts', 'Vidéos'];
const TAGS = ['Justice sociale', 'Développement', 'Culture', 'Éducation', 'Territoire'];

const MEDIA_ITEMS = [
    {
        title: 'Justice Territoriale',
        category: 'Justice sociale',
        duration: '23:32',
        image: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=800&auto=format&fit=crop',
        type: 'podcast'
    },
    {
        title: 'Solutions Locales',
        category: 'Développement',
        duration: '12:10',
        image: 'https://images.unsplash.com/photo-1627844642677-4b4dceb4cc9b?q=80&w=800&auto=format&fit=crop',
        type: 'video'
    },
    {
        title: 'Inclusion au Féminin',
        category: 'Culture & Éducation',
        duration: '28:45',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop',
        type: 'podcast'
    },
    {
        title: 'Territoire & Écologie',
        category: 'Territoire',
        duration: '10:05',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
        type: 'podcast'
    },
    {
        title: 'Graines de Savoir',
        category: 'Culture & Éducation',
        duration: '32:14',
        image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
        type: 'podcast'
    },
    {
        title: 'Entreprendre Ensemble',
        category: 'Développement',
        duration: '15:48',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=800&auto=format&fit=crop',
        type: 'video'
    }
];

export default function RadioMediaGrid() {
    const [activeTab, setActiveTab] = useState('Tous');

    return (
        <section className={styles.section}>
            {/* Main Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsWrapper}>
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sub Tags with arrows */}
            <div className={styles.tagsRow}>
                <div className={styles.tagsScroll}>
                    {TAGS.map(tag => (
                        <button key={tag} className={styles.tagBadge}>
                            {tag}
                        </button>
                    ))}
                </div>
                <div className={styles.tagsArrows}>
                    <button className={styles.arrowBtn}>&lt;</button>
                    <button className={styles.arrowBtn}>&gt;</button>
                </div>
            </div>

            {/* Media Grid */}
            <div className={styles.grid}>
                {MEDIA_ITEMS.map((item, i) => (
                    <article key={i} className={styles.mediaCard}>
                        <div className={styles.imageWrapper}>
                            {/* Fallback pattern overlaid on image */}
                            <div
                                className={styles.imageBg}
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className={styles.overlay} />
                            {item.type === 'video' || i === 3 ? (
                                /* Add a play icon for video indication, or conditionally based on ref image */
                                <div className={styles.playBadge}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                            ) : null}
                        </div>

                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardCategory}>{item.category}</p>

                            <div className={styles.cardFooter}>
                                <span className={styles.duration}>{item.duration}</span>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn} aria-label="Like">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </button>
                                    <button className={styles.actionBtn} aria-label="Share">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                            <polyline points="16 6 12 2 8 6"></polyline>
                                            <line x1="12" y1="2" x2="12" y2="15"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
