import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'À propos',
    description:
        'Découvrez Rose Winarouz : notre mission, notre approche de co-construction et nos valeurs au service du développement territorial durable à Al Haouz.',
    openGraph: {
        title: 'À propos | Rose Winarouz',
        description:
            'Une alliance entre intelligence des territoires et solidarité humaine. Découvrez notre mission et nos valeurs.',
        type: 'website',
        locale: 'fr_FR',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'À propos | Rose Winarouz',
        description: 'Notre mission, notre approche et nos valeurs pour le développement territorial durable.',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
