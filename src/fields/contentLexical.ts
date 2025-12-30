import {
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  AlignFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  TextStateFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import type { StateValues } from 'node_modules/@payloadcms/richtext-lexical/dist/features/textState/feature.server';

import { getTextStateConfig } from './textStateConfig';
import { MediaBlock } from '@/blocks/MediaBlock/config';
import { Icon } from '@/inlineBlocks/Icon/config';
import { LinkButton } from '@/inlineBlocks/LinkButton/config';

export const contentLexical = () =>
  lexicalEditor({
    features: () => {
      return [
        BoldFeature(),
        ItalicFeature(),
        ParagraphFeature(),
        AlignFeature(),
        IndentFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        HorizontalRuleFeature(),
        BlocksFeature({ blocks: [MediaBlock], inlineBlocks: [Icon, LinkButton] }),
        TextStateFeature({
          state: {
            ...(getTextStateConfig('content') as { [stateKey: string]: StateValues }),
          },
        }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ];
    },
  });
