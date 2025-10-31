import type { Metadata } from "next";
import { Lato } from 'next/font/google';
import { client, siteSettingsQuery } from '@3lectrify/sanity';
import { Header, Footer, Analytics } from '@/components';
import { AnimationInit } from '../components/AnimationInit';
import "./globals.css";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

// Revalidate layout every hour (3600 seconds) as a fallback
// Primary updates come from webhook-based on-demand revalidation
// This affects site-wide settings (header, footer, navigation)
export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL('https://3lectrify.com'),
  title: "3lectrify - Wir elektrifizieren die Zukunft des Bauens",
  description: "Unser Antrieb ist es, die Immobilienbranche zu transformieren und eine nachhaltige, elektrifizierte Zukunft zu gestalten.",
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://3lectrify.com',
    title: '3lectrify - Wir elektrifizieren die Zukunft des Bauens',
    description: 'Unser Antrieb ist es, die Immobilienbranche zu transformieren und eine nachhaltige, elektrifizierte Zukunft zu gestalten.',
    siteName: '3lectrify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '3lectrify - Wir elektrifizieren die Zukunft des Bauens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3lectrify - Wir elektrifizieren die Zukunft des Bauens',
    description: 'Unser Antrieb ist es, die Immobilienbranche zu transformieren und eine nachhaltige, elektrifizierte Zukunft zu gestalten.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
};

async function getSiteSettings() {
  try {
    const settings = await client.fetch(siteSettingsQuery);
    return settings;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  // Default navigation if Sanity data is not available
  const defaultNav = [
    { label: 'Ihr Vorteil', href: '/ihr-vorteil' },
    { label: 'Unser Konzept', href: '/unser-konzept' },
    { label: 'Projekte', href: '/projekte' },
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  const defaultFooterNav = [
    { label: 'Ihr Vorteil als Investor', href: '/ihr-vorteil' },
    { label: 'Unser Konzept', href: '/unser-konzept' },
    { label: 'Projekte & Referenzen', href: '/projekte' },
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Kontakt', href: '/kontakt' },
  ];

  const defaultLegalLinks = [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
    { label: 'Widerrufsbelehrung', href: '/widerrufsbelehrung' },
  ];

  return (
    <html lang="de" className={lato.variable}>
      <body className="antialiased">
        {/* Analytics: GTM, GA4, Usercentrics Consent */}
        <Analytics />
        
        {/* Initialize 3lectrify custom animations */}
        <AnimationInit />
        
        <Header
          logo={settings?.logo ? {
            url: settings.logo.asset?.url,
            alt: settings.logo.alt || '3lectrify',
          } : undefined}
          navigation={settings?.navigation || defaultNav}
        />
        {children}
        <Footer
          headline={settings?.footerHeadline}
          newsletter={settings?.footerNewsletter}
          footerNavigation={settings?.footerNavigation || defaultFooterNav}
          legalLinks={settings?.legalLinks || defaultLegalLinks}
          copyrightText={settings?.copyrightText}
        />
      </body>
    </html>
  );
}
