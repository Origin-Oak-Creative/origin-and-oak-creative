import type { Block, Field } from 'payload';

import { blockWidthField, blockThemeField, headingLexical, contentLexical } from '@/fields';

const ContentWithMediaFields: Field[] = [
  blockWidthField,
  blockThemeField,
  {
    name: 'textDirection',
    type: 'radio',
    defaultValue: 'right',
    options: [
      { label: 'Text Left', value: 'left' },
      { label: 'Text Right', value: 'right' },
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
  {
    name: 'image',
    type: 'group',
    fields: [
      { name: 'media', type: 'upload', relationTo: 'media', required: true },
      {
        name: 'style',
        type: 'select',
        defaultValue: 'floating',
        options: [
          { label: 'floating', value: 'Floating' },
          { label: 'Full Height', value: 'fullHeight' },
        ],
        required: true,
      },
    ],
  },
];

export const ContentWithMedia: Block = {
  slug: 'content-media',
  interfaceName: 'Content With Media Block',
  fields: ContentWithMediaFields,
};
