
import HomeFeatured from '@/app/(main)/components/HomeFeatured';
import HomeDomaines from '@/app/(main)/components/HomeDomaines';
import HomeProjets from '@/app/(main)/components/HomeProjets';
import HomeTemoignages from '@/app/(main)/components/HomeTemoignages';
import Footer from '@/components/Footer';

export default function HomeDashboardPage() {
  return (
    <>

      <HomeFeatured />
      <HomeDomaines />
      <HomeProjets />
      <HomeTemoignages />
      <Footer />
    </>
  );
}
