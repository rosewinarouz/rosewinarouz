import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { journalData } from '../data';
import styles from './ArticlePage.module.css';

// Generating static paths at build time for performance
export function generateStaticParams() {
    return journalData.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = journalData.find(a => a.slug === slug);

    if (!article) {
        notFound();
    }

    // Split content by double newlines for basic paragraph formatting
    const paragraphs = article.content.split('\n\n').filter(p => p.trim() !== '');

    return (
        <article className={styles.articleWrapper}>
            <div className={styles.blob1} />
            <div className={styles.blob2} />

            {/* Header */}
            <header className={styles.articleHero}>
                <Link href="/journal" className={styles.backLink}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour au Journal
                </Link>
                <div>
                    <span className={styles.articleCategory}>{article.category}</span>
                    <h1 className={styles.articleTitle}>{article.title}</h1>
                    <div className={styles.articleMeta}>
                        <div className={styles.metaItem}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {article.date}
                        </div>
                        <span className={styles.metaDot} />
                        <div className={styles.metaItem}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {article.author}
                        </div>
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            <div className={styles.coverWrapper}>
                <Image 
                    src={article.imageCover} 
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1000px) 100vw, 1000px"
                    className={styles.coverImage}
                />
            </div>

            {/* Body */}
            <div className={styles.articleBody}>
                {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                ))}

                {/* PDF Download CTA */}
                {article.pdfUrl && (
                    <div className={styles.pdfDownloadCard}>
                        <div className={styles.pdfInfo}>
                            <div className={styles.pdfIcon}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className={styles.pdfText}>
                                <h4>Télécharger le document final</h4>
                                <p>Version complète PDF ({article.title})</p>
                            </div>
                        </div>
                        <a 
                            href={article.pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.downloadBtn}
                            aria-label="Télécharger le PDF"
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger PDF
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}
