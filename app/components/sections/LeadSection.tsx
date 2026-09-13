'use client';

import { FormEvent } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { EASE_PREMIUM, EASE_OUT_FAST, DURATION_BASE, successReveal } from '../../lib/motionVariants';
import { useInViewOnce } from '../../hooks/useInViewOnce';

interface LeadSectionProps {
  defaultWhatsApp: string;
  whatsAppFollowUp: string;
  submitted: boolean;
  leadName: string;
  phoneDisplay: string;
  address: string;
  mapsUrl: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onReset: () => void;
}

const FORM_FIELDS = [
  { name: 'name',          type: 'text',  label: 'Your name *',             autoComplete: 'name',  required: true, placeholder: 'e.g. Ajay', inputMode: undefined },
  { name: 'phone',         type: 'tel',   label: 'Phone / WhatsApp *',      autoComplete: 'tel',   required: true, placeholder: '+91 98765 43210', inputMode: 'tel' as const },
] as const;

/**
 * Lead / Free trial section with:
 * - Left panel reveals from left, right form panel reveals from right
 * - Form heading staggers in
 * - Form fields stagger in with short delay
 * - AnimatePresence handles form ↔ success state transition
 * - Submit CTA: MagneticButton
 */
export function LeadSection({
  defaultWhatsApp,
  whatsAppFollowUp,
  submitted,
  leadName,
  phoneDisplay,
  address,
  mapsUrl,
  onSubmit,
  onReset,
}: LeadSectionProps) {
  const { ref: formRef, isInView } = useInViewOnce();

  const fieldContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.07, delayChildren: 0.35 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_PREMIUM },
    },
  };

  return (
    <section className="lead-section" id="contact">
      {/* ── Left: Intro panel ──────────────────────────── */}
      <Reveal direction="left" delay={0}>
        <div className="lead-intro">
          <p className="eyebrow"><span /> Your first step</p>
          <h2 aria-label="Try us free. No pressure.">
            <TextReveal text="Try us free." as="span" mode="words" delay={0.1} />
            <br />
            <em style={{ display: 'block' }}>
              <TextReveal text="No pressure." as="span" mode="words" delay={0.28} />
            </em>
          </h2>
          <p>
            Tell us your goal. A Forge coach will contact you to arrange your free
            trial and quick fitness assessment.
          </p>
          <div className="contact-line">
            <span>WHATSAPP / CALL</span>
            <a href={defaultWhatsApp} target="_blank" rel="noreferrer">
              {phoneDisplay} ↗
            </a>
          </div>
          <div className="contact-line">
            <span>VISIT US</span>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              {address} ↗
            </a>
          </div>
        </div>
      </Reveal>

      {/* ── Right: Form panel ──────────────────────────── */}
      <Reveal direction="right" delay={0.05}>
        <div className="form-shell" ref={formRef}>
          <AnimatePresence mode="wait">
            {submitted ? (
              /* Success state */
              <m.div
                key="success"
                className="success"
                role="status"
                variants={successReveal}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <span className="success-mark">✓</span>
                <p className="eyebrow">Request saved</p>
                <h3>You&apos;re in, {leadName || 'future member'}.</h3>
                <p>
                  Your demo enquiry was saved on this device. Continue on WhatsApp
                  for the fastest response.
                </p>
                <MagneticButton strength={10}>
                  <a className="button" href={whatsAppFollowUp} target="_blank" rel="noreferrer">
                    Send details on WhatsApp <span>↗</span>
                  </a>
                </MagneticButton>
                <button type="button" onClick={onReset}>Submit another enquiry</button>
              </m.div>
            ) : (
              /* Form */
              <m.form
                key="form"
                onSubmit={onSubmit}
                variants={successReveal}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <m.div
                  className="form-heading"
                  variants={fieldContainerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <m.span variants={fieldVariants}>FREE 7-DAY TRIAL</m.span>
                  <m.strong variants={fieldVariants}>Request a callback</m.strong>
                </m.div>

                <m.div
                  className="form-grid"
                  variants={fieldContainerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  {/* Name */}
                  <m.label variants={fieldVariants}>
                    <span>Your name *</span>
                    <input name="name" autoComplete="name" required placeholder="e.g. Ajay" />
                  </m.label>

                  {/* Phone */}
                  <m.label variants={fieldVariants}>
                    <span>Phone / WhatsApp *</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      minLength={8}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </m.label>

                  {/* Goal */}
                  <m.label variants={fieldVariants}>
                    <span>Primary fitness goal *</span>
                    <select name="goal" required defaultValue="">
                      <option value="" disabled>Select your goal</option>
                      <option>Lose weight</option>
                      <option>Build muscle</option>
                      <option>Improve fitness</option>
                      <option>Personal training</option>
                      <option>Not sure yet</option>
                    </select>
                  </m.label>

                  {/* Time */}
                  <m.label variants={fieldVariants}>
                    <span>Preferred time *</span>
                    <select name="preferredTime" required defaultValue="">
                      <option value="" disabled>Choose a time</option>
                      <option>Early morning (5–8 AM)</option>
                      <option>Morning (8–11 AM)</option>
                      <option>Evening (4–7 PM)</option>
                      <option>Night (7–10 PM)</option>
                    </select>
                  </m.label>

                  {/* Message */}
                  <m.label className="full-field" variants={fieldVariants}>
                    <span>Anything we should know?</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us about your goal, injuries, or questions…"
                    />
                  </m.label>
                </m.div>

                <m.div variants={fieldVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                  <MagneticButton strength={12} style={{ width: '100%' }}>
                    <m.button
                      className="button submit-button"
                      type="submit"
                      style={{ width: '100%', marginTop: 25 }}
                      whileHover={{ y: -2, boxShadow: '0 8px 0 rgba(217,255,67,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: EASE_OUT_FAST }}
                    >
                      Book my free trial <span>→</span>
                    </m.button>
                  </MagneticButton>
                  <p className="form-note">
                    No spam. No payment required. We&apos;ll only contact you about your trial.
                  </p>
                </m.div>
              </m.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
