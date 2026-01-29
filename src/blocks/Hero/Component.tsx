import React from 'react';

import type { HeroBlock as HeroBlockProps } from '@/payload-types';

import { BlockBackground } from '@/components/BlockBackground';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const HeroBlock: React.FC<HeroBlockProps> = ({ theme, backgroundImage, content }) => {
  return (
    <BlockBackground theme={theme} {...backgroundImage}>
      <div className={`${styles.content} ${theme}`}>
        <RichText data={content} type="hero" />
      </div>
    </BlockBackground>
  );
};
