import type { Block, Field } from 'payload';
import type { StateValues } from 'node_modules/@payloadcms/richtext-lexical/dist/features/textState/feature.server';

import {
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  AlignFeature,
  TextStateFeature,
  IndentFeature,
  ParagraphFeature,
  BlocksFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { LinkGroup } from '../LinkGroup/config';
import { Icon } from '@/inlineBlocks/Icon/config';
import { LinkButton } from '@/inlineBlocks/LinkButton/config';
import { getTextStateConfig } from '@/fields/textStateConfig';

const heroLexical = lexicalEditor({
  features: () => {
    return [
      BoldFeature(),
      ItalicFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
      AlignFeature(),
      IndentFeature(),
      ParagraphFeature(),
      HorizontalRuleFeature(),
      BlocksFeature({ blocks: [LinkGroup], inlineBlocks: [Icon, LinkButton] }),
      TextStateFeature({
        state: {
          ...(getTextStateConfig('hero') as { [stateKey: string]: StateValues }),
        },
      }),
      InlineToolbarFeature(),
      FixedToolbarFeature(),
    ];
  },
});

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
    editor: heroLexical,
  },
];

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'Hero Block',
  fields: HeroFields,
};
