'use client';

import { useRef, useState } from 'react';
import { useRadioPlayer } from '../context/RadioPlayerContext';
import { formatTime } from '../data/media';
import styles from './RadioPlayer.module.css';

export default function RadioPlayer() {
  const {
    current,
    isPlaying,
    progress,
    currentTime,
    volume,
    isLoading,
    toggle,
    seek,
    setVolume,
    pause,
    stop,
    playbackRate,
    setPlaybackRate,
    skipTime,
    toggleFavorite,
    isFavorite,
  } = useRadioPlayer();
  const progressRef = useRef<HTMLDivElement>(null);
  const [showVolume, setShowVolume] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  if (!current) return null;

  const favorited = isFavorite(current.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(current.id);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(fraction);
  };

  const handleProgressTouch = (e: React.TouchEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX;
    const fraction = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    seek(fraction);
  };

  return (
    <div className={`${styles.player} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.bar}>
        {/* Left Section: Artwork & Info */}
        <div className={styles.left}>
          <div className={styles.artwork}>
            <img
              src={current.image}
              alt=""
              className={styles.artworkImg}
            />
            {isPlaying && <div className={styles.artworkPulse} aria-hidden />}
          </div>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <span className={styles.title}>{current.title}</span>
              {isPlaying && (
                <div className={styles.soundWave} aria-hidden>
                  <div className={styles.waveBar} />
                  <div className={styles.waveBar} />
                  <div className={styles.waveBar} />
                  <div className={styles.waveBar} />
                </div>
              )}
            </div>
            <span className={styles.subtitle}>{current.subtitle || current.category}</span>
          </div>

          <button
            type="button"
            className={`${styles.favoriteBtn} ${favorited ? styles.activeHeart : ''}`}
            onClick={handleFavorite}
            aria-label={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={favorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Center Section: Main Controls & Progress */}
        <div className={styles.center}>
          <div className={styles.mainControls}>
            <button
              type="button"
              className={styles.skipBtn}
              onClick={() => skipTime(-15)}
              aria-label="Reculer de 15 secondes"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <text x="12.5" y="15" fontSize="7" fontWeight="700" fill="currentColor" textAnchor="middle" stroke="none" style={{ fontFamily: 'var(--font-clash-display), sans-serif' }}>15</text>
              </svg>
            </button>

            <button
              type="button"
              className={styles.playBtn}
              onClick={toggle}
              disabled={isLoading}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isLoading ? (
                <span className={styles.spinner} aria-hidden />
              ) : isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className={styles.skipBtn}
              onClick={() => skipTime(15)}
              aria-label="Avancer de 15 secondes"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <text x="11.5" y="15" fontSize="7" fontWeight="700" fill="currentColor" textAnchor="middle" stroke="none" style={{ fontFamily: 'var(--font-clash-display), sans-serif' }}>15</text>
              </svg>
            </button>
          </div>

          <div className={styles.progressSection}>
            <span className={styles.timeLabel}>{formatTime(currentTime)}</span>
            <div
              className={styles.progressBarWrapper}
              ref={progressRef}
              onClick={handleProgressClick}
              onTouchEnd={handleProgressTouch}
            >
              <div className={styles.progressBar} />
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              <div className={styles.progressThumb} style={{ left: `${progress}%` }} />
            </div>
            <span className={styles.timeLabel}>{formatTime(current.duration)}</span>
          </div>
        </div>

        {/* Right Section: Volume & Extra Controls */}
        <div className={styles.right}>
          <button
            type="button"
            className={styles.speedBtn}
            onClick={() => {
              const rates = [1, 1.25, 1.5, 2];
              const currentIndex = rates.indexOf(playbackRate);
              const nextRate = rates[(currentIndex + 1) % rates.length];
              setPlaybackRate(nextRate);
            }}
            aria-label="Vitesse de lecture"
          >
            {playbackRate}x
          </button>

          <div className={styles.volumeWrap}>
            <button
              type="button"
              className={styles.volumeBtn}
              onClick={() => setShowVolume((v) => !v)}
              aria-label="Volume"
            >
              {volume === 0 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
            {showVolume && (
              <div className={styles.volumePopover}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className={styles.volumeSlider}
                />
              </div>
            )}
          </div>
        </div>

        {/* Player Controls Group (Outside right section so it's always visible) */}
        <div className={`${styles.playerControlsGroup} ${isFabOpen ? styles.fabOpen : ''}`}>
          {/* Mobile FAB Toggle Button */}
          <button
            type="button"
            className={styles.fabToggleBtn}
            onClick={() => setIsFabOpen(!isFabOpen)}
            aria-label={isFabOpen ? "Fermer les options" : "Ouvrir les options"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          <button
            type="button"
            className={styles.expandBtn}
            onClick={() => {
              setIsExpanded(!isExpanded);
              setIsFabOpen(false);
            }}
            aria-label={isExpanded ? "Réduire le lecteur" : "Agrandir le lecteur"}
          >
            {isExpanded ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>

          <div className={styles.divider} />

          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => {
              stop();
              setIsExpanded(false);
              setIsFabOpen(false);
            }}
            aria-label="Fermer le lecteur"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
