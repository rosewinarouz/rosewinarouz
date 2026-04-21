'use client';

import { useState, useRef } from 'react';
import { useRadioPlayer } from '../context/RadioPlayerContext';
import { MEDIA_ITEMS } from '../data/media';
import styles from './RadioMediaGrid.module.css';
import RadioMediaCard from './RadioMediaCard';

const TABS = ['Tous', 'Podcasts', 'Vidéos', 'Favoris'];

interface RadioMediaGridProps {
  searchQuery: string;
}

export default function RadioMediaGrid({ searchQuery }: RadioMediaGridProps) {
  const { favorites } = useRadioPlayer();
  const [activeTab, setActiveTab] = useState('Tous');
  const [activeTag, setActiveTag] = useState('Tous');
  const trackRef = useRef<HTMLDivElement>(null);

  // Derive tags dynamically from data
  const dynamicTags = [
    'Tous',
    ...Array.from(new Set(MEDIA_ITEMS.map((item) => item.category))).sort(),
  ];

  const scroll = (dir: number) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 150, behavior: 'smooth' });
  };

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filtered = MEDIA_ITEMS.filter((m) => {
    // 1. Tab filtering (Type or Favorites)
    let matchTab = true;
    if (activeTab === 'Podcasts') matchTab = m.type === 'podcast';
    else if (activeTab === 'Vidéos') matchTab = m.type === 'video';
    else if (activeTab === 'Favoris') matchTab = favorites.includes(m.id);

    // 2. Tag filtering (Category)
    const matchTag = activeTag === 'Tous' ? true : m.category === activeTag;

    // 3. Search filtering
    const query = normalizeText(searchQuery);
    const matchSearch =
      normalizeText(m.title).includes(query) ||
      normalizeText(m.category).includes(query);

    return matchTab && matchTag && matchSearch;
  });

  return (
    <section className={styles.section}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabsWrapper}>
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tagsRow}>
        <div className={styles.tagsScroll} ref={trackRef}>
          {dynamicTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tagBadge} ${activeTag === tag ? styles.activeTagBadge : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={styles.tagsArrows}>
          <button type="button" className={styles.arrowBtn} onClick={() => scroll(-1)} aria-label="Précédent">
            &lt;
          </button>
          <button type="button" className={styles.arrowBtn} onClick={() => scroll(1)} aria-label="Suivant">
            &gt;
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <RadioMediaCard key={item.id} item={item} />
          ))
        ) : (
          <div className={styles.emptyState}>
            Aucun média ne correspond à ces filtres.
          </div>
        )}
      </div>
    </section>
  );
}
