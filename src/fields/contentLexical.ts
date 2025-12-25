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

import { MediaBlock } from '@/blocks/MediaBlock/config';
import { Icon } from '@/inlineBlocks/Icon/config';

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
        BlocksFeature({ blocks: [MediaBlock], inlineBlocks: [Icon] }),
        TextStateFeature({
          state: {
            size: {
              large: {
                label: 'Large',
                css: { 'font-size': '20px' },
              },
              medium: {
                label: 'Medium',
                css: { 'font-size': '18px' },
              },
              small: {
                label: 'Medium Heading',
                css: { 'font-size': '16px' },
              },
            },
            spacing: {
              condensed: { label: 'Condensed', css: { 'letter-spacing': '-0.02em' } },
              standard: { label: 'Standard', css: { 'letter-spacing': '0' } },
              spacious: { label: 'Spacious', css: { 'letter-spacing': '0.02em' } },
            },
          },
        }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ];
    },
  });
