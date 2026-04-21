
import dynamic from 'next/dynamic';
import HomeFeatured from '@/app/(main)/components/HomeFeatured';
import Partners from '@/app/(main)/components/Partners';

/* Below-the-fold: lazy-loaded to reduce initial JS file count */
const HomeDomaines = dynamic(() => import('@/app/(main)/components/HomeDomaines'));
const HomeProjets = dynamic(() => import('@/app/(main)/components/HomeProjets'));
const HomeDonation = dynamic(() => import('@/app/(main)/components/HomeDonation'));
const HomeInstagramFeed = dynamic(() => import('@/app/(main)/components/HomeInstagramFeed'));
const HomeTemoignages = dynamic(() => import('@/app/(main)/components/HomeTemoignages'));

export default function HomeDashboardPage() {
  return (
    <>
      <HomeFeatured />
      <Partners />
      <HomeDomaines />
      <HomeProjets />
      <HomeDonation />
      <HomeInstagramFeed />
      <HomeTemoignages />
    </>
  );
}
