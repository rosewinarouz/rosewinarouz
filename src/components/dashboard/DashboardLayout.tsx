'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileNav from '@/components/dashboard/MobileNav';
import DonationModal from '@/components/DonationModal';
import GsapScrollConfig from '@/components/GsapScrollConfig';
import styles from '@/components/dashboard/DashboardLayout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
        <div className={styles.radioApp}>
            <GsapScrollConfig />
            <a href="#main-content" className="skip-link">Passer au contenu principal</a>
            <Sidebar onOpenDonation={() => setIsDonationModalOpen(true)} />
            <main id="main-content" className={styles.mainContent}>
                {children}
            </main>
            <MobileNav onOpenDonation={() => setIsDonationModalOpen(true)} />

            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />
        </div>
    );
}
