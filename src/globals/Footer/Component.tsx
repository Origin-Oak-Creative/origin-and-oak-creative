import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import React from 'react';

import type { Footer, Logo as LogoType } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Logo } from '@/globals/Logo/Component';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();
  const logoData: LogoType = await getCachedGlobal('logo', 1)();

  const navItems = footerData?.navItems || [];
  const media = logoData && typeof logoData.media === 'object' ? logoData.media : null;
  const logoUrl = media?.sizes?.thumbnail?.url || media?.url;
  const logoHeight = media?.sizes?.thumbnail?.height || media?.height || undefined;
  const logoWidth = media?.sizes?.thumbnail?.width || media?.width || undefined;

  return (
    <footer>
      <div>
        <Link href="/">
          {media && logoUrl && (
            <Logo
              loading="eager"
              priority="high"
              image={logoUrl}
              alt={media.alt}
              height={logoHeight}
              width={logoWidth}
            />
          )}
        </Link>

        <div>
          <nav>
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
