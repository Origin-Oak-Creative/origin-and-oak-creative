import React from 'react';

import type { TeamBlock as TeamBlockProps } from '@/payload-types';

import { getCachedCollection } from '@/utilities/getCollection';
import { TeamCard } from '@/components/TeamCard';
import RichText from '@/components/RichText';
import { BlockBackground } from '@/components/BlockBackground';

import styles from './style.module.css';

export const TeamBlock: React.FC<TeamBlockProps> = async ({
  theme,
  width,
  columns,
  heading,
  content,
  backgroundImage = { image: null, opacity: 0 },
  cardBackgroundImage = { image: null, opacity: 0 },
}) => {
  const members = await getCachedCollection('team-members')();

  return (
    <BlockBackground theme={theme} {...backgroundImage}>
      <div className={`${styles.wrapper} ${width} ${theme}`}>
        {heading && (
          <div className={styles.heading}>
            <RichText data={heading} type="heading" />
          </div>
        )}
        {content && (
          <div className={styles.content}>
            <RichText data={content} type="content" />
          </div>
        )}
        <div className={styles.grid} style={{ '--max-columns': columns }}>
          {members.map((m) => (
            <TeamCard
              key={m.id}
              member={m}
              theme={theme}
              cardBackgroundImage={cardBackgroundImage}
            />
          ))}
        </div>
      </div>
    </BlockBackground>
  );
};
