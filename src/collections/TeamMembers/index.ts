import type { CollectionConfig } from 'payload';

import { authenticated, authenticatedOrPublished } from '@/access';
import { revalidateDelete, revalidateTeamMember } from './hooks/revalidateTeamMember';
import { contentLexical } from '@/fields';

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
    {
      name: 'biography',
      type: 'richText',
      editor: contentLexical(),
      required: true,
    },
  ],

  hooks: {
    afterChange: [revalidateTeamMember],
    afterDelete: [revalidateDelete],
  },
};
