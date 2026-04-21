import type { Metadata } from 'next';
import { projectsData, getProjectBySlug } from '../data';

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Projet introuvable',
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: `${project.title} | Rose Winarouz`,
            description: project.description,
            type: 'article',
            locale: 'fr_FR',
            images: project.coverImage ? [project.coverImage] : (project.imageCount > 0 ? [`${project.imageDir}/rose-winarouz-1.jpg`] : []),
        },
        twitter: {
            card: 'summary_large_image',
            title: project.shortTitle,
            description: project.description,
        },
    };
}

export function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

export default function ProjectDetailLayout({ children }: Props) {
    return children;
}
