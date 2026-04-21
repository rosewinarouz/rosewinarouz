import Image from 'next/image';
import { useRadioPlayer } from '../context/RadioPlayerContext';
import { FEATURED_ITEM } from '../data/media';
import styles from './RadioFeatured.module.css';

export default function RadioFeatured() {
  const { play, toggle, isPlaying, isLoading, playingId } = useRadioPlayer();
  const isActive = playingId === FEATURED_ITEM.id;
  const isThisPlaying = isActive && isPlaying;

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isActive) {
      toggle();
    } else {
      play(FEATURED_ITEM);
    }
  };

  return (
    <div className={styles.featuredCard}>
      <div className={styles.mainContainer}>
        <div className={styles.contentSection}>
          <div className={styles.badge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
            À la une
          </div>

          <h1 className={styles.title}>{FEATURED_ITEM.title}</h1>
          <p className={styles.subtitle}>{FEATURED_ITEM.subtitle ?? FEATURED_ITEM.category}</p>

          <div className={`${styles.soundWave} ${isThisPlaying ? styles.animating : ''}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles.actionRow}>
            <button
              type="button"
              className={`${styles.playButton} ${isThisPlaying ? styles.playing : ''} ${isLoading ? styles.loading : ''}`}
              onClick={handlePlay}
              disabled={isLoading}
              aria-label={isThisPlaying ? 'Pause' : 'Écouter'}
            >
              {isLoading ? (
                <span className={styles.buttonSpinner} />
              ) : isThisPlaying ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  En pause
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Écouter
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.artworkSection}>
          <div className={styles.artworkWrapper} onClick={handlePlay}>
            <Image
              src={FEATURED_ITEM.image}
              alt={FEATURED_ITEM.title}
              fill
              className={styles.featuredImage}
              priority
            />
            <button
              type="button"
              className={`${styles.overlayPlayBtn} ${isThisPlaying ? styles.playing : ''}`}
              onClick={handlePlay}
              aria-label={isThisPlaying ? 'Pause' : 'Lecture'}
            >
              {isThisPlaying ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
