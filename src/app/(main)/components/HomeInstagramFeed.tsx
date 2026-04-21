'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HomeInstagramFeed.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  permalink: string;
  timestamp?: string;
}

const INSTAGRAM_HANDLE = 'rosewinarouz';
const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    caption: 'Terrain avec les communautés d\'Al Haouz. Ensemble pour le développement territorial.',
    likes: 124,
    comments: 18,
    permalink: '#',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    caption: 'Formation des femmes aux métiers du tissage. Autonomisation économique au quotidien.',
    likes: 89,
    comments: 12,
    permalink: '#',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    caption: 'Reboisement Haut Atlas — une action concrète pour le climat.',
    likes: 256,
    comments: 34,
    permalink: '#',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
    caption: 'Voix du Changement : écoutez notre dernier podcast sur la justice sociale.',
    likes: 167,
    comments: 22,
    permalink: '#',
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    caption: 'Rencontre avec les partenaires du projet Eau Potable. Merci à tous les acteurs.',
    likes: 92,
    comments: 8,
    permalink: '#',
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    caption: 'Soutien scolaire rural — les enfants au cœur de notre action.',
    likes: 203,
    comments: 29,
    permalink: '#',
  },
];

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function HomeInstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/instagram');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.posts) && data.posts.length > 0) {
            setPosts(data.posts);
            return;
          }
        }
      } catch {
        // ignore
      }
      setPosts(FALLBACK_POSTS);
    };

    load().finally(() => setLoading(false));
  }, []);

  // GSAP scroll reveals — fires after posts are loaded
  useLayoutEffect(() => {
    if (loading || posts.length === 0) return;

    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      if (!root) return;

      // Header reveal
      const header = root.querySelector('header');
      if (header) {
        gsap.fromTo(header,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%' }
          }
        );
      }

      // Cards stagger — alternating from left/right
      const cards = root.querySelectorAll(`.${styles.card}`);
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -30 : 30;
        gsap.fromTo(card,
          { autoAlpha: 0, y: 20, x: fromX },
          {
            autoAlpha: 1, y: 0, x: 0,
            duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, posts.length]);

  const instagramUrl = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  return (
    <section ref={sectionRef} className={styles.section}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <span className="sectionEyebrow">@{INSTAGRAM_HANDLE}</span>
          <h2 className={styles.title}>Suivez <span className={styles.highlight}>notre actualité</span></h2>
          <p className={styles.subtitle}>
            Retrouvez nos actions, terrains et rencontres en direct sur Instagram.
          </p>
        </div>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Voir sur Instagram
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </header>

      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} aria-hidden>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLineShort} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className={styles.image}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className={styles.igBadge}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </div>

              <div className={styles.cardContent}>
                <p className={styles.caption}>{post.caption}</p>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {formatCount(post.likes)}
                  </span>
                  <span className={styles.metaItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {formatCount(post.comments)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

    </section>
  );
}
