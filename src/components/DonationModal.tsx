'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import styles from './DonationModal.module.css';

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
    const [modalAmount, setModalAmount] = useState(100);
    const [customValue, setCustomValue] = useState('');
    const [error, setError] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const [renderModal, setRenderModal] = useState(false);

    // Handle render state for exit animations
    useEffect(() => {
        if (isOpen) {
            setRenderModal(true);
        }
    }, [isOpen]);

    // Handle close animation
    const handleClose = () => {
        if (!modalRef.current || !cardRef.current) {
            setRenderModal(false);
            onClose();
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                setRenderModal(false);
                onClose();
            }
        });

        tl.to(cardRef.current, {
            autoAlpha: 0,
            y: 30,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in'
        })
            .to(modalRef.current, {
                autoAlpha: 0,
                duration: 0.3,
                ease: 'power2.in'
            }, '<0.1');
    };

    // Entrance animation
    useLayoutEffect(() => {
        if (!isOpen || !renderModal || !modalRef.current || !cardRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(modalRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.4, ease: 'power2.out' }
            )
                .fromTo(cardRef.current,
                    { autoAlpha: 0, y: 40, scale: 0.92 },
                    { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
                    '<0.1'
                );
        });

        return () => ctx.revert();
    }, [isOpen, renderModal]);

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setModalAmount(100);
            setCustomValue('');
            setError('');
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    // Lock body scroll & auto-focus
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto-focus the close button when modal opens
            setTimeout(() => closeBtnRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (!isOpen || !modalRef.current) return;
        const modal = modalRef.current;
        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            const focusable = modal.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        modal.addEventListener('keydown', handleTab);
        return () => modal.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    if (!renderModal) return null;

    return (
        <div
            className={styles.modalBackdrop}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-modal-title"
            ref={modalRef}
            style={{ opacity: 0, visibility: 'hidden' }}
        >
            <div className={styles.modalCard} ref={cardRef} style={{ opacity: 0, visibility: 'hidden' }}>
                <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={handleClose}
                    aria-label="Fermer la fenêtre de don"
                    ref={closeBtnRef}
                >
                    ×
                </button>

                <div className={styles.modalHeartIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>

                <h2 id="donation-modal-title" className={styles.modalTitle}>Faire un don</h2>
                <p className={styles.modalSubtitle}>
                    Votre soutien change des vies. Choisissez un montant ou entrez le vôtre.
                </p>

                <div className={styles.modalAmounts} role="group" aria-label="Montants prédéfinis">
                    {[50, 100, 200, 500].map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            className={`${styles.modalAmountBtn} ${modalAmount === amount && !customValue ? styles.modalAmountBtnActive : ''}`}
                            aria-pressed={modalAmount === amount && !customValue}
                            onClick={() => {
                                setModalAmount(amount);
                                setCustomValue('');
                            }}
                        >
                            {amount} MAD
                        </button>
                    ))}
                </div>

                <input
                    type="number"
                    className={`${styles.customInput} ${error ? styles.inputError : ''}`}
                    placeholder="Montant personnalisé (MAD)"
                    aria-label="Montant personnalisé en MAD"
                    value={customValue}
                    onChange={(e) => {
                        setCustomValue(e.target.value);
                        setError('');
                        const num = parseInt(e.target.value, 10);
                        if (num > 0) {
                            setModalAmount(num);
                        }
                    }}
                    min="1"
                    data-testid="donation-custom-input"
                    aria-describedby={error ? 'donation-error-msg' : undefined}
                />

                {error && <p className={styles.errorText} role="alert" aria-live="assertive" id="donation-error-msg" data-testid="donation-error">{error}</p>}

                <button
                    type="button"
                    className={styles.modalDonateBtn}
                    onClick={() => {
                        const finalAmount = customValue ? parseInt(customValue, 10) : modalAmount;

                        if (customValue && (isNaN(finalAmount) || finalAmount <= 0)) {
                            setError('Veuillez entrer un montant valide supérieur à 0.');
                            return;
                        }

                        if (!finalAmount || finalAmount <= 0) {
                            setError('Veuillez choisir ou entrer un montant.');
                            return;
                        }

                        const message = encodeURIComponent(`Bonjour, je souhaite faire un don de ${finalAmount} MAD à l'association Rose Winarouz.`);
                        const whatsappUrl = `https://wa.me/212680603645?text=${message}`;
                        window.open(whatsappUrl, '_blank');
                        handleClose();
                    }}
                    data-testid="donation-confirm-button"
                >
                    Confirmer le don de {customValue ? customValue : modalAmount} MAD
                </button>

                <div className={styles.modalSecure}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Paiement 100 % sécurisé
                </div>
            </div>
        </div>
    );
}
