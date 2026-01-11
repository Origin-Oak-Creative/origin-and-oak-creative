import React from 'react';

import type { TeamMember } from '@/payload-types';

import { Media } from '@/components/Media';

import styles from './style.module.css';

export const TeamCard: React.FC<{
  member: TeamMember;
  theme: 'softLinen' | 'riverStone' | 'midnight';
}> = ({ member, theme }) => {
  const { name, title, headshot } = member;
  return (
    <div className={`${styles.card} ${theme}`}>
      <div className={styles.image}>
        <Media resource={headshot} />
      </div>
      <h3>{name}</h3>
      <span>{title}</span>
    </div>
  );
};
