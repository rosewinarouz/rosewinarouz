'use client';
import { LogoCloud } from '@/components/ui/LogoCloud';
import styles from './Partners.module.css';

const logos = [
    { src: '/Partners/FES.png', alt: 'FES', height: 64 },
    { src: '/Partners/FFR.png', alt: 'FFR', height: 64 },
    { src: '/Partners/FGHR.png', alt: 'FGHR', height: 64 },
    { src: '/Partners/UE.png', alt: 'Union Européenne', height: 64 },
];

export default function Partners() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <span className={styles.label}>Nos partenaires</span>
                    <h2 className={styles.sectionTitle}>
                        Ils nous <span className={styles.gold}>font confiance</span>.
                    </h2>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.fullWidthWrapper}>
                <LogoCloud logos={logos} />
            </div>

            <div className={styles.divider} />
        </section>
    );
}
