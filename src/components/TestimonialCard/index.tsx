import React from 'react';

import type { Testimonial } from '@/payload-types';
import type { CardImageProps } from '@/fields/cardImage';

import RichText from '../RichText';
import { CardBackground } from '../CardBackground';

import styles from './style.module.css';

export const TestimonialCard: React.FC<{
  testimonialObj: Testimonial;
  theme: 'softLinen' | 'riverStone' | 'midnight';
  cardBackgroundImage?: CardImageProps;
  index: number;
}> = ({ testimonialObj, theme, cardBackgroundImage, index }) => {
  const { name, business, testimonial } = testimonialObj;
  return (
    <CardBackground theme={theme} {...cardBackgroundImage} index={index}>
      <div className={`${styles.card} ${theme}`}>
        <h3>{name}</h3>
        {business && <p className={styles.subtitle}>{business}</p>}
        <RichText data={testimonial} />
      </div>
    </CardBackground>
  );
};
