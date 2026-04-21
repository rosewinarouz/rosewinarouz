import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nos Projets',
    description:
        'Explorez les projets de Rose Winarouz : reconstruction post-séisme, éducation préscolaire, orientation des jeunes, santé et entrepreneuriat social à Al Haouz.',
    openGraph: {
        title: 'Nos Projets | Rose Winarouz',
        description:
            'Infrastructure, éducation, santé et autonomisation – découvrez nos projets de développement territorial durable.',
        type: 'website',
        locale: 'fr_FR',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nos Projets | Rose Winarouz',
        description: 'Projets de développement territorial durable à Al Haouz, Maroc.',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
