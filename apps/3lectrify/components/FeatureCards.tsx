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
        {/* Section Header - Left Aligned */}
        <div className="mb-[60px] md:mb-[40px]">
          {sectionHeadline && (
            <h2 className="text-[40px] leading-[50px] tracking-[0.4px] font-light mb-[32px] text-white text-left md:text-[32px] md:leading-[42px] md:mb-[32px]"
            >
              {sectionHeadline}
            </h2>
          )}
          {sectionDescription && (
            <p className="text-[18px] leading-[30px] tracking-[0.18px] font-normal text-white text-left max-w-[800px] md:text-[16px] md:leading-[26px]"
            >
              {sectionDescription}
            </p>
          )}
        </div>

        {/* Cards Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] md:gap-[25px] max-md:gap-[20px] justify-items-center">
          {cards.map((card) => (
            <article
              key={card._key}
              className="bg-[#3C5067] rounded-[20px] p-[40px_30px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:p-[35px_25px] w-full"
            >
              {card.icon && (
                <div className="mb-[25px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 md:mb-[20px]">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || ''}
                    width={80}
                    height={80}
                    className="w-[80px] h-[80px] object-contain md:w-[70px] md:h-[70px]"
                  />
                </div>
              )}
              <h3 className="text-[24px] leading-[32px] tracking-[0.24px] font-normal mb-[15px] text-white text-left md:text-[20px] md:leading-[28px]">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-[16px] leading-[26px] tracking-[0.16px] font-normal m-0 text-white text-left">
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
