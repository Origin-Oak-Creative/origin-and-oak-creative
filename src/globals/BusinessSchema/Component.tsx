import Script from 'next/script';

import { getCachedGlobal } from '@/utilities/getGlobals';
import { getServerSideURL } from '@/utilities/getURL';

import type { Schema, Logo } from '@/payload-types';

export async function BusinessSchema({ strategy }: { strategy: 'beforeInteractive' }) {
  const schemaData: Schema = await getCachedGlobal('schema', 1)();
  const logoData: Logo = await getCachedGlobal('logo', 1)();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaData.businessType,
    '@id': getServerSideURL(),
    name: schemaData.name,
    image:
      schemaData.image && typeof schemaData.image == 'object'
        ? schemaData.image.url
        : typeof logoData.media === 'object' && logoData.media.url,
    logo: typeof schemaData.logo === 'object' && schemaData.logo.url,
    url: getServerSideURL(),
    telephone: schemaData.phone,
    priceRange: schemaData.priceRange || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: schemaData.street,
      addressLocality: schemaData.city,
      addressRegion: schemaData.state,
      postalCode: schemaData.zip,
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: schemaData.geolocation && schemaData.geolocation[1],
      longitude: schemaData.geolocation && schemaData.geolocation[0],
    },
    openingHoursSpecification: schemaData.openingHours
      ? schemaData.openingHours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days.split(',').map((s) => s.trim()),
          opens: h.opens,
          closes: h.closes,
        }))
      : undefined,
    sameAs: schemaData.socials && schemaData.socials.map((s) => s.url),
  };

  return (
    <Script
      id="business-schema"
      type="application/ld+json"
      strategy={strategy}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
