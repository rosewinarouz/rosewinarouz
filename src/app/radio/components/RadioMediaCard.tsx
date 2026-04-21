'use client';

import { useRadioPlayer, type MediaItem } from '../context/RadioPlayerContext';
import { formatTime } from '../data/media';
import styles from './RadioMediaCard.module.css';

interface RadioMediaCardProps {
    item: MediaItem;
}

export default function RadioMediaCard({ item }: RadioMediaCardProps) {
    const { play, toggle, playingId, isPlaying, toggleFavorite, isFavorite, discoveredDurations } = useRadioPlayer();
    const isActive = playingId === item.id;
    const isThisPlaying = isActive && isPlaying;
    const favorited = isFavorite(item.id);

    // Use discovered exact duration if available
    const exactDuration = discoveredDurations[item.id];
    const durationDisplay = exactDuration ? formatTime(exactDuration) : item.durationLabel;

    const handleAction = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        if (isActive) {
            toggle();
        } else {
            play(item);
        }
    };

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(item.id);
    };

    return (
        <article
            className={`${styles.mediaCard} ${isActive ? styles.mediaCardActive : ''}`}
            onClick={handleAction}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAction(e);
                }
            }}
            role="button"
            tabIndex={0}
        >
            <div className={styles.imageWrapper}>
                <div
                    className={styles.imageBg}
                    style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className={styles.overlay} />

                {/* Centered Type Tag */}
                <div className={styles.tagWrapper}>
                    <span className={styles.typeTag}>
                        {item.type === 'video' ? 'Vidéo' : 'Podcast'}
                    </span>
                </div>

                {/* Animated Sound Wave for Active Item */}
                {isThisPlaying && (
                    <div className={styles.waveOverlay}>
                        <div className={styles.soundWave}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}

                <div className={styles.playBadge}>
                    {isThisPlaying ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    )}
                </div>
            </div>

            <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                    <p className={styles.cardCategory}>{item.category}</p>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.metadata}>
                        <span className={styles.duration}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {durationDisplay}
                        </span>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={`${styles.actionBtn} ${favorited ? styles.activeHeart : ''}`}
                            aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
                            onClick={handleFavorite}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill={favorited ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
