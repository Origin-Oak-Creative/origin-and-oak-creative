import React from 'react';

import { CardGridBlock as CardGridBlockProps } from '@/payload-types';

import { RichTextCard } from '@/components/RichTextCard';
import RichText from '@/components/RichText';
import { BlockBackground } from '@/components/BlockBackground';

import styles from './style.module.css';

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  width,
  theme,
  heading = { content: null, position: 'out' },
  columns,
  cards,
  backgroundImage = { image: null, opacity: 0 },
  cardBackgroundImage = { image: null, opacity: 0 },
}) => {
  const { content, position } = heading;

  return (
    <BlockBackground theme={theme} {...backgroundImage}>
      <div className={`${styles.wrapper} ${width} ${theme}`}>
        {content && position == 'out' && (
          <div className={styles.headingOut}>
            <RichText data={content} enableGutter={false} type="heading" />
          </div>
        )}
        <div className={styles.grid} style={{ '--max-columns': columns }}>
          {content && position == 'in' && (
            <div className={styles.headingIn}>
              <RichText data={content} enableGutter={false} type="heading" />
            </div>
          )}
          {cards.map((e, i) => (
            <RichTextCard
              key={i}
              theme={theme}
              data={e.card}
              cardBackgroundImage={cardBackgroundImage}
            />
          ))}
        </div>
      </div>
    </BlockBackground>
  );
};
