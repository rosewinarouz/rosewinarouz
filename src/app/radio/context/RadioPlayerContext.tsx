'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type MediaType = 'podcast' | 'video';

export interface MediaItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  duration: number;
  durationLabel: string;
  image: string;
  type: MediaType;
  src?: string;
}

export interface RadioPlayerState {
  current: MediaItem | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  volume: number;
  isLoading: boolean;
  isVideoVisible: boolean;
  playbackRate: number;
}

const defaultState: RadioPlayerState = {
  current: null,
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 1,
  isLoading: false,
  isVideoVisible: false,
  playbackRate: 1,
};

type RadioPlayerContextValue = RadioPlayerState & {
  play: (item: MediaItem) => void;
  pause: () => void;
  toggle: () => void;
  seek: (fraction: number) => void;
  skipTime: (delta: number) => void;
  setVolume: (v: number) => void;
  setPlaybackRate: (rate: number) => void;
  closeVideo: () => void;
  stop: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  playingId: string | null;
  discoveredDurations: Record<string, number>;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) throw new Error('useRadioPlayer must be used within RadioPlayerProvider');
  return ctx;
}

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RadioPlayerState>(defaultState);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [discoveredDurations, setDiscoveredDurations] = useState<Record<string, number>>({});
  const isLoadedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef(state);
  const isStoppingRef = useRef(false);

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoadedRef.current) {
      const saved = localStorage.getItem('rw-radio-favorites');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setFavorites(parsed);
        } catch (e) { console.error('LocalStorage load failed', e); }
      }
      isLoadedRef.current = true;
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoadedRef.current) {
      localStorage.setItem('rw-radio-favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Sync state ref
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);

  const play = useCallback((item: MediaItem) => {
    setState((s) => ({
      ...s,
      current: item,
      isPlaying: true,
      isLoading: item.type !== 'video',
      isVideoVisible: item.type === 'video',
      progress: 0,
      currentTime: 0,
    }));
  }, []);

  const pause = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: false }));
  }, []);

  const toggle = useCallback(() => {
    setState((s) => {
      if (!s.current) return s;
      return { ...s, isPlaying: !s.isPlaying };
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    const el = audioRef.current;
    if (el) el.volume = v;
    setState((s) => ({ ...s, volume: v }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    const el = audioRef.current;
    if (el) el.playbackRate = rate;
    setState((s) => ({ ...s, playbackRate: rate }));
  }, []);

  const closeVideo = useCallback(() => {
    setState((s) => ({ ...s, isVideoVisible: false, isPlaying: false }));
  }, []);

  const stop = useCallback(() => {
    isStoppingRef.current = true;
    setState((s) => ({
      ...s,
      current: null,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      isLoading: false
    }));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
      audioRef.current.removeAttribute('data-src');
    }
    setTimeout(() => { isStoppingRef.current = false; }, 100);
  }, []);

  const seek = useCallback((fraction: number) => {
    const el = audioRef.current;
    if (!el) return;
    const time = fraction * el.duration;
    el.currentTime = time;
    setState((s) => ({ ...s, currentTime: time, progress: fraction * 100 }));
  }, []);

  const skipTime = useCallback((delta: number) => {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const newTime = Math.max(0, Math.min(el.duration, el.currentTime + delta));
    el.currentTime = newTime;
    setState((s) => ({
      ...s,
      currentTime: newTime,
      progress: (newTime / el.duration) * 100
    }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.createElement('audio');
    el.preload = 'metadata';
    audioRef.current = el;

    const onTimeUpdate = () => {
      const currentItem = stateRef.current.current;
      if (!currentItem) return;
      const progress = (el.currentTime / currentItem.duration) * 100;
      setState((s) => ({ ...s, currentTime: el.currentTime, progress }));
    };

    const onLoadedMetadata = () => {
      if (el.duration && stateRef.current.current) {
        setDiscoveredDurations(prev => ({
          ...prev,
          [stateRef.current.current!.id]: el.duration
        }));
      }
      setState((s) => ({
        ...s,
        isLoading: false,
        current: s.current ? { ...s.current, duration: el.duration } : null
      }));
    };

    const onEnded = () => {
      setState((s) => ({ ...s, isPlaying: false, progress: 0, currentTime: 0 }));
    };

    const onError = (e: any) => {
      const currentItem = stateRef.current.current;
      // Suppress errors when the player is intentionally stopped or source is empty
      if (isStoppingRef.current || !currentItem || !el.src || el.src === window.location.href) return;

      console.error('Audio error:', e);
      setState((s) => ({ ...s, isLoading: false, isPlaying: false }));
    };

    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('loadedmetadata', onLoadedMetadata);
    el.addEventListener('ended', onEnded);
    el.addEventListener('error', onError);

    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('loadedmetadata', onLoadedMetadata);
      el.removeEventListener('ended', onEnded);
      el.removeEventListener('error', onError);
      el.pause();
      audioRef.current = null;
    };
  }, []); // Initial setup

  // Sync effect: handles source changes and play/pause based on state
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !state.current) return;

    const src = state.current.src || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

    // 1. Handle Source Change (Podcasts only)
    if (state.current.type === 'podcast') {
      const currentSrc = el.src;
      const isNewSrc = el.getAttribute('data-src') !== src;

      // Re-load if it's a new URL OR if the player was stopped (src cleared)
      if (isNewSrc || !currentSrc) {
        el.setAttribute('data-src', src);
        el.src = src;
        el.load();
      }

      // 2. Handle Play/Pause & Rate State
      el.playbackRate = state.playbackRate;

      if (state.isPlaying) {
        const playPromise = el.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Playback failed:', error);
              setState(s => ({ ...s, isPlaying: false, isLoading: false }));
            }
          });
        }
      } else {
        el.pause();
      }
    } else {
      // It's a video, ensure audio is paused
      el.pause();
    }
  }, [state.current?.id, state.current?.type, state.isPlaying, state.playbackRate]);

  const value: RadioPlayerContextValue = {
    ...state,
    favorites,
    play,
    pause,
    toggle,
    seek,
    skipTime,
    setVolume,
    setPlaybackRate,
    closeVideo,
    stop,
    toggleFavorite,
    isFavorite,
    playingId: state.current?.id ?? null,
    discoveredDurations,
  };

  return (
    <RadioPlayerContext.Provider value={value}>
      {children}
    </RadioPlayerContext.Provider>
  );
}
