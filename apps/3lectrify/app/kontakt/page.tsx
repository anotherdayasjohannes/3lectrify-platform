import { client, pageQuery } from '@3lectrify/sanity';
import {
  HeroGradient,
  ContactSimple,
} from '@/components';

interface Address {
  headline: string;
  companyName: string;
  addressLine2?: string;
  street: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  mapsLinkText: string;
}

interface Labels {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  button: string;
  privacy: string;
  privacyLink: string;
}

interface SanityBlock {
  _type: string;
  // Hero Gradient
  headline?: string;
  subheadline?: string;
  backgroundImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    hotspot?: {
      x: number;
      y: number;
    };
    alt?: string;
  };
  gradientDirection?: 'left' | 'right';
  sectionHeight?: 'small' | 'medium' | 'large';
  // Contact Simple
  formHeadline?: string;
  labels?: Labels;
  address?: Address;
  successMessage?: string;
}

interface PageData {
  title: string;
  description?: string;
  content: SanityBlock[];
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';

export default async function KontaktPage() {
  const page: PageData = await client.fetch(pageQuery, { slug: 'kontakt' });

  if (!page) {
    return <div>Page not found</div>;
  }

  // DEBUG: Log what we're getting from Sanity
  console.log('Kontakt page data:', JSON.stringify(page, null, 2));
  console.log('Content blocks:', page.content?.map(b => b._type));

  return (
    <main>
      {/* DEBUG: Show what blocks we're rendering */}
      <div style={{ 
        padding: '20px', 
        background: '#ffd70020', 
        border: '2px solid #ffd700',
        margin: '20px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🐛 DEBUG INFO (Kontakt Page)</h3>
        <p><strong>Total blocks:</strong> {page.content?.length || 0}</p>
        <p><strong>Block types:</strong> {page.content?.map(b => b._type).join(', ') || 'none'}</p>
        <details>
          <summary style={{ cursor: 'pointer', padding: '5px' }}>View full page data</summary>
          <pre style={{ background: '#333', color: '#0f0', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(page, null, 2)}
          </pre>
        </details>
      </div>

      {page.content?.map((block, index) => {
        console.log(`Rendering block ${index}:`, block._type);
        switch (block._type) {
          case 'heroGradient':
            return (
              <HeroGradient
                key={index}
                headline={block.headline || ''}
                subheadline={block.subheadline}
                backgroundImage={
                  block.backgroundImage?.asset
                    ? {
                        url: block.backgroundImage.asset.url,
                        alt: block.backgroundImage.alt || '',
                        width: block.backgroundImage.asset.metadata?.dimensions.width,
                        height: block.backgroundImage.asset.metadata?.dimensions.height,
                        hotspot: block.backgroundImage.hotspot,
                      }
                    : undefined
                }
                gradientDirection={block.gradientDirection}
                sectionHeight={block.sectionHeight}
              />
            );

          case 'contactSimple':
            return (
              <ContactSimple
                key={index}
                headline={block.headline}
                subheadline={block.subheadline}
                formHeadline={block.formHeadline}
                labels={
                  block.labels || {
                    firstname: 'Vorname',
                    lastname: 'Nachname',
                    company: 'Unternehmen (optional)',
                    email: 'E-Mail',
                    phone: 'Telefon (optional)',
                    message: 'Nachricht',
                    button: 'Anfrage senden',
                    privacy: 'Ich habe die Datenschutzerklärung gelesen und akzeptiere diese.',
                    privacyLink: '/datenschutz',
                  }
                }
                address={
                  block.address || {
                    headline: 'Adresse',
                    companyName: '3lectrify',
                    street: 'Kramergasse 32',
                    postalCode: '82054',
                    city: 'Sauerlach',
                    email: 'kontakt@3lectrify.com',
                    phone: '+49 8104 64709-299',
                    mapsLinkText: 'In Google Maps öffnen',
                  }
                }
                successMessage={block.successMessage}
              />
            );

          default:
            console.warn('Unknown block type:', block._type);
            return (
              <div key={index} style={{ padding: '20px', background: '#ff000020', margin: '10px' }}>
                <strong>DEBUG: Unknown block type: {block._type}</strong>
                <pre>{JSON.stringify(block, null, 2)}</pre>
              </div>
            );
        }
      })}
    </main>
  );
}

// Generate metadata
export async function generateMetadata() {
  const page: PageData = await client.fetch(pageQuery, { slug: 'kontakt' });

  return {
    title: page?.title || 'Kontakt',
    description: page?.description || 'Kontaktieren Sie uns',
  };
}

