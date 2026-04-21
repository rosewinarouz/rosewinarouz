import type { MediaItem } from '../context/RadioPlayerContext';

function parseDuration(label: string): number {
  const parts = label.split(':').map(Number);
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return (h || 0) * 3600 + (m || 0) * 60 + (s || 0);
  }
  const [m, s] = parts;
  return (m || 0) * 60 + (s || 0);
}

export const FEATURED_ITEM: MediaItem = {
  id: 'featured-podcast-1',
  title: "Rose Winarouz et l'intelligence des territoires",
  subtitle: 'Épisode Spécial — Intelligence des Territoires',
  category: 'Podcast',
  duration: parseDuration('15:42'), // Estimated or will be synced from audio meta
  durationLabel: '15:42',
  image: '/podcast_cover.png',
  type: 'podcast',
  src: '/podcasts/Rose_Winarouz_et_l_intelligence_des_territoires.mp3',
};

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm1',
    title: 'Justice Territoriale #1',
    category: 'Justice sociale',
    duration: parseDuration('07:05'),
    durationLabel: '07:05',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
    type: 'podcast',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'm3',
    title: 'Culture et transmission',
    category: 'Culture & Éducation',
    duration: parseDuration('05:15'),
    durationLabel: '05:15',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    type: 'podcast',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'm4',
    title: 'Écologie Solidaire',
    category: 'Territoire',
    duration: parseDuration('08:45'),
    durationLabel: '08:45',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    type: 'podcast',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  },
  {
    id: 'm5',
    title: 'Éducation pour tous',
    category: 'Culture & Éducation',
    duration: parseDuration('04:20'),
    durationLabel: '04:20',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
    type: 'podcast',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
  {
    id: 'm7',
    title: 'Révolutionner l’Agriculture au Maroc (YoLaFresh)',
    category: 'Développement',
    duration: parseDuration('2:29:15'),
    durationLabel: '2:29:15',
    image: 'https://img.youtube.com/vi/Yk6lp89zbqU/maxresdefault.jpg',
    type: 'video',
    src: 'https://www.youtube.com/embed/Yk6lp89zbqU',
  },
  {
    id: 'm8',
    title: 'Entreprendre au Maroc : Guide & Conseils',
    category: 'Entrepreneuriat',
    duration: parseDuration('1:07:18'),
    durationLabel: '1:07:18',
    image: 'https://img.youtube.com/vi/R_wuWe7ci-c/maxresdefault.jpg',
    type: 'video',
    src: 'https://www.youtube.com/embed/R_wuWe7ci-c',
  },
];


function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${pad(s)}`;
}
