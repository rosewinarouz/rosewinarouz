import styles from './RadioFeatured.module.css';

export default function RadioFeatured() {
    return (
        <div className={styles.featuredCard}>
            {/* Background image overlay or gradient */}
            <div className={styles.backgroundLayer} />

            <div className={styles.content}>
                <div className={styles.badge}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="22"></line>
                    </svg>
                    Podcast
                </div>

                <h1 className={styles.title}>Voix du Changement</h1>
                <p className={styles.subtitle}>Podcast — Justice Sociale</p>

                <button className={styles.playButton}>
                    Ecouter Maintenant
                </button>
            </div>

            {/* Decorative large circle play button on the right matching reference */}
            <button className={styles.largePlayIcon} aria-label="Play Featured">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            </button>
        </div>
    );
}
