import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Rose Winarouz',
  description:
    'Rejoignez le mouvement Rose Winarouz. Devenez bénévole, partenaire ou contactez-nous pour agir ensemble sur les territoires.',
  openGraph: {
    title: 'Contact | Rose Winarouz',
    description: 'Rejoignez le mouvement. Bénévoles, partenaires, nous sommes à votre écoute.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
