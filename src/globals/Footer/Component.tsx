import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import React from 'react';

import type { Footer, Logo as LogoType } from '@/payload-types';

import { Logo } from '../Logo/Component';
import { CMSLink } from '@/components/CMSLink';
import { Form } from '@/components/Form';

import styles from './style.module.css';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();
  const logoData: LogoType = await getCachedGlobal('logo', 1)();

  const form = footerData.form;
  const legalLinks = footerData.legalLinks || [];
  const socials = footerData.socials || [];
  const media = logoData && typeof logoData.media === 'object' ? logoData.media : null;
  const logoUrl = media?.url;
  const logoHeight = media?.height || undefined;
  const logoWidth = media?.width || undefined;

  return (
    <footer className={styles.footer}>
      <div className={styles.primary}>
        <div className={styles.logo}>
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
        </div>
        <div className={styles.inner}>
          <div className={styles.form}>
            <h2>Receive Articles, Tips, and Offers</h2>
            {typeof form === 'object' && <Form form={form} />}
          </div>
          <div className={styles.socials}>
            <h2>Our Socials</h2>
            <ul>
              {socials.map((e, i) => (
                <li key={i}>
                  <CMSLink
                    link={{ type: 'custom', newTab: true, url: e.url }}
                    label={e.label}
                    appearance="plain"
                    colour="dark"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.secondary}>
        <p>
          {`${new Date().getFullYear()} © Origin & Oak New Age Creative`}
          {legalLinks.map((e, i) => (
            <React.Fragment key={i}>
              {' | '}
              <CMSLink link={e.link} label={e.label} appearance="plain" colour="dark" />
            </React.Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
}
