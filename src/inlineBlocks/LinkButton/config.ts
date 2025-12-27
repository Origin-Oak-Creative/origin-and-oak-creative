import type { Block, Field } from 'payload';

import {
  BoldFeature,
  ItalicFeature,
  BlocksFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { Icon } from '../Icon/config';

import { link } from '@/fields';
import { linkStyle } from '@/fields';

const LinkButtonFields: Field[] = [
  link,
  {
    name: 'display',
    type: 'group',
    fields: [
      linkStyle,
      {
        name: 'label',
        type: 'richText',
        required: true,
        editor: lexicalEditor({
          features: [
            BoldFeature(),
            ItalicFeature(),
            BlocksFeature({ inlineBlocks: [Icon] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ],
        }),
      },
    ],
  },
];

export const LinkButton: Block = {
  slug: 'linkButton',
  interfaceName: 'Link Button Inline Block',
  fields: LinkButtonFields,
};
