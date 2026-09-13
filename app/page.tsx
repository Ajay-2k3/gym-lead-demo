'use client';

import { FormEvent, useMemo, useState } from 'react';
import { MotionConfigProvider } from './components/motion/MotionConfig';
import { NavbarSection } from './components/sections/NavbarSection';
import { HeroSection } from './components/sections/HeroSection';
import { ProgramsSection } from './components/sections/ProgramsSection';
import { StatsSection } from './components/sections/StatsSection';
import { ResultsSection } from './components/sections/ResultsSection';
import { PricingSection } from './components/sections/PricingSection';
import { LeadSection } from './components/sections/LeadSection';

// ─── Business constants ───────────────────────────────────────────────────────

const BUSINESS = {
  name: 'Forge Fitness',
  shortName: 'Forge',
  city: 'Your City',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919876543210',
  phoneDisplay: '+91 98765 43210',
  address: '24, Main Road · Your City',
  mapsUrl: 'https://maps.google.com',
};

const PROGRAMS = [
  {
    number: '01',
    tag: 'Build strength',
    title: 'Strength & Conditioning',
    text: 'Progressive coaching, compound lifts, and structured programming that makes every session count.',
    className: 'program-card program-dark',
  },
  {
    number: '02',
    tag: 'Move better',
    title: 'Functional Fitness',
    text: 'High-energy small-group training for stamina, mobility, speed, and real-world athleticism.',
    className: 'program-card program-lime',
  },
  {
    number: '03',
    tag: 'Built for you',
    title: 'Personal Training',
    text: 'One-to-one coaching, nutrition guidance, and accountability shaped around your exact goal.',
    className: 'program-card program-paper',
  },
];

const RESULTS = [
  {
    initials: 'AK',
    name: 'Arun K.',
    result: '−12 kg',
    time: 'in 16 weeks',
    quote: 'I stopped guessing. The plan was clear, the coaches kept me honest, and the results followed.',
  },
  {
    initials: 'SP',
    name: 'Sneha P.',
    result: '+40%',
    time: 'stronger',
    quote: 'The trainers actually watch your form. I feel stronger and more confident than I have in years.',
  },
  {
    initials: 'RM',
    name: 'Rahul M.',
    result: '−9 cm',
    time: 'at the waist',
    quote: 'The 6 AM crew became my routine. I have more energy at work and finally enjoy training.',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeWhatsAppUrl(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

const DEFAULT_WHATSAPP = makeWhatsAppUrl(
  `Hi ${BUSINESS.name}, I want to book my free 7-day trial.`,
);

// ─── Page shell ──────────────────────────────────────────────────────────────

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [whatsAppFollowUp, setWhatsAppFollowUp] = useState(DEFAULT_WHATSAPP);
  const year = useMemo(() => new Date().getFullYear(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const lead = { ...data, createdAt: new Date().toISOString(), source: 'forge-fitness-demo' };

    // Demo mode: store leads on this browser, free and with no backend.
    const saved = JSON.parse(localStorage.getItem('forge-fitness-demo-leads') ?? '[]');
    localStorage.setItem('forge-fitness-demo-leads', JSON.stringify([...saved, lead]));

    // Production placeholder: set NEXT_PUBLIC_LEAD_ENDPOINT to a Google Apps Script,
    // Formspree, Make, Zapier, or your own endpoint. See README.md.
    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
      } catch {
        // The lead remains safe in local demo storage if the optional endpoint fails.
      }
    }

    const name = String(data.name ?? '');
    setLeadName(name);
    setWhatsAppFollowUp(
      makeWhatsAppUrl(
        `Hi ${BUSINESS.name}, I just requested a free trial.\n\nName: ${name}\nPhone: ${String(data.phone ?? '')}\nGoal: ${String(data.goal ?? '')}\nPreferred time: ${String(data.preferredTime ?? '')}`,
      ),
    );
    setSubmitted(true);
    form.reset();
  }

  return (
    <MotionConfigProvider>
      <main>
        {/* Announcement strip */}
        <div className="top-strip">
          <p><span>●</span> New member offer: train free for 7 days</p>
          <p className="desktop-only">No joining fee · Limited trial slots this week</p>
        </div>

        {/* Sticky animated navbar */}
        <NavbarSection
          defaultWhatsApp={DEFAULT_WHATSAPP}
          businessName={BUSINESS.name}
        />

        {/* Hero */}
        <HeroSection defaultWhatsApp={DEFAULT_WHATSAPP} />

        {/* Ticker marquee */}
        <section className="ticker" aria-label="Gym features">
          <div>
            STRENGTH <span>✦</span> CONDITIONING <span>✦</span> MOBILITY{' '}
            <span>✦</span> PERSONAL TRAINING <span>✦</span> REAL RESULTS{' '}
            <span>✦</span>
          </div>
        </section>

        {/* Programs */}
        <ProgramsSection programs={PROGRAMS} />

        {/* Animated stats band */}
        <StatsSection />

        {/* Results / testimonials */}
        <ResultsSection results={RESULTS} defaultWhatsApp={DEFAULT_WHATSAPP} />

        {/* Pricing / membership */}
        <PricingSection defaultWhatsApp={DEFAULT_WHATSAPP} />

        {/* Free trial lead form */}
        <LeadSection
          defaultWhatsApp={DEFAULT_WHATSAPP}
          whatsAppFollowUp={whatsAppFollowUp}
          submitted={submitted}
          leadName={leadName}
          phoneDisplay={BUSINESS.phoneDisplay}
          address={BUSINESS.address}
          mapsUrl={BUSINESS.mapsUrl}
          onSubmit={handleSubmit}
          onReset={() => setSubmitted(false)}
        />

        {/* Footer */}
        <footer>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark">F</span>
            <span>FORGE <b>FITNESS</b></span>
          </a>
          <p>Stronger starts here.</p>
          <div>
            <a href="#programs">Programs</a>
            <a href="#results">Results</a>
            <a href="#pricing">Membership</a>
          </div>
          <small>© {year} {BUSINESS.name}. Demo website for sales presentation.</small>
        </footer>

        {/* Floating WhatsApp CTA (desktop) */}
        <a
          className="floating-whatsapp"
          href={DEFAULT_WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Forge Fitness on WhatsApp"
        >
          <span>WA</span><b>Chat now</b>
        </a>

        {/* Fixed bottom CTA (mobile) */}
        <div className="mobile-cta">
          <a href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">
            Book free trial on WhatsApp <span>↗</span>
          </a>
        </div>
      </main>
    </MotionConfigProvider>
  );
}
