import type { GlobalConfig } from 'payload';

import { revalidateLogo } from './hooks/revalidateLogo';

export const Logo: GlobalConfig = {
  slug: 'logo',
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],

  hooks: {
    afterChange: [revalidateLogo],
  },
};
