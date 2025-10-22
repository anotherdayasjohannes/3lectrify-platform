'use client';

import { useState, useRef, forwardRef } from 'react';
import Image from 'next/image';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getFocalPoint } from '@3lectrify/sanity';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EASINGS } from '@3lectrify/animations';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  // Check for reduced motion preference
  const shouldReduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useGSAP(
    () => {
      const cardElements = cardsRef.current.filter(Boolean);
      
      if (!cardElements.length || shouldReduceMotion) {
        // Graceful degradation: Set final states immediately
        cardElements.forEach((card) => {
          if (card) {
            gsap.set(card, { 
              opacity: 1,
              x: 0,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
            });
          }
        });
        return;
      }

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          pinSpacing: true,
          pinReparent: false, // 🔧 CRITICAL: Prevent DOM reparenting (fixes React conflict)
          scrub: 1.5,
          anticipatePin: 1,
          onRefresh: (self) => {
            // Set pin-spacer background
            const pinSpacer = self.pin?.parentElement;
            if (pinSpacer && pinSpacer.classList.contains('pin-spacer')) {
              pinSpacer.style.backgroundColor = '#293645';
            }
          },
        },
      });

      // Initial state: cards off-screen from right, invisible
      cardElements.forEach((card, index) => {
        gsap.set(card, {
          x: 1000, // Off-screen to the right
          y: -150, // Start higher (creates arc)
          opacity: 0,
          rotateY: -45, // Angled away
          rotateX: 15, // Tilted up
          rotateZ: -10, // Slight tilt
          scale: 0.7, // Smaller start
        });
      });

      // Animate each card flying in, spinning, and landing
      cardElements.forEach((card, index) => {
        if (!card) return;
        
        const startTime = index * 0.5; // Stagger start times
        
        // Find the overlay element inside this card
        const overlay = card.querySelector('[data-bio-overlay]') as HTMLElement;

        // Fly in with arc + multi-axis spin + land
        tl.to(card, {
          x: 0, // Move to final position
          y: 0, // Arc down (creates momentum)
          opacity: 1,
          scale: 1,
          rotateY: 405, // 360° + extra turn (more dramatic!)
          rotateX: 0, // Level out
          rotateZ: 0, // Level out
          duration: 2,
          ease: EASINGS.smooth,
          onUpdate: function() {
            // Show overlay when card is "flipped" (between 90° and 270°)
            const currentRotation = gsap.getProperty(card, 'rotateY') as number;
            
            if (overlay) {
              if (currentRotation > 90 && currentRotation < 270) {
                // Card is showing "back" - reveal overlay
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
              } else {
                // Card is showing "front" - hide overlay
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
              }
            }
          },
          onComplete: function() {
            // Reset overlay to be controlled by hover after animation
            if (overlay) {
              overlay.style.opacity = '';
              overlay.style.visibility = '';
            }
          }
        }, startTime);
      });

      // Add delay at end before unpinning
      tl.to({}, { duration: 1 });

      // Cleanup function
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === sectionRef.current) {
            trigger.kill();
          }
        });
      };
    },
    { scope: sectionRef, dependencies: [teamMembers.length] }
  );

  return (
    <section 
      ref={sectionRef}
      className="bg-[#293645] pt-[100px] px-[50px] pb-[80px] md:pt-[80px] md:px-[40px] md:pb-[60px] sm:pt-[60px] sm:px-[20px] sm:pb-[50px]"
      style={{ minHeight: '100vh' }}
    >
      {/* Content Wrapper - Centered */}
      <div className="flex flex-col items-center">
        {/* Intro Section */}
        {(heading || introText) && (
          <div className="w-full max-w-[1165px] mb-[40px] flex flex-col gap-[25px] sm:mb-[30px] pl-[10px]">
            {heading && (
              <h2 className="text-[36px] leading-[46px] font-light text-white tracking-[0.36px] m-0">
                {heading}
              </h2>
            )}
            {introText && (
              <div className="text-[18px] leading-[26px] font-normal text-white tracking-[0.18px] [&_p]:m-0 max-w-[900px]">
                <PortableText value={introText} />
              </div>
            )}
          </div>
        )}

        {/* Team Grid */}
        <div 
          className="w-full max-w-[1165px] flex flex-wrap gap-[25px] md:gap-[20px] sm:gap-[20px] items-start sm:justify-center"
          style={{ perspective: '1500px' }} // Enable 3D perspective
        >
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={member._id} 
              member={member}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const TeamCard = forwardRef<HTMLElement, { member: TeamMember }>(({ member }, ref) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleMouseEnter = () => setIsOverlayVisible(true);
  const handleMouseLeave = () => setIsOverlayVisible(false);

  return (
    <article 
      ref={ref}
      className="w-[270px] md:w-[calc(50%-10px)] md:max-w-[270px] sm:w-full flex-shrink-0"
      style={{ 
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'visible',
        // 🎨 Add 3D depth/thickness
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4)) drop-shadow(0 0 0 3px rgba(255,255,255,0.05))',
      }}
    >
      <div className="flex flex-col gap-[15px]">
        {/* Photo Wrapper with Overlay */}
        <div
          className="relative w-full h-[400px] rounded-[20px] overflow-hidden bg-white/5 cursor-pointer group"
          style={{
            // 🎨 Add thickness border/edge
            boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)',
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

          {/* Hover Overlay */}
          {member.bio && (
            <div
              data-bio-overlay
              className={`absolute inset-0 bg-[rgba(41,54,69,0.95)] backdrop-blur-[8px] flex items-center justify-center p-[25px] sm:p-[20px] transition-all duration-300 ease-out ${
                isOverlayVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div
                className={`flex flex-col gap-[20px] w-full transition-transform duration-300 ease-out ${
                  isOverlayVisible ? 'translate-y-0' : 'translate-y-5'
                }`}
              >
                {/* Bio Text */}
                <div className="text-[14px] leading-[20px] font-light text-white text-left overflow-y-auto max-h-[280px]">
                  {member.bio}
                </div>

                {/* Social Links */}
                {(member.linkedinUrl || member.email) && (
                  <div className="flex gap-[15px] items-center">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[#88C0B1] hover:text-[#293645] hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#88C0B1] focus-visible:outline-offset-2"
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
                        className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white/10 text-white opacity-80 hover:opacity-100 hover:bg-[#88C0B1] hover:text-[#293645] hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#88C0B1] focus-visible:outline-offset-2"
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

        {/* Info Section */}
        <div className="flex flex-col gap-[5px] text-left">
          <h3 className="text-[18px] leading-[26px] font-normal tracking-[0.18px] text-white m-0">
            {member.name}
          </h3>
          <p className="text-[16px] leading-[26px] font-light tracking-[0.16px] text-white m-0">
            {member.title}
          </p>
        </div>
      </div>
    </article>
  );
});

TeamCard.displayName = 'TeamCard';

