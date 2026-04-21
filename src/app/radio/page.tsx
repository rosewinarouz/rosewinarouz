import type { Metadata } from 'next';
import RadioPageClient from './RadioPageClient';

export const metadata: Metadata = {
  title: 'Radio',
  description:
    "Écoutez la voix de la province d'Al Haouz. Podcasts et émissions sur le développement territorial, la justice sociale et la culture.",
  openGraph: {
    title: 'Radio | Rose Winarouz',
    description: "Podcasts et émissions sur le développement territorial, la justice sociale et la culture à Al Haouz.",
    type: 'website',
    locale: 'fr_FR',
    images: ['/radio rose winarouz.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radio Rose Winarouz',
    description: "La voix de la province d'Al Haouz – Podcasts et émissions.",
  },
};

export default function RadioPage() {
  return <RadioPageClient />;
}
