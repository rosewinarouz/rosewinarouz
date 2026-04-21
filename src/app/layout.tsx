import type { Metadata } from "next";
import "./globals.css";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ThemeProvider from "@/context/ThemeProvider";
import MainPreloader from "@/components/MainPreloader";

const SITE_URL = "https://rosewinarouz.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Accueil | Rose Winarouz",
    template: "%s | Rose Winarouz",
  },
  description:
    "Association Rose Winarouz – Engagée dans le développement territorial durable, l'intelligence des territoires et la solidarité communautaire au Maroc.",
  keywords: [
    "Rose Winarouz",
    "développement territorial",
    "association Maroc",
    "Al Haouz",
    "développement durable",
    "intelligence des territoires",
    "reconstruction durable",
    "radio communautaire Maroc",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rose Winarouz – Agir localement pour transformer durablement les territoires",
    description:
      "Association engagée dans le développement territorial durable et l'intelligence des territoires.",
    type: "website",
    locale: "fr_FR",
    siteName: "Rose Winarouz",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Winarouz – Développement territorial durable",
    description:
      "Association engagée dans le développement territorial durable et l'intelligence des territoires au Maroc.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "NGO", "NonProfit" as const],
  name: "Association Rose Winarouz",
  alternateName: "Rose Winarouz",
  url: SITE_URL,
  logo: `${SITE_URL}/logo - RGB.png`,
  description:
    "Association engagée dans le développement territorial durable, l'intelligence des territoires et la solidarité communautaire au Maroc.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Al Haouz",
    addressCountry: "MA",
  },
  areaServed: {
    "@type": "Place",
    name: "Province Al Haouz, Maroc",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <MainPreloader />
        <ThemeProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

