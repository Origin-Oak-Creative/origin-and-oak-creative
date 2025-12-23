import React from 'react';

import type { TeamBlock as TeamBlockProps } from '@/payload-types';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { TeamCard } from '@/components/TeamCard';

export const TeamBlock: React.FC<TeamBlockProps & { id?: string }> = async ({ id }) => {
  const payload = await getPayload({ config: configPromise });
  const fetchedMembers = await payload.find({ collection: 'team-members', depth: 1 });
  const members = fetchedMembers.docs;

  return (
    <div id={`block-${id}`}>
      {members.map((m) => (
        <TeamCard key={m.id} member={m} />
      ))}
    </div>
  );
};
