import type { GlobalConfig } from 'payload';

import { linkField } from '@/fields';
import { revalidateFooter } from './hooks/revalidateFooter';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'socials',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ]
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [linkField, { name: 'label', type: 'text', required: true }],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
