import type { CollectionConfig } from 'payload';

import { authenticated } from '../../access/authenticated';
import { managePasswordReset } from './hooks/managePasswordReset';
import { validatePassword } from './hooks/validatePassword';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'needsPasswordReset',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        condition: () => false,
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeValidate: [validatePassword],
    beforeChange: [managePasswordReset],
  },
};
