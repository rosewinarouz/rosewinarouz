'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Accent line */}
            <div className={styles.accentBar} />

            {/* Frosted glass backdrop */}
            <div className={styles.glassLayer} />

            {/* Ambient glow orbs */}
            <div className={styles.bgTexture} />

            {/* Main footer content */}
            <div className={styles.mainSection}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            Rose <span>Winarouz</span>
                        </Link>
                        <p className={styles.brandText}>
                            Association engagée dans le développement territorial
                            durable, l&apos;intelligence des territoires et la
                            solidarité communautaire au cœur du Maroc.
                        </p>
                        <div className={styles.socials}>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className={styles.socialIcon}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className={styles.socialIcon}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className={styles.socialIcon}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Navigation</h4>
                        <ul className={styles.colLinks}>
                            <li><Link href="/" className={styles.linkItem}>Accueil</Link></li>
                            <li><Link href="/about" className={styles.linkItem}>À Propos</Link></li>
                            <li><Link href="/projects" className={styles.linkItem}>Projets</Link></li>
                            <li><Link href="/radio" className={styles.linkItem}>Radio</Link></li>
                            <li><Link href="/contact" className={styles.linkItem}>Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Contact</h4>
                        <ul className={styles.colLinks}>
                            <li>
                                <a href="mailto:contact@rosewinarouz.org" className={styles.contactItem}>
                                    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    contact@rosewinarouz.org
                                </a>
                            </li>
                            <li>
                                <a href="tel:+212600000000" className={styles.contactItem}>
                                    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    +212 6 00 00 00 00
                                </a>
                            </li>
                            <li>
                                <span className={styles.contactItem}>
                                    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Province Al Haouz, Maroc
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className={styles.newsletterCol}>
                        <h4 className={styles.colTitle}>Newsletter</h4>
                        <p className={styles.newsletterText}>
                            Restez informé de nos actions et de l&apos;avancement
                            de nos projets territoriaux.
                        </p>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Votre email"
                                className={styles.newsletterInput}
                                aria-label="Adresse email pour la newsletter"
                            />
                            <button type="submit" className={styles.newsletterBtn}>
                                S&apos;inscrire
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottomBar}>
                <div className={styles.bottomInner}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Association{' '}
                        <a href="/">Rose Winarouz</a>. Tous droits réservés.
                    </p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy" className={styles.bottomLink}>
                            Politique de confidentialité
                        </Link>
                        <Link href="/terms" className={styles.bottomLink}>
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
