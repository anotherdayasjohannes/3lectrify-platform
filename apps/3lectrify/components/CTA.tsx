'use client';

import { PortableText } from '@portabletext/react';
import { Button } from './Button';

interface CTAProps {
  headline?: string;
  description?: any; // PortableText content
  buttonText: string;
  buttonLink: string;
  openInNewTab?: boolean;
}

export function CTA({
  headline,
  description,
  buttonText,
  buttonLink,
  openInNewTab = false,
}: CTAProps) {

  return (
    <section className="w-full bg-[#293645] pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] flex justify-center items-center px-5 md:px-10 lg:px-[50px]">
      <div className="w-full max-w-[1165px]">
        {/* Mobile-first card padding: mobile → tablet → desktop */}
        <article className="bg-[#3c5067] rounded-[20px] px-6 py-8 sm:px-8 sm:py-10 md:px-[60px] md:py-[50px] lg:px-[80px] lg:py-[60px] flex flex-col items-center gap-6 md:gap-8 lg:gap-10 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          
          {/* Header: Headline + Description - Mobile-first responsive typography */}
          <header className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-[900px]">
            {headline && (
              <h2 className="text-white text-[24px] leading-[32px] tracking-[0.24px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light m-0">
                {headline}
              </h2>
            )}
            
            {description && (
              <div className="text-white text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] lg:text-[20px] lg:leading-[34px] lg:tracking-[0.2px] font-normal">
                <PortableText 
                  value={description}
                  components={{
                    block: {
                      normal: ({children}) => (
                        <p className="mb-5 md:mb-[26px] last:mb-0">
                          {children}
                        </p>
                      )
                    }
                  }}
                />
              </div>
            )}
          </header>
          
          {/* Button - Full width on mobile, auto on desktop */}
          <Button
            variant="primary"
            href={buttonLink}
            openInNewTab={openInNewTab}
            className="w-full sm:w-auto group"
            aria-label={buttonText}
          >
            <span className="whitespace-nowrap">
              {buttonText}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <g clipPath="url(#clip0_cta)">
                <path d="M7.5 10L3.75 13.75L7.5 17.5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 2.5V13.75H3.75" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_cta">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Button>
          
        </article>
      </div>
    </section>
  );
}

