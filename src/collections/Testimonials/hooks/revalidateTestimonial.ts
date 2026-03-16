import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import { revalidateTag } from 'next/cache';

import type { Testimonial } from '@/payload-types';

export const revalidateTeamMember: CollectionAfterChangeHook<Testimonial> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating old testimonials`);

    revalidateTag('testimonials');
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Testimonial> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('testimonials');
  }

  return doc;
};
