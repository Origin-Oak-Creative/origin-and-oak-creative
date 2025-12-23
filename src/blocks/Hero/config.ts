import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const HeroFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'content',
    type: 'richText',
    required: true,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
  },
]

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'Hero Block',
  fields: HeroFields,
}
