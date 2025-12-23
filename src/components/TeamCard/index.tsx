import React from 'react';

import type { TeamMember } from '@/payload-types';

import { Media } from '@/components/Media';

export const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const { name, title, headshot } = member;
  return (
    <div>
      <Media resource={headshot} />
      <h3>{name}</h3>
      <span>{title}</span>
    </div>
  );
};
