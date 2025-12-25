import type { Config } from 'src/payload-types';

import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';

type Collection = keyof Config['collections'];

async function getCollection<T extends Collection>(collection: T, depth = 1) {
  const payload = await getPayload({ config: configPromise });

  const coll = await payload.find({
    collection,
    depth,
  });

  return coll.docs;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedCollection = <T extends Collection>(collection: T) => {
  return unstable_cache(async () => getCollection(collection), [collection], {
    tags: [collection],
  });
};
