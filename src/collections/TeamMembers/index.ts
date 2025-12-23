import type { CollectionConfig } from 'payload';

import { authenticated, authenticatedOrPublished } from '@/access';

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['headshot', 'name', 'title'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
