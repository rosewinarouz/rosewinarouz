'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeDonation.module.css';

gsap.registerPlugin(ScrollTrigger);

const PRESET_AMOUNTS = [50, 100, 200, 500];
const WHATSAPP_NUMBER = '212680603645';

function redirectToWhatsApp(amount: number) {
    const message = encodeURIComponent(`Bonjour, je souhaite faire un don de ${amount} MAD à l'association Rose Winarouz.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

export default function HomeDonation() {
    const [selectedAmount, setSelectedAmount] = useState(100);
    const [cardCustomValue, setCardCustomValue] = useState('');
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const root = sectionRef.current;
            if (!root) return;

            // Text block slides from left
            const textBlock = root.querySelector(`.${styles.textBlock}`);
            if (textBlock) {
                gsap.fromTo(textBlock,
                    { autoAlpha: 0, x: -40 },
                    {
                        autoAlpha: 1, x: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: root, start: 'top 80%' }
                    }
                );
            }

            // CTA card slides from right
            const ctaCard = root.querySelector(`.${styles.ctaCard}`);
            if (ctaCard) {
                gsap.fromTo(ctaCard,
                    { autoAlpha: 0, x: 40, scale: 0.95 },
                    {
                        autoAlpha: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: root, start: 'top 80%' }
                    }
                );
            }

            // Heart icon pulse
            const heartIcon = root.querySelector(`.${styles.heartIcon}`);
            if (heartIcon) {
                gsap.fromTo(heartIcon,
                    { scale: 0, rotate: -20 },
                    {
                        scale: 1, rotate: 0, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: ctaCard, start: 'top 85%' }
                    }
                );
            }

            // Amount buttons stagger
            const amountBtns = root.querySelectorAll(`.${styles.amountBtn}`);
            if (amountBtns.length) {
                gsap.fromTo(amountBtns,
                    { autoAlpha: 0, y: 15, scale: 0.9 },
                    {
                        autoAlpha: 1, y: 0, scale: 1,
                        duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)',
                        scrollTrigger: { trigger: ctaCard, start: 'top 80%' }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="donation" ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {/* Left – text content */}
                <div className={styles.textBlock}>
                    <div className={styles.sectionHeader}>
                        <span className="sectionEyebrow">Faire un don</span>
                        <h2 className="sectionTitle">
                            Soutenez nos <span>actions</span> sur le terrain.
                        </h2>
                    </div>

                    <p className={styles.description}>
                        Chaque contribution compte. Votre don permet de financer des projets concrets
                        au cœur des communautés locales : éducation, environnement, autonomisation
                        des femmes et des jeunes.
                    </p>

                </div>

                {/* Right – interactive card */}
                <div className={styles.ctaCard}>
                    <div className={styles.heartIcon}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </div>

                    <h3 className={styles.ctaTitle}>Choisissez votre montant</h3>
                    <p className={styles.ctaSubtitle}>
                        100 % de votre don est utilisé pour nos projets de terrain.
                    </p>

                    <div className={styles.amounts}>
                        {PRESET_AMOUNTS.map((amount) => (
                            <button
                                key={amount}
                                type="button"
                                className={`${styles.amountBtn} ${selectedAmount === amount && !cardCustomValue ? styles.amountBtnActive : ''}`}
                                onClick={() => {
                                    setSelectedAmount(amount);
                                    setCardCustomValue('');
                                }}
                            >
                                {amount} MAD
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        className={styles.cardCustomInput}
                        placeholder="Autre montant (MAD)"
                        aria-label="Montant personnalisé en MAD"
                        value={cardCustomValue}
                        onChange={(e) => {
                            setCardCustomValue(e.target.value);
                            const num = parseInt(e.target.value, 10);
                            if (num > 0) setSelectedAmount(num);
                        }}
                        min="1"
                    />

                    <button
                        type="button"
                        className={styles.ctaDonateBtn}
                        onClick={() => {
                            const finalAmount = cardCustomValue ? parseInt(cardCustomValue, 10) : selectedAmount;
                            redirectToWhatsApp(finalAmount);
                        }}
                    >
                        Donner {cardCustomValue || selectedAmount} MAD
                    </button>
                </div>
            </div>
        </section>
    );
}
