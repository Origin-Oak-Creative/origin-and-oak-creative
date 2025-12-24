import type { Block, Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { blockWidthField, blockThemeField } from '@/fields';

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
  {
    name: 'card',
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
];

export const ContentWithCard: Block = {
  slug: 'content-card',
  interfaceName: 'Content With Card Block',
  fields: ContentWithCardFields,
};
