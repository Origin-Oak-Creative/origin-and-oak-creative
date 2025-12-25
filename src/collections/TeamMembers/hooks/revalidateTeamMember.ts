import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import { revalidateTag } from 'next/cache';

import type { TeamMember } from '@/payload-types';

export const revalidatePost: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating old team members`);

    revalidateTag('team-members');
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<TeamMember> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('team-members');
  }

  return doc;
};
