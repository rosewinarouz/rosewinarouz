'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileNav.module.css';

const HomeIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>);
const AboutIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>);
const ProjectsIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>);
const RadioIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>);
const ContactIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>);

const VolunteerIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>);

const navItems = [
    { label: 'Accueil', href: '/', icon: HomeIcon },
    { label: 'À Propos', href: '/about', icon: AboutIcon },
    { label: 'Projets', href: '/projects', icon: ProjectsIcon },
    { label: 'Radio', href: '/radio', icon: RadioIcon },
    { label: 'Contact', href: '/contact', icon: ContactIcon },
];

export default function MobileNav({ onOpenDonation }: { onOpenDonation: () => void }) {
    const pathname = usePathname();

    // Split items for the "pop" button in the middle
    const leftItems = navItems.slice(0, 3);
    const rightItems = navItems.slice(3);

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
            <Link
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
                <span className={styles.icon}>
                    <Icon />
                </span>
                <span className={styles.label}>{item.label}</span>
            </Link>
        );
    };

    return (
        <nav className={styles.mobileNav} aria-label="Navigation mobile">
            <div className={styles.navContainer}>
                <div className={styles.standardNav}>
                    {navItems.map(item => (
                        <div key={item.href} className={styles.navItem}>
                            <NavLink item={item} />
                        </div>
                    ))}
                </div>

                {/* Right-Side "Pop" Action Button */}
                <div className={styles.actionItem}>
                    <button
                        className={styles.actionButton}
                        onClick={onOpenDonation}
                        aria-label="Faire un don"
                    >
                        <VolunteerIcon />
                    </button>
                    <span className={styles.actionLabel}>Don</span>
                </div>
            </div>
        </nav>
    );
}
