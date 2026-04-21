'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HomePartnersStrip.module.css';

export default function HomePartnersStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={`${styles.inner} ${styles.reveal}`}>
        <div className={styles.labelColumn}>
          <span className="sectionEyebrow">Nos partenaires</span>
          <p className={styles.caption}>
            Un réseau d&apos;alliés engagés aux côtés de Rose Winarouz.
          </p>
        </div>

        <div className={styles.scrollerWrapper}>
          <div className={styles.scrollerFadeLeft} />
          <div className={styles.scrollerFadeRight} />

          <div className={styles.scroller}>
            {[...Array(10)].map((_, index) => (
              <div key={index} className={styles.logoChip}>
                <Image
                  src="/logo - RGB.png"
                  alt="Logo partenaire Rose Winarouz"
                  width={120}
                  height={120}
                  className={styles.logo}
                />
              </div>
            ))}
            {[...Array(10)].map((_, index) => (
              <div key={`dup-${index}`} className={styles.logoChip}>
                <Image
                  src="/logo - RGB.png"
                  alt="Logo partenaire Rose Winarouz"
                  width={120}
                  height={120}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

