/**
 * TypeScript declarations for Google Tag Manager and Google Analytics
 * 
 * Extends the Window interface to include GTM dataLayer and gtag function
 */

interface Window {
  /**
   * Google Tag Manager dataLayer
   * Used to push events and custom data
   */
  dataLayer: Array<Record<string, any>>;

  /**
   * Google Analytics gtag function
   * Used for direct GA4 tracking calls
   */
  gtag: (...args: any[]) => void;

  /**
   * Usercentrics UI object
   * Used to control the consent banner
   */
  UC_UI?: {
    showSecondLayer: () => void;
    showFirstLayer: () => void;
    acceptAllConsents: () => void;
    denyAllConsents: () => void;
  };
}

