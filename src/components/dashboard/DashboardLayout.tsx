import Sidebar from '@/components/dashboard/Sidebar';
import styles from '@/components/dashboard/DashboardLayout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.radioApp}>
            <Sidebar />
            <div className={styles.mainContent}>
                {children}
            </div>
        </div>
    );
}
