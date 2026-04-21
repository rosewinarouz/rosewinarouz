import RadioPreloader from '@/components/RadioPreloader';

export default function RadioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <RadioPreloader />
            {children}
        </>
    );
}
