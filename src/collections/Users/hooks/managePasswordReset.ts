import type { CollectionBeforeChangeHook } from 'payload';
import type { User } from '@/payload-types';

export const managePasswordReset: CollectionBeforeChangeHook<User> = ({ operation, data }) => {
  if (operation == 'create') {
    return {
      ...data,
      needsPasswordReset: true,
    };
  }

  if (operation === 'update' && data.password) {
    return {
      ...data,
      needsPasswordReset: false,
    };
  }

  return data;
};
