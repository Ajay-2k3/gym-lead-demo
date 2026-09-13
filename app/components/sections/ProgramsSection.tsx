'use client';

import { m } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import {
  EASE_OUT_FAST,
  EASE_PREMIUM,
  iconHover,
  iconRest,
  arrowHover,
  arrowRest,
  DURATION_BASE,
} from '../../lib/motionVariants';
import { useInViewOnce } from '../../hooks/useInViewOnce';

interface Program {
  number: string;
  tag: string;
  title: string;
  text: string;
  className: string;
}

interface ProgramsSectionProps {
  programs: Program[];
}

/** Direction each card enters from — visual variety without chaos */
const CARD_DIRECTIONS: ('left' | 'up' | 'right')[] = ['left', 'up', 'right'];

/**
 * Programs section with:
 * - Line-by-line heading reveal
 * - Each card enters from a different direction with staggered delays
 * - Premium hover: lift, scale, icon rotate, arrow translate
 */
export function ProgramsSection({ programs }: ProgramsSectionProps) {
  const { ref, isInView } = useInViewOnce();

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="section programs" id="programs">
      {/* Section heading */}
      <div className="section-heading">
        <div>
          <Reveal direction="left" delay={0}>
            <p className="eyebrow"><span /> Find your training</p>
          </Reveal>
          <h2 aria-label="One gym. Every goal.">
            <TextReveal text="One gym." as="span" mode="words" delay={0.1} />
            <br />
            <em style={{ display: 'block' }}>
              <TextReveal text="Every goal." as="span" mode="words" delay={0.28} />
            </em>
          </h2>
        </div>
        <Reveal direction="up" delay={0.2}>
          <p>
            Whether you are starting from zero or chasing your next personal best,
            there is a coach and a plan ready for you.
          </p>
        </Reveal>
      </div>

      {/* Program cards grid */}
      <m.div
        ref={ref}
        className="program-grid"
        variants={cardContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {programs.map((program, i) => {
          const dir = CARD_DIRECTIONS[i] ?? 'up';
          const hiddenState = {
            opacity: 0,
            x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0,
            y: dir === 'up' ? 40 : 0,
          };

          return (
            <m.article
              key={program.number}
              className={program.className}
              variants={{
                hidden: hiddenState,
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: DURATION_BASE, ease: EASE_PREMIUM },
                },
              }}
              whileHover={{
                y: -6,
                scale: 1.004,
                transition: { duration: 0.25, ease: EASE_OUT_FAST },
              }}
              style={{ cursor: 'default' }}
            >
              <div className="program-top">
                <span>{program.number}</span>
                <span className="program-tag">{program.tag}</span>
              </div>

              {/* Icon rotates on hover */}
              <m.div
                className="program-icon"
                aria-hidden="true"
                whileHover={iconHover}
                animate={iconRest}
              >
                {program.number === '01' ? '╬' : program.number === '02' ? '↗' : '◎'}
              </m.div>

              <h3>{program.title}</h3>
              <p>{program.text}</p>

              {/* Arrow translates on hover */}
              <m.a
                href="#contact"
                aria-label={`Enquire about ${program.title}`}
                whileHover="hover"
                initial="rest"
              >
                Ask about this program{' '}
                <m.span
                  variants={{ rest: arrowRest, hover: arrowHover }}
                  style={{ display: 'inline-block' }}
                >
                  →
                </m.span>
              </m.a>
            </m.article>
          );
        })}
      </m.div>
    </section>
  );
}
