'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface HeaderProps {
  logo?: {
    url: string;
    alt: string;
  };
  navigation: NavigationItem[];
}

export function Header({ logo, navigation }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(scrollPercentage);
      setScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#d04227] to-[#88c0b1] z-[1001] transition-all duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`sticky top-0 z-[1000] bg-[#3c5067] transition-all duration-300 ${scrolled ? 'h-[60px] shadow-[0_4px_20px_rgba(0,0,0,0.15)]' : 'h-20 shadow-md'}`}>
        <nav className="flex h-full items-center justify-between px-[50px] py-2.5 max-w-[1440px] mx-auto md:px-10 sm:px-6">
          {/* Logo */}
          <Link href="/" className={`relative flex-shrink-0 transition-all duration-300 ${scrolled ? 'w-[130px] h-8' : 'w-[162px] h-10'}`}>
            {logo ? (
              <Image
                src={logo.url}
                alt={logo.alt || '3lectrify'}
                width={scrolled ? 130 : 162}
                height={scrolled ? 32 : 40}
                className="object-contain transition-all duration-300"
                priority
              />
            ) : (
              <Image
                src="/logo.svg"
                alt="3lectrify"
                width={scrolled ? 130 : 162}
                height={scrolled ? 32 : 40}
                className="object-contain transition-all duration-300"
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:inline-flex items-start gap-[30px] pt-1">
            {navigation.map((item, index) => (
              <li key={index}>
                {isActive(item.href) ? (
                  <div className="inline-flex flex-col items-start gap-0.5">
                    <span className="font-normal text-[#88c0b1] text-nav tracking-[0.18px] whitespace-nowrap">
                      {item.label}
                    </span>
                    <div className="w-full h-0.5 bg-[#88c0b1]" />
                  </div>
                ) : item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-normal text-white text-nav tracking-[0.18px] whitespace-nowrap hover:text-[#88c0b1] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="font-normal text-white text-nav tracking-[0.18px] whitespace-nowrap hover:text-[#88c0b1] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#3c5067] border-t border-[#5f8299]">
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navigation.map((item, index) => (
                <li key={index}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block font-normal text-nav tracking-[0.18px] py-2 ${
                        isActive(item.href)
                          ? 'text-[#88c0b1] border-b-2 border-[#88c0b1]'
                          : 'text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block font-normal text-nav tracking-[0.18px] py-2 ${
                        isActive(item.href)
                          ? 'text-[#88c0b1] border-b-2 border-[#88c0b1]'
                          : 'text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
