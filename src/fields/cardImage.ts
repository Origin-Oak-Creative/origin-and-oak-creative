import type { Field } from 'payload';

import type { Media } from '@/payload-types';

export const cardImageField: Field = {
  name: 'cardBackgroundImage',
  label: 'Background Image (Card)',
  type: 'group',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'opacity',
      label: 'Opacity (Percentage)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 30,
      admin: {
        width: '50%',
      },
    },
  ],
};

export type CardImageProps = {
  image?: (number | null) | Media;
  opacity?: number | null;
} | null;
