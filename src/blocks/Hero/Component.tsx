import React from 'react';

import type { HeroBlock as HeroBlockProps } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const HeroBlock: React.FC<HeroBlockProps> = ({ image, content }) => {
  return (
    <div className={styles.parent}>
      <div className={styles.content}>
        {content && <RichText data={content} enableGutter={false} />}
      </div>
      <div className={styles.background}>
        {image && typeof image === 'object' && <Media priority resource={image} />}
      </div>
    </div>
  );
};
