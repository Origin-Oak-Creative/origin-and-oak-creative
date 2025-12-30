import type { GlobalConfig } from 'payload';

import { revalidateHeader } from './hooks/revalidateHeader';
import { linkField, linkStyle } from '@/fields';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [linkField, linkStyle, { name: 'label', type: 'text', required: true }],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
