import Footer from '@/components/Footer';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    );
}
