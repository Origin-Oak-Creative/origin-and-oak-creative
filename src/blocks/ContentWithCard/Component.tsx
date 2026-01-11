import React from 'react';

import { ContentWithCardBlock as ContentWithCardBlockProps } from '@/payload-types';

import { RichTextCard } from '@/components/RichTextCard';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const ContentWithCardBlock: React.FC<ContentWithCardBlockProps> = ({
  width,
  cardPlacement,
  theme,
  heading,
  content,
  card,
}) => {
  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${width}`}>
        {heading && (
          <div className={styles.heading}>
            <RichText data={heading} enableGutter={false} type="heading" />
          </div>
        )}
        <div className={`${styles.content} ${cardPlacement}`}>
          <RichText data={content} />
        </div>{' '}
        <div className={`${styles.card} ${cardPlacement}`}>
          <RichTextCard theme={theme} data={card} />
        </div>
      </div>
    </div>
  );
};
