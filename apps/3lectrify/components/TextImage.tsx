'use client';

import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { Stats } from './Stats';
import { typography } from './theme';

interface TextImageProps {
  headline?: string;
  body?: PortableTextBlock[];
  quote?: {
    text: string;
    author?: string;
    icon?: {
      url: string;
      alt: string;
    };
  };
  stats?: Array<{
    _key: string;
    value: string;
    description: string;
    accentColor?: 'green' | 'orange' | 'blue' | 'curry';
  }>;
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
  imagePosition?: 'left' | 'right';
  variant?: 'light' | 'dark';
  fullWidth?: boolean;
}

export function TextImage({
  headline,
  body,
  quote,
  stats,
  image,
  imagePosition = 'left',
  variant = 'dark',
  fullWidth = false,
}: TextImageProps) {

  const bgColor = variant === 'dark' ? 'bg-[#293645]' : 'bg-white';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';
  const quoteTextColor = variant === 'dark' ? 'text-white' : 'text-[#333333]';

  const contentWrapper = fullWidth ? 'w-full' : 'content-wrapper';

  return (
    <section
      className={`${bgColor} ${textColor} pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px]`}
    >
      <div className={contentWrapper}>
        <div
          className="grid grid-cols-1 gap-[30px] sm:gap-[40px] md:grid-cols-text-image md:gap-[50px] items-start"
        >
          {/* Image */}
          {image && (
            <figure
              className={`w-full h-[430px] rounded-[20px] overflow-hidden md:h-auto md:aspect-[1.5] ${
                imagePosition === 'right' ? 'order-2' : 'order-1'
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={image.width}
                height={image.height}
                className="w-full h-full object-cover"
                style={{ objectPosition: getFocalPoint(image.hotspot) }}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 645px"
              />
            </figure>
          )}

          {/* Text Content */}
          <article
            className={`flex flex-col items-start justify-center gap-[40px] w-full ${
              imagePosition === 'right' ? 'order-1' : 'order-2'
            }`}
          >
            {headline && (
              <h2 
                className="text-[32px] leading-[40px] tracking-[0.36px] font-light w-full lg:text-[36px] lg:leading-[46px]"
              >
                {headline}
              </h2>
            )}

            {/* Quote Block */}
            {quote && (
              <blockquote className="flex flex-col items-start gap-[15px] w-full">
                {quote.icon?.url && (
                  <Image
                    src={quote.icon.url}
                    alt={quote.icon.alt || 'Quote'}
                    width={40}
                    height={35}
                    className="w-10 h-[35px]"
                    aria-hidden="true"
                  />
                )}

                <p
                     className={`font-light italic text-[24px] tracking-[0.28px] leading-normal ${quoteTextColor} max-w-[645px] lg:text-[28px]`}
                >
                  {quote.text}
                  {quote.author && (
                    <>
                      <br />
                      <br />
                      <span className="text-[16px] tracking-[0.16px] not-italic font-normal">
                        {quote.author}
                      </span>
                    </>
                  )}
                </p>
              </blockquote>
            )}

            {/* Body Text */}
            {body && (
              <div 
                className="w-full prose prose-invert prose-p:my-0 prose-p:mb-[26px] prose-p:last:mb-0 prose-ul:my-0 prose-ul:list-none prose-ul:pl-0 prose-ul:flex prose-ul:flex-col prose-ul:gap-[15px] prose-li:flex prose-li:gap-[12px] prose-li:items-start prose-li:leading-[22px] prose-li:before:content-[''] prose-li:before:flex-shrink-0 prose-li:before:w-[22px] prose-li:before:h-[22px] prose-li:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNOSAxNi4xN0w0LjgzIDEybC0xLjQyIDEuNDFMOSAxOSAyMSA3bC0xLjQxLTEuNDF6IiBmaWxsPSIjODhDMEIxIi8+Cjwvc3ZnPgo=')] prose-li:before:bg-no-repeat prose-li:before:bg-center prose-li:before:bg-contain"
                style={typography.body}
              >
                <PortableText 
                  value={body}
                  components={{
                    block: {
                      normal: ({children}) => (
                        <p className="mb-[26px] last:mb-0">
                          {children && children.toString().trim() !== '' ? children : <br />}
                        </p>
                      ),
                    },
                    marks: {
                      strong: ({children}) => <strong className="font-bold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    },
                  }}
                />
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <Stats stats={stats} layout="horizontal" variant={variant} embedded />
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

