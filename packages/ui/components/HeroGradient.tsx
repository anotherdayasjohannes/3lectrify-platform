'use client';

interface HeroGradientProps {
  headline: string;
  subheadline?: string;
  backgroundImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    hotspot?: {
      x: number;
      y: number;
    };
  };
  gradientDirection?: 'left' | 'right';
  sectionHeight?: 'small' | 'medium' | 'large';
}

export function HeroGradient({
  headline,
  subheadline,
  backgroundImage,
  gradientDirection = 'left',
  sectionHeight = 'medium',
}: HeroGradientProps) {
  const getFocalPoint = (hotspot?: { x: number; y: number }) => {
    if (!hotspot) return 'center';
    return `${(hotspot.x * 100).toFixed(0)}% ${(hotspot.y * 100).toFixed(0)}%`;
  };

  return (
    <section className={`hero-gradient hero-gradient--${gradientDirection} hero-gradient--${sectionHeight}`}>
      {/* Background Image */}
      {backgroundImage?.url && (
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt || ''}
          className="hero-gradient__image"
          style={{ objectPosition: getFocalPoint(backgroundImage.hotspot) }}
          loading="eager"
        />
      )}

      {/* Gradient Overlay with Content */}
      <div className="hero-gradient__overlay">
        <div className="hero-gradient__content">
          {/* Headline */}
          <h1 className="hero-gradient__headline">{headline}</h1>

          {/* Optional Subheadline */}
          {subheadline && <p className="hero-gradient__subheadline">{subheadline}</p>}
        </div>
      </div>

      {/* Embedded CSS - Direct port from HubSpot */}
      <style jsx>{`
        .hero-gradient {
          position: relative;
          overflow: hidden;
          background-color: #293645;
          width: 100%;
        }

        /* Height Variants */
        .hero-gradient--small {
          height: 300px;
        }

        .hero-gradient--medium {
          height: 400px;
        }

        .hero-gradient--large {
          height: 500px;
        }

        /* Background Image */
        .hero-gradient__image {
          position: absolute;
          top: 0;
          right: 0;
          width: 1114px;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          z-index: 1;
        }

        .hero-gradient--right .hero-gradient__image {
          right: auto;
          left: 0;
        }

        /* Gradient Overlay */
        .hero-gradient__overlay {
          position: absolute;
          top: 0;
          left: 50px;
          width: 851px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          padding: 50px 0;
          z-index: 2;
          background: linear-gradient(
            90deg,
            rgba(41, 54, 69, 1) 0%,
            rgba(41, 54, 69, 1) 39%,
            rgba(41, 54, 69, 0.5) 82%,
            transparent 100%
          );
        }

        .hero-gradient--right .hero-gradient__overlay {
          left: auto;
          right: 50px;
          background: linear-gradient(
            270deg,
            rgba(41, 54, 69, 1) 0%,
            rgba(41, 54, 69, 1) 39%,
            rgba(41, 54, 69, 0.5) 82%,
            transparent 100%
          );
        }

        /* Content */
        .hero-gradient__content {
          max-width: 700px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Headline */
        .hero-gradient__headline {
          font-family: 'Lato', sans-serif;
          font-size: 48px;
          font-weight: 300;
          line-height: 58px;
          letter-spacing: 0.48px;
          color: #ffffff;
          margin: 0;
          text-align: left;
        }

        /* Subheadline */
        .hero-gradient__subheadline {
          font-family: 'Lato', sans-serif;
          font-size: 24px;
          font-weight: 300;
          line-height: 34px;
          letter-spacing: 0.24px;
          color: #ffffff;
          margin: 0;
          text-align: left;
        }

        /* Tablet: 768px - 1199px */
        @media (min-width: 768px) and (max-width: 1199px) {
          .hero-gradient--small {
            height: 250px;
          }

          .hero-gradient--medium {
            height: 350px;
          }

          .hero-gradient--large {
            height: 450px;
          }

          .hero-gradient__overlay {
            left: 40px;
            width: 60%;
            padding: 40px 0;
          }

          .hero-gradient--right .hero-gradient__overlay {
            left: auto;
            right: 40px;
          }

          .hero-gradient__image {
            width: 70%;
          }

          .hero-gradient__headline {
            font-size: 40px;
            line-height: 50px;
          }

          .hero-gradient__subheadline {
            font-size: 20px;
            line-height: 30px;
          }
        }

        /* Mobile: max-width 767px */
        @media (max-width: 767px) {
          .hero-gradient {
            height: auto !important;
            min-height: 300px;
          }

          .hero-gradient__image {
            position: relative;
            width: 100%;
            height: 300px;
            right: auto;
            left: auto;
          }

          .hero-gradient__overlay {
            position: relative;
            left: 0;
            width: 100%;
            padding: 30px 20px;
            background: linear-gradient(
              180deg,
              transparent 0%,
              rgba(41, 54, 69, 0.8) 40%,
              rgba(41, 54, 69, 1) 80%,
              rgba(41, 54, 69, 1) 100%
            ) !important;
          }

          .hero-gradient__content {
            max-width: 100%;
          }

          .hero-gradient__headline {
            font-size: 32px;
            line-height: 40px;
          }

          .hero-gradient__subheadline {
            font-size: 18px;
            line-height: 26px;
          }
        }
      `}</style>
    </section>
  );
}
