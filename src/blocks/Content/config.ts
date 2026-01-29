import type { Block, Field } from 'payload';

import { blockWidthField, blockThemeField, headingLexical, contentLexical } from '@/fields';
import { blockImageField } from '@/fields/blockImage';

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'content',
    type: 'richText',
    editor: contentLexical(),
    label: false,
  },
];

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    blockWidthField,
    blockThemeField,
    blockImageField,
    {
      name: 'heading',
      type: 'richText',
      editor: headingLexical(['h2', 'h3', 'h4']),
    },
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
};
