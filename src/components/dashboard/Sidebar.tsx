'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import DonationModal from '@/components/DonationModal';
import { useTheme } from '@/context/ThemeProvider';

const HomeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const AboutIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>);
const ProjectsIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>);
const RadioIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
const VolunteerIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>);
const ContactIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>);
const SunIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>);
const MoonIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>);

const navItems = [
    { label: 'Accueil', href: '/', icon: HomeIcon },
    { label: 'À Propos', href: '/about', icon: AboutIcon },
    { label: 'Projets', href: '/projects', icon: ProjectsIcon },
    { label: 'Radio', href: '/radio', icon: RadioIcon },
    { label: 'Contact', href: '/contact', icon: ContactIcon },
];

export default function RadioSidebar({ onOpenDonation }: { onOpenDonation: () => void }) {
    const pathname = usePathname();
    const [expanded, setExpanded] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const width = expanded ? '260px' : '72px';
        document.documentElement.style.setProperty('--sidebar-width', width);
    }, [expanded]);

    return (
        <aside className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
            {/* Toggle button */}
            <button
                className={styles.toggleBtn}
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded ? 'Réduire le menu' : 'Ouvrir le menu'}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${styles.toggleIcon} ${expanded ? styles.toggleIconFlipped : ''}`}
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            {/* Logo */}
            <div className={`${styles.logo} ${!expanded ? styles.logoHidden : ''}`}>
                <Image
                    src="/logo - WT.png"
                    alt="Rose Winarouz Logo"
                    width={200}
                    height={45}
                    className={styles.logoImage}
                    priority
                />
            </div>

            {/* Nav */}
            <nav className={styles.nav} aria-label="Navigation principale">
                <ul className={styles.navList}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <li key={item.href} className={styles.navItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.iconPlaceholder}>
                                        <Icon />
                                    </span>
                                    <span className={styles.label}>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Theme Toggle */}
                <div className={styles.themeToggleWrapper}>
                    <button
                        type="button"
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
                    >
                        <span className={styles.iconPlaceholder}>
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </span>
                        <span className={styles.label}>
                            {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                        </span>
                    </button>
                </div>

                <div className={styles.donateWrapper}>
                    <button
                        type="button"
                        className={styles.donateBtn}
                        onClick={onOpenDonation}
                        aria-label="Faire un don"
                    >
                        <span className={styles.iconPlaceholder}>
                            <VolunteerIcon />
                        </span>
                        <span className={styles.label}>Faire un don</span>
                    </button>
                </div>
            </nav>

            {/* Magical dust particle effect */}
            <div className={styles.magicalDust} />
        </aside>
    );
}
