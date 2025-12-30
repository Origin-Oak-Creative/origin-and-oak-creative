import React from 'react';

import type { TeamBlock as TeamBlockProps } from '@/payload-types';

import { getCachedCollection } from '@/utilities/getCollection';
import { TeamCard } from '@/components/TeamCard';
import RichText from '@/components/RichText';

export const TeamBlock: React.FC<TeamBlockProps> = async ({ heading, content }) => {
  const members = await getCachedCollection('team-members')();

  return (
    <div>
      {heading && <RichText data={heading} type="heading" />}
      {content && <RichText data={content} type="content" />}
      {members.map((m) => (
        <TeamCard key={m.id} member={m} />
      ))}
    </div>
  );
};
