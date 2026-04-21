'use client';

import { useState, useRef } from 'react';
import Topbar from '@/components/dashboard/Topbar';
import { RadioPlayerProvider } from './context/RadioPlayerContext';
import RadioParallaxHero from './components/RadioParallaxHero';
import RadioFeatured from './components/RadioFeatured';
import RadioMediaGrid from './components/RadioMediaGrid';
import RadioFooter from './components/RadioFooter';
import RadioPlayer from './components/RadioPlayer';
import VideoModal from './components/VideoModal';
import styles from './RadioPageClient.module.css';

export default function RadioPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSearchSubmit = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <RadioPlayerProvider>
      <div className={styles.wrap}>
        <div className={styles.heroSection}>
          <RadioParallaxHero />
        </div>
        <RadioFeatured />
        <div className={styles.searchSection}>
          <Topbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
        <div ref={gridRef}>
          <RadioMediaGrid searchQuery={searchQuery} />
        </div>
        <RadioFooter />
      </div>
      <RadioPlayer />
      <VideoModal />
    </RadioPlayerProvider>
  );
}
