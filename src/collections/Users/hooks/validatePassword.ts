import type { CollectionBeforeValidateHook } from 'payload';

import { ValidationError } from 'payload';

import type { User } from '@/payload-types';

export const validatePassword: CollectionBeforeValidateHook<User> = async ({ operation, data }) => {
  if (operation === 'update' && data?.password) {
    if (data.password.length < 8) {
      throw new ValidationError({
        collection: 'users',
        errors: [{ message: 'Password must be at least 8 characters long.', path: 'password' }],
      });
    }

    const hasCaps = /[A-Z]/.test(data.password);
    if (!hasCaps) {
      throw new ValidationError({
        collection: 'users',
        errors: [{ message: 'Password must be at least one capital letter.', path: 'password' }],
      });
    }

    const hasLower = /[a-z]/.test(data.password);
    if (!hasLower) {
      throw new ValidationError({
        collection: 'users',
        errors: [{ message: 'Password must be at least one lowercase letter.', path: 'password' }],
      });
    }

    const hasNumbers = /[0-9]/.test(data.password);
    if (!hasNumbers) {
      throw new ValidationError({
        collection: 'users',
        errors: [{ message: 'Password must be at least one number.', path: 'password' }],
      });
    }

    const hasSymbols = /[$-/\:[\]{}~!#%&*'";,><?+=\\|]/.test(data.password);
    if (!hasSymbols) {
      throw new ValidationError({
        collection: 'users',
        errors: [{ message: 'Password must be at least one symbol.', path: 'password' }],
      });
    }
  }

  return data;
};
