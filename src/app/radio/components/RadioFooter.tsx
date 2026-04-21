import { useState } from 'react';
import DonationModal from '@/components/DonationModal';
import styles from './RadioFooter.module.css';

export default function RadioFooter() {
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
        <footer className={styles.footer}>
            <div className={styles.ctaSection}>
                {/* Decorative background elements */}
                <div className={styles.glowBlob1} />
                <div className={styles.glowBlob2} />

                <div className={styles.ctaBox}>
                    <h2 className={styles.title}>Soutenez une parole libre et engagée</h2>
                    <p className={styles.subtitle}>Votre contribution soutient nos productions indépendantes.</p>
                    <button
                        className={styles.donateBtn}
                        onClick={() => setIsDonationModalOpen(true)}
                    >
                        <span>Faire un don</span>
                        <div className={styles.btnGlow} />
                    </button>
                </div>
            </div>

            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />

            <div className={styles.linksRow}>
                <nav className={styles.nav}>
                    <a href="/about">À propos</a>
                    <a href="/projects">Projets</a>
                    <a href="/radio">Radio</a>
                    <a href="/contact">Contact</a>
                    <a href="/legal">Mentions légales</a>
                    <a href="/privacy">Confidentialité</a>
                </nav>

                <div className={styles.socials}>
                    <a href="#" aria-label="Facebook">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
