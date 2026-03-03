import type { Metadata } from "next";
import "./globals.css";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Accueil | Rose Winarouz",
  description:
    "Association Rose Winarouz – Engagée dans le développement territorial durable, l'intelligence des territoires et la solidarité communautaire au Maroc.",
  keywords: [
    "Rose Winarouz",
    "développement territorial",
    "association Maroc",
    "Al Haouz",
    "développement durable",
    "intelligence des territoires",
  ],
  openGraph: {
    title: "Rose Winarouz – Agir localement pour transformer durablement les territoires",
    description:
      "Association engagée dans le développement territorial durable et l'intelligence des territoires.",
    type: "website",
    locale: "fr_FR",
    siteName: "Rose Winarouz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
