import styles from './RadioThematics.module.css';

const THEMATICS = [
    { title: 'Justice Sociale', time: '25:32 Education', image: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?q=80&w=600&auto=format&fit=crop' },
    { title: 'Économie Solidaire', time: '12:10 Education', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop' },
    { title: 'Inclusion', time: '28:48 Education', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=600&auto=format&fit=crop' },
    { title: 'Territoire', time: '10:05 Education', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop' }
];

export default function RadioThematics() {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Thèmatiques</h2>
                <div className={styles.navArrows}>
                    <button className={styles.arrowBtn}>&lt;</button>
                    <button className={styles.arrowBtn}>&gt;</button>
                </div>
            </div>

            <div className={styles.track}>
                {THEMATICS.map((theme, i) => (
                    <article key={i} className={styles.themeCard}>
                        <div className={styles.imageBg} style={{ backgroundImage: `url(${theme.image})` }} />
                        <div className={styles.overlay} />

                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>{theme.title}</h3>
                            <div className={styles.cardFooter}>
                                <span className={styles.timeLabel}>{theme.time}</span>
                                <button className={styles.linkIcon} aria-label="Open">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
