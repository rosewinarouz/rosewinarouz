'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HomeContact.module.css';

export default function HomeContact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.animateIn);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = containerRef.current?.querySelectorAll(`.${styles.reveal}`);
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Manual validation check
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setFormStatus('submitting');
        setTimeout(() => {
            setFormStatus('success');
            // Success state persists for 5 seconds to ensure visibility
            setTimeout(() => setFormStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section id="contact-section" ref={containerRef} className={styles.section}>
            <div className={styles.container}>
                <div className={`${styles.infoCard} ${styles.reveal}`}>
                    <h2 className="sectionTitle">Rejoignez le <span>Mouvement</span></h2>
                    <p className={styles.description}>
                        Que vous souhaitiez faire un don, devenir bénévole ou proposer un partenariat,
                        notre équipe est à votre écoute.
                    </p>

                    <div className={styles.contactDetails}>
                        <div className={styles.detailItem}>
                            <span className={styles.icon}>📍</span>
                            <div>
                                <strong>Siège Social</strong>
                                <p>Province Al Haouz, Maroc</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.icon}>✉️</span>
                            <div>
                                <strong>Email</strong>
                                <p>contact@rosewinarouz.org</p>
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <span className={styles.icon}>📞</span>
                            <div>
                                <strong>Téléphone</strong>
                                <p>+212 6 00 00 00 00</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form className={`${styles.formCard} ${styles.reveal} ${styles.delay1}`} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nom complet</label>
                        <input type="text" id="name" required placeholder="Votre nom..." />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required placeholder="votre@email.com" />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="subject">Sujet</label>
                        <select id="subject" required>
                            <option value="">Sélectionnez un sujet...</option>
                            <option value="don">Faire un don</option>
                            <option value="benevolat">Devenir bénévole</option>
                            <option value="partenariat">Proposer un partenariat</option>
                            <option value="autre">Autre question</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows={4} required placeholder="Comment pouvons-nous collaborer ?"></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`${styles.submitBtn} ${formStatus === 'success' ? styles.success : ''}`}
                        disabled={formStatus === 'submitting'}
                        data-testid="contact-submit-button"
                    >
                        {formStatus === 'idle' && 'Envoyer le message'}
                        {formStatus === 'submitting' && 'Envoi en cours...'}
                        {formStatus === 'success' && '✓ Message envoyé avec succès !'}
                    </button>

                    {formStatus === 'success' && (
                        <div className={styles.successToast} data-testid="contact-success-message">
                            <strong>Merci !</strong> Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
