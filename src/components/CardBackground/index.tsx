'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';

import type { Media as MediaType } from '@/payload-types';

import { Media } from '../Media';

import styles from './style.module.css';

interface CardBackgroundProps {
  theme: 'softLinen' | 'riverStone' | 'midnight';
  image?: number | MediaType | null;
  opacity?: number | null;
  children: React.ReactNode;
}

export const CardBackground: React.FC<CardBackgroundProps> = ({
  theme,
  image,
  opacity,
  children,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`${styles.wrapper} ${inView ? styles.visible : ''}`}>
      <div className={styles.parent}>
        <div className={styles.content}>{children}</div>
        <div
          className={`${styles.background} ${theme}`}
          style={{ '--opacity': `${opacity ? opacity : 30}%` }}
        >
          {image && typeof image === 'object' && <Media priority resource={image} />}
        </div>
      </div>
    </div>
  );
};
