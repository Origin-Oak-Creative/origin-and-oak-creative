import type { Block, Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { hasText } from '@payloadcms/richtext-lexical/shared';
import { blockWidthField, blockThemeField } from '@/fields';

const CardGridFields: Field[] = [
  blockWidthField,
  blockThemeField,
  {
    name: 'heading',
    type: 'group',
    fields: [
      {
        name: 'content',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ];
          },
        }),
      },
      {
        name: 'position',
        type: 'radio',
        defaultValue: 'out',
        options: [
          { label: 'Above Grid', value: 'out' },
          { label: 'Inside Grid', value: 'in' },
        ],
        admin: {
          condition: (_, siblingData) => hasText(siblingData.content),
        },
      },
    ],
  },
  {
    name: 'columns',
    label: 'Max no. of columns',
    type: 'number',
    min: 1,
    max: 4,
    defaultValue: 3,
    required: true,
  },
  {
    name: 'cards',
    type: 'array',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'content',
        type: 'richText',
        editor: lexicalEditor({
          features: ({ rootFeatures }) => {
            return [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ];
          },
        }),
        required: true,
      },
    ],
    required: true,
  },
];

export const CardGrid: Block = {
  slug: 'card-grid',
  interfaceName: 'Card Grid Block',
  fields: CardGridFields,
};
