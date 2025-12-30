import type { Block, Field } from 'payload';

import { Icon } from '../Icon/config';
import { linkField } from '@/fields/link';
import { linkStyle } from '@/fields/linkStyle';

const LinkButtonFields: Field[] = [
  linkField,
  {
    name: 'display',
    type: 'group',
    fields: [
      linkStyle,
      {
        type: 'row',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'colour',
            label: 'Colour Scheme',
            type: 'radio',
            required: true,
            defaultValue: 'light',
            options: [
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'icon',
            type: 'blocks',
            blocks: [Icon],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'placement',
            label: 'Icon Placement',
            type: 'radio',
            defaultValue: 'left',
            options: [
              { label: 'Before text', value: 'left' },
              { label: 'After text', value: 'right' },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
  },
];

export const LinkButton: Block = {
  slug: 'linkButton',
  interfaceName: 'Link Button Inline Block',
  fields: LinkButtonFields,
};
