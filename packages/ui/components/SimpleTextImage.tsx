'use client';

import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { Heading } from './primitives/Heading';
import { BodyText } from './primitives/BodyText';

interface SimpleTextImageProps {
  headline?: string;
  body?: PortableTextBlock[];
  image?: {
    url: string;
    alt: string;
    width: number;
    height: number;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  variant?: 'light' | 'dark';
}

export function SimpleTextImage({
  headline,
  body,
  image,
  variant = 'dark',
}: SimpleTextImageProps) {
  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  return (
    <section className={`${bgColor} ${textColor} py-[50px] lg:py-20`}
    >
      <div className="content-wrapper">
        <div className="max-w-[645px] mx-auto flex flex-col items-start gap-[50px] md:gap-10 sm:gap-[30px]">
          
          {/* Text Content */}
          {(headline || body) && (
            <article className="flex flex-col items-start gap-[32px] sm:gap-[32px] w-full"
            >
              {headline && (
                <Heading
                  variant="h2"
                  color={variant === 'dark' ? 'white' : 'dark'}
                  className="text-left w-full"
                >
                  {headline}
                </Heading>
              )}

              {body && (
                <BodyText
                  as="div"
                  color={variant === 'dark' ? 'white' : 'dark'}
                  className="text-left w-full prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0 md:text-[16px] md:leading-[24px] sm:text-[16px] sm:leading-[24px]"
                >
                  <PortableText value={body} />
                </BodyText>
              )}
            </article>
          )}

          {/* Image */}
          {image && (
            <figure className="w-full aspect-[215/143] rounded-[20px] overflow-hidden bg-[#D9D9D9]"
            >
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                style={{ objectPosition: getFocalPoint(image.hotspot) }}
                sizes="(max-width: 767px) 100vw, 645px"
              />
            </figure>
          )}

        </div>
      </div>
    </section>
  );
}

