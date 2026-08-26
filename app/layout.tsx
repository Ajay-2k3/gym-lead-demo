import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: 'Forge Fitness | Stronger Starts Here',
  description: 'Personal training, strength, functional fitness and transformation coaching at Forge Fitness. Book a free trial session today.',
  openGraph: {
    title: 'Stronger Starts Here | Forge Fitness',
    description: 'Claim a free 7-day trial at Forge Fitness. Expert coaching, serious equipment, and a community built for results.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Stronger Starts Here — Forge Fitness' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stronger Starts Here | Forge Fitness',
    description: 'Claim a free 7-day trial at Forge Fitness.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
