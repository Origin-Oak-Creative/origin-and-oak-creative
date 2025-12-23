import type { Metadata } from 'next';

import React from 'react';

import { AdminBar } from '@/components/AdminBar';
import { Footer } from '@/globals/Footer/Component';
import { Header } from '@/globals/Header/Component';
import { BusinessSchema } from '@/globals/BusinessSchema/Component';
import { Providers } from '@/providers';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { draftMode } from 'next/headers';

import './globals.css';
import { getServerSideURL } from '@/utilities/getURL';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <BusinessSchema />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
