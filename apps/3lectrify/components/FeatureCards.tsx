'use client';

import Image from 'next/image';

interface Card {
  _key: string;
  icon?: {
    url: string;
    alt: string;
  };
  title: string;
  description?: string;
}

interface FeatureCardsProps {
  sectionHeadline?: string;
  sectionDescription?: string;
  cards: Card[];
}

export function FeatureCards({
  sectionHeadline,
  sectionDescription,
  cards,
}: FeatureCardsProps) {

  return (
    <section className="relative pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] bg-[#293645]"
    >
      <div className="content-wrapper">
        {/* Section Header - Mobile-first typography */}
        <div className="mb-8 md:mb-10 lg:mb-[60px]">
          {sectionHeadline && (
            <h2 className="text-[28px] leading-[36px] tracking-[0.28px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light mb-6 md:mb-8 text-white text-left"
            >
              {sectionHeadline}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal text-white text-left max-w-[800px]"
            >
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Cards Grid - Mobile-first: 1 col → sm: 2 cols → lg: 4 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-[30px] justify-items-center">
          {cards.map((card) => (
            <article
              key={card._key}
              className="bg-[#3C5067] rounded-[20px] p-6 sm:p-[30px_25px] md:p-[35px_25px] lg:p-[40px_30px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] w-full"
            >
              {card.icon && (
                <div className="mb-5 md:mb-6 lg:mb-[25px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || ''}
                    width={80}
                    height={80}
                    className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[80px] lg:h-[80px] object-contain"
                  />
                </div>
              )}
              <h3 className="text-[18px] leading-[26px] tracking-[0.18px] md:text-[20px] md:leading-[28px] md:tracking-[0.2px] lg:text-[24px] lg:leading-[32px] lg:tracking-[0.24px] font-normal mb-3 md:mb-4 text-white text-left">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-[14px] leading-[22px] tracking-[0.14px] md:text-[16px] md:leading-[26px] md:tracking-[0.16px] font-normal m-0 text-white text-left">
                  {card.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
