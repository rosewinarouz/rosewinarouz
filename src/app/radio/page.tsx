import Topbar from '@/components/dashboard/Topbar';
import RadioFeatured from './components/RadioFeatured';
import RadioMediaGrid from './components/RadioMediaGrid';
import RadioThematics from './components/RadioThematics';
import RadioFooter from './components/RadioFooter';

export const metadata = {
    title: 'Radio Dashboard | Rose Winarouz',
    description: 'Écoutez la voix de la province d\'Al Haouz en direct. Découvrez nos programmes, nos débats et la musique locale.',
};

export default function RadioDashboardPage() {
    return (
        <>
            <Topbar />
            <RadioFeatured />
            <RadioMediaGrid />
            <RadioThematics />
            <RadioFooter />
        </>
    );
}
