import type { Block } from 'payload';

import { blockWidthField, headingLexical, contentLexical } from '@/fields';

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    blockWidthField,
    {
      name: 'theme',
      type: 'select',
      defaultValue: 'softLinen',
      options: [
        { label: 'Soft Linen', value: 'softLinen' },
        { label: 'River Stone', value: 'riverStone' },
      ],
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'heading',
      type: 'richText',
      editor: headingLexical(['h2', 'h3', 'h4']),
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: contentLexical(),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
};
