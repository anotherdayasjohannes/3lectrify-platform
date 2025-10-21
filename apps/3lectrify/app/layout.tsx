import type { Metadata } from "next";
import { Lato } from 'next/font/google';
import { client, siteSettingsQuery } from '@3lectrify/sanity';
import { Header, Footer } from '@3lectrify/ui';
import "./globals.css";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: "3lectrify - Wir elektrifizieren die Zukunft des Bauens",
  description: "Unser Antrieb ist es, die Immobilienbranche zu transformieren und eine nachhaltige, elektrifizierte Zukunft zu gestalten.",
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
