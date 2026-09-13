'use client';

import { m } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { EASE_PREMIUM, EASE_OUT_FAST, DURATION_BASE } from '../../lib/motionVariants';

interface Result {
  initials: string;
  name: string;
  result: string;
  time: string;
  quote: string;
}

interface ResultsSectionProps {
  results: Result[];
  defaultWhatsApp: string;
}

/**
 * Results section with:
 * - Word-by-word heading reveal
 * - Staggered card entry from bottom
 * - Result number (metric value) reveals with scaleIn
 * - Hover: CSS border-color handled by existing CSS + Framer y-lift
 */
export function ResultsSection({ results, defaultWhatsApp }: ResultsSectionProps) {
  const { ref, isInView } = useInViewOnce();

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 44 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
    },
  };

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: EASE_PREMIUM },
    },
  };

  return (
    <section className="section results" id="results">
      {/* Section heading */}
      <div className="section-heading light">
        <div>
          <Reveal direction="left" delay={0}>
            <p className="eyebrow"><span /> Member stories</p>
          </Reveal>
          <h2 aria-label="Proof, not promises.">
            <TextReveal text="Proof, not" as="span" mode="words" delay={0.1} />
            <br />
            <em style={{ display: 'block' }}>
              <TextReveal text="promises." as="span" mode="words" delay={0.3} />
            </em>
          </h2>
        </div>
        <Reveal direction="up" delay={0.25}>
          <p>
            Real members. Sustainable progress. The kind of results that happen when
            good coaching meets consistency.
          </p>
        </Reveal>
      </div>

      {/* Result cards */}
      <m.div
        ref={ref}
        className="result-grid"
        variants={gridVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {results.map((item) => (
          <m.article
            key={item.name}
            className="result-card"
            variants={cardVariants}
            whileHover={{
              y: -4,
              transition: { duration: 0.22, ease: EASE_OUT_FAST },
            }}
          >
            <div className="result-person">
              <span>{item.initials}</span>
              <div>
                <strong>{item.name}</strong>
                <small>Verified member</small>
              </div>
            </div>

            {/* Metric value — scale+fade reveal */}
            <m.div className="result-number" variants={metricVariants}>
              {item.result}
            </m.div>

            <p className="result-time">{item.time}</p>
            <blockquote>"{item.quote}"</blockquote>
            <div className="stars">★★★★★</div>
          </m.article>
        ))}
      </m.div>

      {/* CTA */}
      <Reveal direction="up" delay={0.2}>
        <MagneticButton strength={12} style={{ marginTop: 40, display: 'block' }}>
          <m.a
            className="button result-cta"
            href={defaultWhatsApp}
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: 0 }}
            whileHover={{ y: -2, boxShadow: '0 8px 0 rgba(217,255,67,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT_FAST }}
          >
            Start your story <span>↗</span>
          </m.a>
        </MagneticButton>
      </Reveal>
    </section>
  );
}
