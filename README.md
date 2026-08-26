# Forge Fitness — lead-generation website demo

A polished, mobile-first gym landing page built to help sell a **website + WhatsApp enquiry** service to local fitness businesses. The demo is intentionally one-page, quick to personalize, and deployable without a paid backend.

## What is included

- Conversion-focused hero with a clear free-trial offer
- Persistent WhatsApp calls to action on desktop and mobile
- Programs, proof metrics, member testimonials, and membership teaser
- Lead form for name, phone, goal, preferred time, and message
- Working local demo submission using browser storage
- Optional JSON endpoint for Google Sheets, email, CRM, or automation tools
- Responsive design, keyboard-friendly form controls, metadata, favicon, and social preview image

## Setup and run

Requirements: Node.js 22.13 or newer.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production check:

```bash
npm run build
npm run start
```

## Five-minute customization checklist

The main content lives in `app/page.tsx`; the design lives in `app/globals.css`.

1. Update the `BUSINESS` object at the top of `app/page.tsx`: business name, city, displayed phone, address, and map link.
2. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` using digits only, including the country code.
3. Replace the programs, testimonials, proof numbers, pricing, opening hours, and offer with verified information from the gym.
4. Change the three brand colors at the top of `app/globals.css`: `--ink`, `--lime`, and `--paper`.
5. Replace `public/og.png` and `public/favicon.svg` with the prospect's branded assets.

Do not present the demo testimonials, rating, prices, address, or results as real. They are sales-demo placeholders and must be replaced with approved client information before publishing for a real gym.

## How the form works now

When submitted with no endpoint configured, the form:

1. validates required fields in the browser;
2. stores the enquiry in this browser under `forge-fitness-demo-leads`;
3. shows a success screen; and
4. creates a prefilled WhatsApp follow-up containing the lead details.

To inspect local demo leads, open the browser's developer tools and run:

```js
JSON.parse(localStorage.getItem('forge-fitness-demo-leads') || '[]')
```

Local storage is only for the sales demo. It does not send the lead to the gym, sync across devices, or survive a visitor clearing browser data.

## Connect Google Sheets later

The cleanest free prototype is a Google Apps Script web app attached to a Sheet.

1. Create a Google Sheet with columns matching `name`, `phone`, `goal`, `preferredTime`, `message`, `createdAt`, and `source`.
2. In **Extensions → Apps Script**, add a `doPost(e)` handler that parses `e.postData.contents` and appends a row.
3. Deploy the script as a web app and allow the required access.
4. Put its deployed URL in `.env.local`:

```env
NEXT_PUBLIC_LEAD_ENDPOINT=https://script.google.com/macros/s/REPLACE_ME/exec
```

The form already sends JSON with every field. Confirm the Apps Script response supports requests from the deployed website, then test with a throwaway lead before using it for a client.

## Connect email or CRM later

`NEXT_PUBLIC_LEAD_ENDPOINT` can point to any service that accepts a JSON `POST`, including a serverless function, Formspree, Make, Zapier, n8n, or a custom API. Map the payload fields to an email, CRM record, or notification workflow.

Do not put private API keys in any `NEXT_PUBLIC_` variable; browser visitors can read them. Keep secrets in the receiving server/function or the automation provider.

## WhatsApp options

- **Current demo:** click-to-chat links use `wa.me` and need only the gym's public WhatsApp number.
- **Form follow-up:** after submitting, the visitor can send their details using a prefilled WhatsApp message.
- **Automated WhatsApp messages:** require the WhatsApp Business Platform or an approved provider, server-side credentials, templates, opt-in, and compliance with WhatsApp policies. This is a separate integration, not included in the free local demo.

## Deployment

### OpenAI Sites

The project includes `.openai/hosting.json` and is ready for Sites publishing from Codex.

### Vercel or Cloudflare

Import the repository, keep the standard build command (`npm run build`), and add the three values from `.env.example` in the host's environment settings. Set `NEXT_PUBLIC_SITE_URL` to the exact public HTTPS origin before the final build.

## Sales-demo flow

On a prospect call, replace the gym name, number, colors, offer, and location before sharing. Show the mobile view first, tap the WhatsApp button, submit the lead form, and then explain that the endpoint can route the same lead to Sheets, email, or a CRM.

## Quality checks before client delivery

- Test every WhatsApp link with the client's real number.
- Submit the form on mobile and desktop.
- Confirm the selected lead endpoint actually receives every field.
- Replace all sample claims with client-approved facts.
- Verify address, opening hours, plan price, offer expiry, and map link.
- Set the final `NEXT_PUBLIC_SITE_URL` and check the social preview.
