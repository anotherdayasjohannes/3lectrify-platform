'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  photo: {
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
  bio?: string;
  linkedinUrl?: string;
  email?: string;
}

interface TeamGridProps {
  heading?: string;
  introText?: PortableTextBlock[];
  teamMembers: TeamMember[];
}

export function TeamGrid({ heading, introText, teamMembers }: TeamGridProps) {

  return (
    <section className="bg-[#293645] pt-[40px] pb-[40px] md:pt-[50px] md:pb-[50px] px-5 md:px-10 lg:px-[50px]">
      {/* Content Wrapper - Centered */}
      <div className="flex flex-col items-center">
        {/* Intro Section - Mobile-first */}
        {(heading || introText) && (
          <div className="w-full max-w-[1165px] mb-8 md:mb-10 lg:mb-[40px]">
            {heading && (
              <h2 className="text-[28px] leading-[36px] tracking-[0.28px] md:text-[32px] md:leading-[42px] md:tracking-[0.32px] lg:text-[36px] lg:leading-[46px] lg:tracking-[0.36px] font-light text-white m-0 mb-6 md:mb-8">
                {heading}
              </h2>
            )}
            {introText && (
              <div className="text-[16px] leading-[24px] tracking-[0.16px] md:text-[18px] md:leading-[26px] md:tracking-[0.18px] font-normal text-white [&_p]:m-0 max-w-[900px]">
                <PortableText value={introText} />
              </div>
            )}
          </div>
        )}

        {/* Team Grid - Flexbox layout with fixed card width */}
        <div 
          className="w-full max-w-[1165px] flex flex-wrap gap-5 md:gap-[20px] lg:gap-[25px] items-start"
          style={{ perspective: '1500px' }} // Enable 3D perspective
        >
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={member._id} 
              member={member}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, refCallback }: { member: TeamMember; refCallback?: (el: HTMLDivElement | null) => void }) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleMouseEnter = () => setIsOverlayVisible(true);
  const handleMouseLeave = () => setIsOverlayVisible(false);

  return (
    <article className="w-full sm:w-[calc(50%-10px)] lg:w-[270px] lg:max-w-[270px] transition-all duration-500 ease-out hover:scale-[1.02]"
      style={{ 
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'visible',
      }}
      onMouseMove={(e) => {
        // 🎨 3D tilt on hover based on mouse position (desktop only)
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X in card
        const y = e.clientY - rect.top;  // Mouse Y in card
        
        // Calculate rotation (-10 to +10 degrees)
        const rotateY = ((x / rect.width) - 0.5) * 20;  // Horizontal tilt
        const rotateX = ((y / rect.height) - 0.5) * -20; // Vertical tilt
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }}
      onMouseLeave={(e) => {
        // Reset to flat state
        e.currentTarget.style.transform = '';
      }}
    >
      <div className="flex flex-col gap-3 md:gap-4 lg:gap-[15px]">
        {/* Photo Wrapper with Overlay - Responsive height */}
        <div
          className="relative w-full h-[350px] sm:h-[380px] md:h-[400px] rounded-[20px] overflow-hidden bg-white/5 cursor-pointer group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          style={{
            // 🎨 Subtle shadow in rest state
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={() => setIsOverlayVisible(true)}
          onBlur={() => setIsOverlayVisible(false)}
          tabIndex={member.bio ? 0 : undefined}
        >
          {/* Photo */}
          <div className="w-full h-full">
            <Image
              src={member.photo.url}
              alt={member.photo.alt || `Portrait of ${member.name}`}
              width={member.photo.width}
              height={member.photo.height}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              style={{ objectPosition: getFocalPoint(member.photo.hotspot) }}
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 270px"
            />
          </div>

          {/* Hover Overlay - Mobile-first padding */}
          {member.bio && (
            <div className={`absolute inset-0 bg-[rgba(41,54,69,0.95)] backdrop-blur-[8px] flex items-center justify-center p-5 md:p-6 lg:p-[25px] transition-all duration-300 ease-out ${
                isOverlayVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div
                className={`flex flex-col gap-4 md:gap-5 lg:gap-[20px] w-full transition-transform duration-300 ease-out ${
                  isOverlayVisible ? 'translate-y-0' : 'translate-y-5'
                }`}
              >
                {/* Bio Text - Responsive */}
                <div className="text-[13px] leading-[18px] md:text-[14px] md:leading-[20px] font-light text-white text-left overflow-y-auto max-h-[240px] md:max-h-[280px]">
                  {member.bio}
                </div>

                {/* Social Links - 44px touch targets for mobile */}
                {(member.linkedinUrl || member.email) && (
                  <div className="flex gap-3 md:gap-[15px] items-center">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-11 h-11 md:w-[40px] md:h-[40px] rounded-full bg-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[#88C0B1] hover:text-[#293645] hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#88C0B1] focus-visible:outline-offset-2 touch-manipulation"
                        aria-label={`LinkedIn profile of ${member.name}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center w-11 h-11 md:w-[40px] md:h-[40px] rounded-full bg-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[#88C0B1] hover:text-[#293645] hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#88C0B1] focus-visible:outline-offset-2 touch-manipulation"
                        aria-label={`Email ${member.name}`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Section - Responsive typography */}
        <div className="flex flex-col gap-1 md:gap-[5px] text-left">
          <h3 className="text-[16px] leading-[24px] md:text-[18px] md:leading-[26px] font-normal tracking-[0.16px] md:tracking-[0.18px] text-white m-0">
            {member.name}
          </h3>
          <p className="text-[14px] leading-[22px] md:text-[16px] md:leading-[26px] font-light tracking-[0.14px] md:tracking-[0.16px] text-white m-0">
            {member.title}
          </p>
        </div>
      </div>
    </article>
  );
}

