import Link from 'next/link';
import Image from 'next/image';
import { ProjectData } from '../projects/data';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    project: ProjectData;
    className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active': return styles.statusActive;
            case 'completed': return styles.statusCompleted;
            case 'phase': return styles.statusPhase;
            default: return '';
        }
    };

    const imageUrl = project.imageCount > 0
        ? `${project.imageDir}/rose-winarouz-1.jpg`
        : '/logo - RGB.png';

    return (
        <Link
            href={`/projects/${project.slug}`}
            className={`${styles.projectCardLink} ${className}`}
            data-testid="project-card"
        >
            <article className={styles.projectCard} id={`project-${project.slug}`}>
                <div className={styles.cardImage}>
                    <Image
                        src={imageUrl}
                        alt={project.shortTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className={styles.cardImg}
                    />
                </div>
                <div className={styles.cardOverlay} />

                <div className={styles.cardContent}>
                    <div className={styles.statusRow}>
                        <span className={`${styles.statusDot} ${getStatusClass(project.status)}`} />
                        <span className={styles.statusLabel}>{project.statusLabel}</span>
                    </div>

                    <span className={styles.categoryBadge}>{project.category}</span>

                    <h3 className={styles.cardTitle}>{project.shortTitle}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>

                    <div className={styles.cardFooter}>
                        <div className={styles.progressWrapper}>
                            <div className={styles.progressLabel}>
                                <span>Avancement</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className={styles.progressTrack}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>

                        <span className={styles.arrowLink} aria-label="Voir le projet">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}

