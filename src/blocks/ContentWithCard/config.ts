import type { Block, Field } from 'payload';

import {
  blockWidthField,
  blockThemeField,
  headingLexical,
  contentLexical,
  cardField,
} from '@/fields';

const ContentWithCardFields: Field[] = [
  blockWidthField,
  blockThemeField,
  {
    name: 'cardPlacement',
    type: 'radio',
    defaultValue: 'right',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' },
    ],
    required: true,
  },
  {
    name: 'heading',
    type: 'richText',
    editor: headingLexical(['h2', 'h3', 'h4']),
  },
  {
    name: 'content',
    type: 'richText',
    editor: contentLexical(),
    required: true,
  },
  cardField,
];

export const ContentWithCard: Block = {
  slug: 'content-card',
  interfaceName: 'Content With Card Block',
  fields: ContentWithCardFields,
};
