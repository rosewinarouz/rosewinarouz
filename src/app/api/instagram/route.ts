import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Instagram feed API. Replace this with your own logic:
 * - Instagram Graph API (business account)
 * - Server-side cache of posts from a CMS
 * - Third-party aggregator (e.g. Curator.io, EmbedSocial)
 */
export async function GET() {
  try {
    // Example: return static feed until you connect a real source
    const posts = [
      {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
        caption: "Terrain avec les communautés d'Al Haouz. Ensemble pour le développement territorial.",
        likes: 124,
        comments: 18,
        permalink: 'https://www.instagram.com/p/',
      },
      {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
        caption: 'Formation des femmes aux métiers du tissage. Autonomisation économique au quotidien.',
        likes: 89,
        comments: 12,
        permalink: 'https://www.instagram.com/p/',
      },
      {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
        caption: 'Reboisement Haut Atlas — une action concrète pour le climat.',
        likes: 256,
        comments: 34,
        permalink: 'https://www.instagram.com/p/',
      },
      {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
        caption: 'Voix du Changement : écoutez notre dernier podcast sur la justice sociale.',
        likes: 167,
        comments: 22,
        permalink: 'https://www.instagram.com/p/',
      },
      {
        id: '5',
        imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
        caption: 'Rencontre avec les partenaires du projet Eau Potable. Merci à tous les acteurs.',
        likes: 92,
        comments: 8,
        permalink: 'https://www.instagram.com/p/',
      },
      {
        id: '6',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
        caption: 'Soutien scolaire rural — les enfants au cœur de notre action.',
        likes: 203,
        comments: 29,
        permalink: 'https://www.instagram.com/p/',
      },
    ];

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
