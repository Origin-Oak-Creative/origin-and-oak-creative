import React from 'react';

import type { TeamBlock as TeamBlockProps } from '@/payload-types';

import { getCachedCollection } from '@/utilities/getCollection';
import { TeamCard } from '@/components/TeamCard';
import RichText from '@/components/RichText';

import styles from './style.module.css';

export const TeamBlock: React.FC<TeamBlockProps> = async ({
  theme,
  width,
  columns,
  heading,
  content,
}) => {
  const members = await getCachedCollection('team-members')();

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={`${styles.wrapper} ${width}`}>
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
        <div className={`${styles.grid} columns${columns}`}>
          {members.map((m) => (
            <TeamCard key={m.id} member={m} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
};
