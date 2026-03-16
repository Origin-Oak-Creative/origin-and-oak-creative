import type { CollectionConfig } from 'payload';

import { authenticated, authenticatedOrPublished } from '@/access';
import { revalidateDelete, revalidateTeamMember } from './hooks/revalidateTestimonial';
import { contentLexical } from '@/fields';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
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
      name: 'business',
      type: 'text',
    },
    {
      name: 'testimonial',
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
