'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { navContainer, navItemReveal, EASE_OUT_FAST } from '../../lib/motionVariants';

interface NavbarSectionProps {
  defaultWhatsApp: string;
  businessName: string;
}

/**
 * Animated navbar:
 * - Page-load stagger: brand → nav links → CTA button
 * - Scroll: height shrinks 82px → 64px + shadow appears
 * - CTA wrapped in MagneticButton for subtle cursor pull
 */
export function NavbarSection({ defaultWhatsApp, businessName }: NavbarSectionProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <m.header
      className="site-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      animate={{
        height: scrolled ? 64 : 82,
        boxShadow: scrolled
          ? '0 2px 24px rgba(0,0,0,0.10)'
          : '0 0 0 rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.35, ease: EASE_OUT_FAST }}
    >
      {/* Brand + nav + CTA stagger in on page load */}
      <m.div
        style={{ display: 'contents' }}
        variants={navContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Brand */}
        <m.a
          className="brand"
          href="#top"
          aria-label={`${businessName} home`}
          variants={navItemReveal}
        >
          <span className="brand-mark">F</span>
          <span>FORGE <b>FITNESS</b></span>
        </m.a>

        {/* Nav links */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: 30 }}>
          {[
            { href: '#programs', label: 'Programs' },
            { href: '#results', label: 'Results' },
            { href: '#pricing', label: 'Membership' },
            { href: '#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <m.a
              key={href}
              href={href}
              variants={navItemReveal}
              style={{ fontSize: 12, fontWeight: 800 }}
              whileHover={{ opacity: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              {label}
            </m.a>
          ))}
        </nav>

        {/* CTA — slightly delayed, gets its own flair */}
        <m.a
          className="button button-small button-dark"
          href={defaultWhatsApp}
          target="_blank"
          rel="noreferrer"
          variants={navItemReveal}
          whileHover={{ y: -2, boxShadow: '0 6px 0 rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE_OUT_FAST }}
        >
          Book a free trial
        </m.a>
      </m.div>
    </m.header>
  );
}
