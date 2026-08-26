'use client';

import { FormEvent, useMemo, useState } from 'react';

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
  { number: '01', tag: 'Build strength', title: 'Strength & Conditioning', text: 'Progressive coaching, compound lifts, and structured programming that makes every session count.', className: 'program-card program-dark' },
  { number: '02', tag: 'Move better', title: 'Functional Fitness', text: 'High-energy small-group training for stamina, mobility, speed, and real-world athleticism.', className: 'program-card program-lime' },
  { number: '03', tag: 'Built for you', title: 'Personal Training', text: 'One-to-one coaching, nutrition guidance, and accountability shaped around your exact goal.', className: 'program-card program-paper' },
];

const RESULTS = [
  { initials: 'AK', name: 'Arun K.', result: '−12 kg', time: 'in 16 weeks', quote: 'I stopped guessing. The plan was clear, the coaches kept me honest, and the results followed.' },
  { initials: 'SP', name: 'Sneha P.', result: '+40%', time: 'stronger', quote: 'The trainers actually watch your form. I feel stronger and more confident than I have in years.' },
  { initials: 'RM', name: 'Rahul M.', result: '−9 cm', time: 'at the waist', quote: 'The 6 AM crew became my routine. I have more energy at work and finally enjoy training.' },
];

function makeWhatsAppUrl(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

const DEFAULT_WHATSAPP = makeWhatsAppUrl(`Hi ${BUSINESS.name}, I want to book my free 7-day trial.`);

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
    setWhatsAppFollowUp(makeWhatsAppUrl(`Hi ${BUSINESS.name}, I just requested a free trial.\n\nName: ${name}\nPhone: ${String(data.phone ?? '')}\nGoal: ${String(data.goal ?? '')}\nPreferred time: ${String(data.preferredTime ?? '')}`));
    setSubmitted(true);
    form.reset();
  }

  return (
    <main>
      <div className="top-strip"><p><span>●</span> New member offer: train free for 7 days</p><p className="desktop-only">No joining fee · Limited trial slots this week</p></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${BUSINESS.name} home`}>
          <span className="brand-mark">F</span><span>FORGE <b>FITNESS</b></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#programs">Programs</a><a href="#results">Results</a><a href="#pricing">Membership</a><a href="#contact">Contact</a>
        </nav>
        <a className="button button-small button-dark" href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">Book a free trial</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Coaching that gets results</p>
          <h1>Stronger body.<br /><em>Sharper mind.</em></h1>
          <p className="hero-lede">Expert coaching, serious equipment, and a community that keeps you showing up. Your first seven days are on us.</p>
          <div className="hero-actions">
            <a className="button" href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">Start on WhatsApp <span>↗</span></a>
            <a className="text-link" href="#programs">Explore programs <span>↓</span></a>
          </div>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true"><span>AK</span><span>RS</span><span>NM</span></div>
            <p><strong>★★★★★ 4.9 / 5</strong><br />from 180+ local members</p>
          </div>
        </div>
        <div className="hero-visual" aria-label="Abstract strength training graphic">
          <div className="visual-grid" /><div className="visual-barbell"><i /><i /><b /></div>
          <div className="athlete-word">BUILT<br />HERE.</div>
          <div className="stat-card"><strong>12+</strong><span>Certified<br />coaches</span></div>
          <div className="hours-card"><span>OPEN TODAY</span><strong>5:00 AM — 11:00 PM</strong></div>
        </div>
      </section>

      <section className="ticker" aria-label="Gym features"><div>STRENGTH <span>✦</span> CONDITIONING <span>✦</span> MOBILITY <span>✦</span> PERSONAL TRAINING <span>✦</span> REAL RESULTS <span>✦</span></div></section>

      <section className="section programs" id="programs">
        <div className="section-heading"><div><p className="eyebrow"><span /> Find your training</p><h2>One gym.<br /><em>Every goal.</em></h2></div><p>Whether you are starting from zero or chasing your next personal best, there is a coach and a plan ready for you.</p></div>
        <div className="program-grid">
          {PROGRAMS.map((program) => <article className={program.className} key={program.number}><div className="program-top"><span>{program.number}</span><span className="program-tag">{program.tag}</span></div><div className="program-icon" aria-hidden="true">{program.number === '01' ? '╬' : program.number === '02' ? '↗' : '◎'}</div><h3>{program.title}</h3><p>{program.text}</p><a href="#contact" aria-label={`Enquire about ${program.title}`}>Ask about this program <span>→</span></a></article>)}
        </div>
      </section>

      <section className="proof-band"><div><strong>180+</strong><span>active members</span></div><div><strong>4.9</strong><span>average rating</span></div><div><strong>12+</strong><span>expert coaches</span></div><div><strong>6 yrs</strong><span>transforming lives</span></div></section>

      <section className="section results" id="results">
        <div className="section-heading light"><div><p className="eyebrow"><span /> Member stories</p><h2>Proof, not<br /><em>promises.</em></h2></div><p>Real members. Sustainable progress. The kind of results that happen when good coaching meets consistency.</p></div>
        <div className="result-grid">
          {RESULTS.map((item) => <article className="result-card" key={item.name}><div className="result-person"><span>{item.initials}</span><div><strong>{item.name}</strong><small>Verified member</small></div></div><div className="result-number">{item.result}</div><p className="result-time">{item.time}</p><blockquote>“{item.quote}”</blockquote><div className="stars">★★★★★</div></article>)}
        </div>
        <a className="button result-cta" href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">Start your story <span>↗</span></a>
      </section>

      <section className="section pricing" id="pricing">
        <div className="pricing-copy"><p className="eyebrow"><span /> Simple membership</p><h2>Invest in the<br /><em>stronger you.</em></h2><p>No confusing packages. No hidden fees. Start with a free trial, meet your coach, and choose the plan that fits.</p><ul><li><b>✓</b> Full gym access</li><li><b>✓</b> Free fitness assessment</li><li><b>✓</b> Coach-built starter plan</li><li><b>✓</b> Group class access</li></ul></div>
        <div className="price-card"><div className="popular">Most popular</div><p>Unlimited membership</p><div className="price"><sup>₹</sup><strong>1,499</strong><span>/ month</span></div><small>Example demo price · update for each gym</small><hr /><p className="price-note">Train any day, any time during open hours. Pause or cancel with 30 days notice.</p><a className="button button-dark" href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">Claim free trial <span>↗</span></a><a className="sub-link" href="#contact">Ask about other plans</a></div>
      </section>

      <section className="lead-section" id="contact">
        <div className="lead-intro"><p className="eyebrow"><span /> Your first step</p><h2>Try us free.<br /><em>No pressure.</em></h2><p>Tell us your goal. A Forge coach will contact you to arrange your free trial and quick fitness assessment.</p><div className="contact-line"><span>WHATSAPP / CALL</span><a href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">{BUSINESS.phoneDisplay} ↗</a></div><div className="contact-line"><span>VISIT US</span><a href={BUSINESS.mapsUrl} target="_blank" rel="noreferrer">{BUSINESS.address} ↗</a></div></div>
        <div className="form-shell">
          {submitted ? (
            <div className="success" role="status"><span className="success-mark">✓</span><p className="eyebrow">Request saved</p><h3>You&apos;re in, {leadName || 'future member'}.</h3><p>Your demo enquiry was saved on this device. Continue on WhatsApp for the fastest response.</p><a className="button" href={whatsAppFollowUp} target="_blank" rel="noreferrer">Send details on WhatsApp <span>↗</span></a><button type="button" onClick={() => setSubmitted(false)}>Submit another enquiry</button></div>
          ) : (
            <form onSubmit={handleSubmit}><div className="form-heading"><span>FREE 7-DAY TRIAL</span><strong>Request a callback</strong></div><div className="form-grid"><label><span>Your name *</span><input name="name" autoComplete="name" required placeholder="e.g. Ajay" /></label><label><span>Phone / WhatsApp *</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" minLength={8} required placeholder="+91 98765 43210" /></label><label><span>Primary fitness goal *</span><select name="goal" required defaultValue=""><option value="" disabled>Select your goal</option><option>Lose weight</option><option>Build muscle</option><option>Improve fitness</option><option>Personal training</option><option>Not sure yet</option></select></label><label><span>Preferred time *</span><select name="preferredTime" required defaultValue=""><option value="" disabled>Choose a time</option><option>Early morning (5–8 AM)</option><option>Morning (8–11 AM)</option><option>Evening (4–7 PM)</option><option>Night (7–10 PM)</option></select></label><label className="full-field"><span>Anything we should know?</span><textarea name="message" rows={3} placeholder="Tell us about your goal, injuries, or questions…" /></label></div><button className="button submit-button" type="submit">Book my free trial <span>→</span></button><p className="form-note">No spam. No payment required. We&apos;ll only contact you about your trial.</p></form>
          )}
        </div>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">F</span><span>FORGE <b>FITNESS</b></span></a><p>Stronger starts here.</p><div><a href="#programs">Programs</a><a href="#results">Results</a><a href="#pricing">Membership</a></div><small>© {year} {BUSINESS.name}. Demo website for sales presentation.</small></footer>

      <a className="floating-whatsapp" href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer" aria-label="Chat with Forge Fitness on WhatsApp"><span>WA</span><b>Chat now</b></a>
      <div className="mobile-cta"><a href={DEFAULT_WHATSAPP} target="_blank" rel="noreferrer">Book free trial on WhatsApp <span>↗</span></a></div>
    </main>
  );
}
