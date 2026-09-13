'use client';

import { m } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { EASE_PREMIUM, EASE_OUT_FAST } from '../../lib/motionVariants';
import { useInViewOnce } from '../../hooks/useInViewOnce';

interface PricingSectionProps {
  defaultWhatsApp: string;
}

/**
 * Pricing / Membership section with:
 * - Left copy slides in from left
 * - Bullet list items stagger in
 * - Right price card slides in from right
 * - Card hover: y-lift + lime shadow offset grows
 * - CTA inside card: MagneticButton
 */
export function PricingSection({ defaultWhatsApp }: PricingSectionProps) {
  const { ref, isInView } = useInViewOnce();

  const listVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.3 },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: EASE_PREMIUM },
    },
  };

  return (
    <section className="section pricing" id="pricing" ref={ref}>
      {/* Left: copy column */}
      <Reveal direction="left" delay={0}>
        <div className="pricing-copy">
          <p className="eyebrow"><span /> Simple membership</p>
          <h2 aria-label="Invest in the stronger you.">
            <TextReveal text="Invest in the" as="span" mode="words" delay={0.1} />
            <br />
            <em style={{ display: 'block' }}>
              <TextReveal text="stronger you." as="span" mode="words" delay={0.28} />
            </em>
          </h2>
          <p>
            No confusing packages. No hidden fees. Start with a free trial, meet your
            coach, and choose the plan that fits.
          </p>
          <m.ul
            variants={listVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {[
              'Full gym access',
              'Free fitness assessment',
              'Coach-built starter plan',
              'Group class access',
            ].map((item) => (
              <m.li key={item} variants={listItemVariants}>
                <b>✓</b> {item}
              </m.li>
            ))}
          </m.ul>
        </div>
      </Reveal>

      {/* Right: price card */}
      <Reveal direction="right" delay={0.1}>
        <m.div
          className="price-card"
          whileHover={{
            y: -5,
            boxShadow: '26px 26px 0 var(--lime)',
            transition: { duration: 0.25, ease: EASE_OUT_FAST },
          }}
          transition={{ duration: 0.25, ease: EASE_OUT_FAST }}
        >
          <div className="popular">Most popular</div>
          <p>Unlimited membership</p>
          <div className="price">
            <sup>₹</sup>
            <strong>1,499</strong>
            <span>/ month</span>
          </div>
          <small>Example demo price · update for each gym</small>
          <hr />
          <p className="price-note">
            Train any day, any time during open hours.
            Pause or cancel with 30 days notice.
          </p>
          <MagneticButton strength={10} style={{ width: '100%' }}>
            <m.a
              className="button button-dark"
              href={defaultWhatsApp}
              target="_blank"
              rel="noreferrer"
              style={{ width: '100%', marginTop: 15 }}
              whileHover={{ y: -2, boxShadow: '0 6px 0 rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_OUT_FAST }}
            >
              Claim free trial <span>↗</span>
            </m.a>
          </MagneticButton>
          <a className="sub-link" href="#contact">Ask about other plans</a>
        </m.div>
      </Reveal>
    </section>
  );
}
