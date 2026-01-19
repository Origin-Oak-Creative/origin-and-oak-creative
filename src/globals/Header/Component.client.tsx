'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import type { Header } from '@/payload-types';
import type { Logo as LogoType } from '@/payload-types';

import { Logo } from '@/globals/Logo/Component';
import { HeaderNav } from './Nav';

import styles from './style.module.css';

interface HeaderClientProps {
  data: Header;
  logo: LogoType;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, logo }) => {
  const media = logo && typeof logo.media === 'object' ? logo.media : null;
  const logoUrl = media?.sizes?.thumbnail?.url || media?.url;
  const logoHeight = media?.sizes?.thumbnail?.height || media?.height || undefined;
  const logoWidth = media?.sizes?.thumbnail?.width || media?.width || undefined;

  const elementRef = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.intersectionRatio < 1 means the element is "stuck"
        // because it's no longer fully within the root bounds at the threshold
        setIsStuck(entry.intersectionRatio < 1);
      },
      {
        // rootMargin should match the CSS 'top' value for accurate detection
        rootMargin: `-1px 0px 0px 0px`,
        threshold: [1], // Observe when 100% of the element is visible
      },
    );

    const currentRef = elementRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  });

  return (
    <header className={`${styles.header} ${isStuck ? styles.stuck : ''}`} ref={elementRef}>
      <Link href="/" className={styles.logo}>
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
      <HeaderNav data={data} />
    </header>
  );
};
