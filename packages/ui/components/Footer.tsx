'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterProps {
  headline?: string;
  newsletter?: {
    enabled: boolean;
    label: string;
    placeholder: string;
    buttonText: string;
  };
  footerNavigation: NavigationItem[];
  legalLinks: NavigationItem[];
  copyrightText?: string;
}

const newsletterSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function Footer({
  headline = 'Ihr strategischer Partner für profitable All-Electric Buildings.',
  newsletter = {
    enabled: true,
    label: 'Bleiben Sie auf dem Laufenden über Innovationen und Projekte:',
    placeholder: 'Ihre Mailadresse',
    buttonText: 'Newsletter abonnieren',
  },
  footerNavigation,
  legalLinks,
  copyrightText = '© 2025 3lectrify – Alle Rechte vorbehalten.',
}: FooterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual newsletter API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', data.email);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Gradient Spacer - Transition from page to footer */}
      <div 
        className="w-full h-5"
        style={{
          background: 'linear-gradient(0deg, rgba(28,36,46,1) 0%, rgba(41,54,69,1) 100%)'
        }}
      />

      <footer className="pt-[30px] pb-[50px] bg-[#293645]">
        <div className="content-wrapper">
        <div className="flex items-start justify-between gap-[100px] w-full xl:gap-[50px]">
          {/* Left Column: Headline & Newsletter */}
          <div className="flex flex-col items-start justify-between flex-1 max-w-[700px] gap-10">
            <h2 className="font-light text-white text-[32px] tracking-[0.36px] leading-[40px] lg:text-[36px] lg:leading-[48px]">
              {headline}
            </h2>

            {newsletter.enabled && (
              <div className="flex flex-col items-start justify-center gap-2.5 w-full">
                <p className="font-normal text-white text-[16px] tracking-[0.16px] leading-[26px]">
                  {newsletter.label}
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex w-full max-w-[543px] items-center gap-2.5 flex-wrap"
                >
                  <div className="flex-1 min-w-[200px]">
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={newsletter.placeholder}
                      className="w-full h-9 px-[15px] py-0 rounded-[5px] border border-solid border-[#c5e0d7] bg-transparent font-normal text-[#c5e0d7] text-[16px] tracking-[0.16px] leading-[26px] placeholder:text-[#c5e0d7] focus:outline-none focus:border-[#88c0b1] transition-colors"
                      aria-label="E-Mail-Adresse für Newsletter"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-[#d04227] text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitSuccess}
                    className="h-9 pl-[15px] pr-2.5 py-0 inline-flex items-center justify-center gap-2.5 bg-[#c5e0d7] rounded-[5px] cursor-pointer hover:bg-[#88c0b1] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Newsletter abonnieren"
                  >
                    <span className="font-bold text-[#333333] text-[16px] tracking-[0.16px] leading-[26px] whitespace-nowrap">
                      {submitSuccess ? '✓ Angemeldet' : newsletter.buttonText}
                    </span>
                    {!submitSuccess && (
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <g clipPath="url(#clip0_433_45)">
                          <path d="M7.5 10L3.75 13.75L7.5 17.5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15 2.5V13.75H3.75" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_433_45">
                            <rect width="20" height="20" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Navigation */}
          <nav
            className="flex flex-col items-start gap-[15px] flex-shrink-0"
            aria-label="Footer Navigation"
          >
            {footerNavigation.map((link, index) => (
              link.isExternal ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-white text-[18px] tracking-[0.18px] leading-6 whitespace-nowrap hover:text-[#c5e0d7] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  className="font-normal text-white text-[18px] tracking-[0.18px] leading-6 whitespace-nowrap hover:text-[#c5e0d7] transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Bottom Section: Social + Legal Links & Copyright */}
        <div className="flex items-start justify-between w-full border-t border-[#c2c2c2] mt-10 pt-5">
          {/* Left: LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/company/3lectrify/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-80 transition-opacity"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" 
                fill="#c5e0d7"
              />
            </svg>
          </a>

          {/* Right: Legal Links + Copyright */}
          <div className="flex items-center gap-[15px] flex-wrap">
            {legalLinks.map((link, index) => (
              <span key={index} className="flex items-center gap-[15px]">
                {link.isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-[#c2c2c2] text-[14px] tracking-[0.14px] leading-[22px] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    href={link.href} 
                    className="font-normal text-[#c2c2c2] text-[14px] tracking-[0.14px] leading-[22px] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
                {index < legalLinks.length - 1 && (
                  <span className="text-[#c2c2c2]">•</span>
                )}
              </span>
            ))}
            {legalLinks.length > 0 && <span className="text-[#c2c2c2]">•</span>}
            <span className="font-normal text-[#c2c2c2] text-[14px] tracking-[0.14px] leading-[22px]">
              {copyrightText}
            </span>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}

