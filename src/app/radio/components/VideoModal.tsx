'use client';

import { useRadioPlayer } from '../context/RadioPlayerContext';
import styles from './VideoModal.module.css';

export default function VideoModal() {
    const { isVideoVisible, current, closeVideo } = useRadioPlayer();

    if (!isVideoVisible || !current || current.type !== 'video') return null;

    return (
        <div className={styles.overlay} onClick={closeVideo}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{current.title}</h2>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={closeVideo}
                        aria-label="Fermer"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className={styles.videoContainer}>
                    <iframe
                        src={`${current.src}?autoplay=1`}
                        title={current.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
