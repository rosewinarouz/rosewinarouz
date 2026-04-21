'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { User, Phone, Mail, MessageSquare, Send, MapPin, HeartHandshake, Briefcase } from 'lucide-react';
import Image from 'next/image';
import styles from './ContactPage.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type Role = 'benevole' | 'collaborateur';

const ROLES: { value: Role; label: string; desc: string; Icon: typeof HeartHandshake }[] = [
  { value: 'benevole', label: 'Bénévoler', desc: 'Offrir mon temps et mes compétences.', Icon: HeartHandshake },
  { value: 'collaborateur', label: 'Collaborer', desc: 'Devenir un partenaire institutionnel.', Icon: Briefcase },
];

const CONTACT_INFO = [
  { label: 'Siège social', value: 'Province Al Haouz, Maroc', Icon: MapPin },
  { label: 'Email', value: 'contact@rosewinarouz.org', Icon: Mail },
  { label: 'Téléphone', value: '+212 6 00 00 00 00', Icon: Phone },
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [role, setRole] = useState<Role>('benevole');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.animateIn);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      // Replace with your API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      form.reset();
      setRole('benevole');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const t = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <div ref={containerRef} className={styles.pageWrapper}>
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <div className={styles.layout}>
        <aside className={`${styles.aside} ${styles.reveal}`}>
          <span className="sectionEyebrow">Contact</span>
          <h1 className={styles.title}>
            Rejoignez le <span>mouvement</span>
          </h1>
          <p className={styles.subtitle}>
            Bénévoles, partenaires ou simples échanges — nous sommes à votre écoute pour agir ensemble sur les territoires.
          </p>
          <div className={styles.asideLogo}>
            <Image
              src="/logo - WT.png"
              alt="Rose Winarouz Logo"
              width={440}
              height={160}
              className={styles.logoImg}
              priority
            />
          </div>
          <ul className={styles.contactList}>
            {CONTACT_INFO.map(({ label, value, Icon }) => (
              <li key={label} className={styles.contactItem}>
                <span className={styles.contactIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <span className={styles.contactLabel}>{label}</span>
                  <p className={styles.contactValue}>{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <div className={`${styles.formSection} ${styles.reveal}`}>
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
              <fieldset className={styles.roleFieldset}>
                <legend className={styles.roleLegend}>Je souhaite</legend>
                <div className={styles.roleRow} role="group" aria-label="Type de contact">
                  {ROLES.map(({ value, label, desc, Icon }) => (
                    <label
                      key={value}
                      className={`${styles.roleCard} ${role === value ? styles.roleCardActive : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={value}
                        checked={role === value}
                        onChange={() => setRole(value)}
                        className={styles.roleInput}
                        aria-describedby={`role-desc-${value}`}
                      />
                      <span className={styles.roleContent}>
                        <Icon className={styles.roleIcon} size={24} aria-hidden="true" />
                        <span className={styles.roleTitle}>{label}</span>
                        <span id={`role-desc-${value}`} className={styles.roleDesc}>{desc}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-name" className={styles.label}>Nom complet</label>
                  <div className={styles.inputWrap}>
                    <User className={styles.inputIcon} size={18} aria-hidden="true" />
                    <input
                      type="text"
                      id="contact-name"
                      name="fullName"
                      className={styles.input}
                      placeholder="Votre nom et prénom"
                      required
                      aria-required="true"
                      autoComplete="name"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="contact-phone" className={styles.label}>Téléphone</label>
                  <div className={styles.inputWrap}>
                    <Phone className={styles.inputIcon} size={18} aria-hidden="true" />
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className={styles.input}
                      placeholder="+212 6XX XX XX XX"
                      required
                      aria-required="true"
                      autoComplete="tel"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.spanFull}`}>
                  <label htmlFor="contact-email" className={styles.label}>Email</label>
                  <div className={styles.inputWrap}>
                    <Mail className={styles.inputIcon} size={18} aria-hidden="true" />
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className={styles.input}
                      placeholder="votre@email.com"
                      required
                      aria-required="true"
                      autoComplete="email"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.spanFull}`}>
                  <label htmlFor="contact-message" className={styles.label}>Message</label>
                  <div className={styles.inputWrap}>
                    <MessageSquare className={`${styles.inputIcon} ${styles.textareaIcon}`} size={18} aria-hidden="true" />
                    <textarea
                      id="contact-message"
                      name="message"
                      className={styles.textarea}
                      placeholder="Décrivez votre projet ou votre demande..."
                      rows={4}
                      required
                      aria-required="true"
                      disabled={status === 'submitting'}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                aria-live="polite"
              >
                {status === 'submitting' && <span className={styles.spinner} aria-hidden="true" />}
                {status === 'idle' && (
                  <>
                    Envoyer le message
                    <Send className={styles.submitIcon} size={18} aria-hidden="true" />
                  </>
                )}
                {status === 'submitting' && 'Envoi en cours...'}
                {status === 'success' && 'Message envoyé'}
                {status === 'error' && 'Réessayer'}
              </button>

              {status === 'success' && (
                <p className={styles.statusSuccess} role="status">
                  Merci. Nous vous recontacterons rapidement.
                </p>
              )}
              {status === 'error' && (
                <p className={styles.statusError} role="alert">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
