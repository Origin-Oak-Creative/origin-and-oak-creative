import React from 'react';

import { CardGridBlock as CardGridBlockProps } from '@/payload-types';

import { RichTextCard } from '@/components/RichTextCard';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  width,
  theme,
  heading = { content: null, position: 'out' },
  columns,
  cards,
}) => {
  const { content, position } = heading;
  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${width}`}>
        {content && position == 'out' && (
          <div className={styles.headingOut}>
            <RichText data={content} enableGutter={false} type="heading" />
          </div>
        )}
        <div className={`${styles.grid} columns${columns}`}>
          {content && position == 'in' && (
            <div className={styles.headingIn}>
              <RichText data={content} enableGutter={false} type="heading" />
            </div>
          )}
          {cards.map((e, i) => (
            <RichTextCard key={i} theme={theme} data={e.card} />
          ))}
        </div>
      </div>
    </div>
  );
};
