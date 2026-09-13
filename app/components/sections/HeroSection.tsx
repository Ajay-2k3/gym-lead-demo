'use client';

import { useCallback } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { EASE_OUT_FAST } from '../../lib/motionVariants';

interface HeroSectionProps {
  defaultWhatsApp: string;
}

/**
 * Hero section with:
 * - Word-by-word masked text reveal on the h1
 * - Staggered reveal for eyebrow, lede, actions, trust row
 * - Right panel slides in from the right
 * - Background "BUILT HERE." text has subtle scroll parallax
 * - Stat card and hours card stagger in
 * - Cursor-based 2D parallax on decorative elements (desktop only)
 */
export function HeroSection({ defaultWhatsApp }: HeroSectionProps) {
  // Cursor-based parallax for the hero visual (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Athlete-word counter-parallax (moves subtly opposite to barbell)
  const athleteX = useMotionValue(0);
  const athleteSpringX = useSpring(athleteX, { stiffness: 25, damping: 18 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = ((e.clientX - cx) / rect.width) * 16;
    const ny = ((e.clientY - cy) / rect.height) * 10;
    mouseX.set(nx);
    mouseY.set(ny);
    // Counter-parallax for the background text
    athleteX.set(-nx * 0.4);
  }, [mouseX, mouseY, athleteX]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    athleteX.set(0);
  }, [mouseX, mouseY, athleteX]);

  return (
    <section className="hero" id="top" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {/* ── Left: Copy ─────────────────────────────────── */}
      <div className="hero-copy">
        {/* Eyebrow slides in from left */}
        <Reveal direction="left" delay={0.05}>
          <p className="eyebrow"><span /> Coaching that gets results</p>
        </Reveal>

        {/* H1 — word-by-word masked reveal */}
        <h1 aria-label="Stronger body. Sharper mind.">
          <TextReveal
            text="Stronger body."
            as="span"
            mode="words"
            delay={0.15}
            stagger={0.09}
          />
          <br />
          <em style={{ display: 'block' }}>
            <TextReveal
              text="Sharper mind."
              as="span"
              mode="words"
              delay={0.38}
              stagger={0.09}
            />
          </em>
        </h1>

        {/* Lede */}
        <Reveal direction="up" delay={0.55}>
          <p className="hero-lede">
            Expert coaching, serious equipment, and a community that keeps you showing up.
            Your first seven days are on us.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal direction="up" delay={0.68}>
          <div className="hero-actions">
            <MagneticButton strength={14}>
              <m.a
                className="button"
                href={defaultWhatsApp}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, boxShadow: '0 8px 0 rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE_OUT_FAST }}
              >
                Start on WhatsApp{' '}
                <m.span
                  whileHover={{ x: 3 }}
                  style={{ display: 'inline-block' }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </m.span>
              </m.a>
            </MagneticButton>
            <a className="text-link" href="#programs">Explore programs <span>↓</span></a>
          </div>
        </Reveal>

        {/* Trust row */}
        <Reveal direction="up" delay={0.82}>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true">
              <span>AK</span><span>RS</span><span>NM</span>
            </div>
            <p><strong>★★★★★ 4.9 / 5</strong><br />from 180+ local members</p>
          </div>
        </Reveal>
      </div>

      {/* ── Right: Visual panel ─────────────────────────── */}
      <Reveal direction="right" delay={0.1} duration={0.9} style={{ minHeight: 620, position: 'relative' }}>
        <div
          className="hero-visual"
          aria-label="Abstract strength training graphic"
          style={{ height: '100%', minHeight: 620 }}
        >
          <div className="visual-grid" />

          {/* Barbell follows cursor on desktop */}
          <m.div
            className="visual-barbell"
            style={{ x: springX, y: springY }}
          >
            <i /><i /><b />
          </m.div>

          {/* Big BG text — subtle counter-parallax (opposite direction to barbell) */}
          <m.div
            className="athlete-word"
            style={{ x: athleteSpringX }}
          >
            BUILT<br />HERE.
          </m.div>

          {/* Stat card — staggered entry */}
          <Reveal direction="up" delay={0.5}>
            <div className="stat-card">
              <strong>12+</strong>
              <span>Certified<br />coaches</span>
            </div>
          </Reveal>

          {/* Hours card */}
          <Reveal direction="left" delay={0.65}>
            <div className="hours-card">
              <span>OPEN TODAY</span>
              <strong>5:00 AM — 11:00 PM</strong>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
