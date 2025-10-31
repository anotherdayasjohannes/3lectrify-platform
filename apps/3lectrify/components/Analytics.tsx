'use client';

import Script from 'next/script';

/**
 * Analytics & Tracking Component
 * 
 * Implements:
 * - Usercentrics Consent Management (GDPR-compliant)
 * - Google Tag Manager (GT-NMDJXQRR)
 * - Google Analytics 4 (G-DHF0G7K0PK)
 * 
 * Tracking via GTM dataLayer events:
 * - generate_lead: Contact form submissions
 * - sign_up: Newsletter subscriptions
 * - scroll_depth: User engagement (configured in GTM)
 * - outbound_click: External link clicks (configured in GTM)
 */
export function Analytics() {
  return (
    <>
      {/* Usercentrics Consent Management Platform */}
      <Script
        id="usercentrics-cmp"
        data-eu-mode="true"
        data-settings-id="M37yKahNfdYa30"
        src="https://app.eu.usercentrics.eu/browser-ui/latest/loader.js"
        strategy="afterInteractive"
      />
      <Script
        type="application/javascript"
        src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
        strategy="afterInteractive"
      />

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GT-NMDJXQRR');`,
        }}
      />

      {/* Google Tag Manager - noscript fallback */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GT-NMDJXQRR"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {/* 
        Google Ads Conversion Tracking - TO BE CONFIGURED
        
        When setting up Google Ads campaigns, add conversion tracking here:
        
        Contact Form Conversion:
        - Event: generate_lead
        - Add Google Ads conversion tag with your Conversion ID and Label
        
        Newsletter Signup Conversion:
        - Event: sign_up
        - Add Google Ads conversion tag with your Conversion ID and Label
        
        Example structure (replace with actual values):
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'AW-CONVERSION_ID');
            `,
          }}
        />
      */}
    </>
  );
}

