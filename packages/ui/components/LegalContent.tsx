'use client';

import { useEffect, useRef } from 'react';

interface LegalContentProps {
  iframeUrl: string;
}

export function LegalContent({ iframeUrl }: LegalContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && iframeUrl) {
      // Create and append the iframe div
      const iframeDiv = document.createElement('div');
      iframeDiv.className = 'itrk-legaltext';
      iframeDiv.setAttribute('data-itrk-legaltext-url', iframeUrl);
      containerRef.current.appendChild(iframeDiv);

      // Load the IT-Recht Kanzlei script
      const script = document.createElement('script');
      script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        const existingScript = document.querySelector(
          'script[src="https://www.it-recht-kanzlei.de/js/itrk-legaltext.js"]'
        );
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [iframeUrl]);

  return (
    <section className="bg-[#293645] py-[60px] pb-[80px] md:py-[50px] md:pb-[70px] sm:py-[40px] sm:pb-[60px] min-h-[60vh]">
      <div className="content-wrapper">
        <div
          ref={containerRef}
          className="[&_.itrk-legaltext]:font-normal [&_.itrk-legaltext]:text-[16px] [&_.itrk-legaltext]:leading-[1.6] [&_.itrk-legaltext]:text-white sm:[&_.itrk-legaltext]:text-[14px] [&_.itrk-legaltext_h2]:font-normal [&_.itrk-legaltext_h2]:text-[24px] [&_.itrk-legaltext_h2]:leading-[1.3] [&_.itrk-legaltext_h2]:text-white [&_.itrk-legaltext_h2]:mt-[40px] [&_.itrk-legaltext_h2]:mb-[20px] [&_.itrk-legaltext_h3]:font-normal [&_.itrk-legaltext_h3]:text-[18px] [&_.itrk-legaltext_h3]:leading-[1.4] [&_.itrk-legaltext_h3]:text-white [&_.itrk-legaltext_h3]:mt-[32px] [&_.itrk-legaltext_h3]:mb-[16px] [&_.itrk-legaltext_p]:mb-[16px] [&_.itrk-legaltext_p]:text-white [&_.itrk-legaltext_ul]:mb-[16px] [&_.itrk-legaltext_ul]:pl-[24px] [&_.itrk-legaltext_ul]:text-white [&_.itrk-legaltext_ol]:mb-[16px] [&_.itrk-legaltext_ol]:pl-[24px] [&_.itrk-legaltext_ol]:text-white [&_.itrk-legaltext_li]:mb-[8px] [&_.itrk-legaltext_li]:text-white [&_.itrk-legaltext_a]:text-[#88c0b1] [&_.itrk-legaltext_a]:underline [&_.itrk-legaltext_a]:transition-colors [&_.itrk-legaltext_a]:duration-300 [&_.itrk-legaltext_a:hover]:text-[#c5e0d7]"
        />
      </div>
    </section>
  );
}



