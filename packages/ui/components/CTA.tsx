'use client';

import { PortableText } from '@portabletext/react';
import { useScrollTextReveal } from '@3lectrify/animations';
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
  // ✨ Scroll-triggered text reveal for headline
  const headlineRef = useScrollTextReveal({
    stagger: 0.05,
    duration: 0.4,
    yDistance: 15,
    triggerStart: 'top 85%',
  });

  return (
    <section className="w-full bg-[#293645] py-[50px] lg:py-20 flex justify-center items-center px-[50px] md:px-[40px] sm:px-[20px]">
      <div className="w-full max-w-[1165px]">
        <article className="bg-[#3c5067] rounded-[20px] px-[80px] py-[60px] md:px-[60px] md:py-[50px] sm:px-[30px] sm:py-10 flex flex-col items-center gap-10 md:gap-8 sm:gap-7 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          
          {/* Header: Headline + Description */}
          <header className="flex flex-col items-center text-center gap-[32px] md:gap-[32px] sm:gap-[32px] max-w-[900px]">
            {headline && (
              <h2 
                ref={headlineRef as any}
                className="text-[36px] leading-[46px] lg:text-[32px] lg:leading-[40px] sm:text-[28px] sm:leading-[36px] tracking-[0.36px] font-light text-white m-0"
              >
                {headline}
              </h2>
            )}
            
            {description && (
              <div className="text-[24px] leading-[34px] md:text-[20px] md:leading-[30px] sm:text-[18px] sm:leading-[26px] tracking-[0.24px] font-normal text-white">
                <PortableText 
                  value={description}
                  components={{
                    block: {
                      normal: ({children}) => (
                        <p className="mb-[26px] last:mb-0 text-white">
                          {children}
                        </p>
                      )
                    }
                  }}
                />
              </div>
            )}
          </header>
          
          {/* Button */}
          <Button
            variant="primary"
            href={buttonLink}
            openInNewTab={openInNewTab}
            className="group"
            aria-label={buttonText}
          >
            <span className="font-normal text-[#333333] text-[18px] tracking-[0.18px] leading-[26px] whitespace-nowrap">
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

