import type { Block, Field } from 'payload';

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

import { ContentWithMedia } from '../ContentWithMedia/config';
import { Icon } from '@/inlineBlocks/Icon/config';
import { LinkButton } from '@/inlineBlocks/LinkButton/config';

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
      BlocksFeature({ blocks: [ContentWithMedia], inlineBlocks: [Icon, LinkButton] }),
      TextStateFeature({
        state: {
          style: {
            'heading-large': {
              label: 'Large Heading',
              css: { 'font-family': 'var(--analogue)', 'font-size': '100px' },
            },
            'heading-medium': {
              label: 'Medium Heading',
              css: { 'font-family': 'var(--analogue)', 'font-size': '72px' },
            },
            'heading-small': {
              label: 'Small Heading',
              css: { 'font-family': 'var(--analogue)', 'font-size': '64px' },
            },
            'subheading-regular': {
              label: 'Regular Subheading',
              css: { 'font-family': 'var(--lato)', 'font-size': '24px' },
            },
            'subheading-small': {
              label: 'Small Subheading',
              css: { 'font-family': 'var(--lato)', 'font-size': '20px' },
            },
            paragraph: {
              label: 'Paragraph',
              css: { 'font-family': 'var(--lato)', 'font-size': '20px' },
            },
          },
          color: {
            'soft-linen': { label: 'Soft Linen', css: { color: 'var(--soft-linen' } },
            'river-stone': { label: 'River Stone', css: { color: 'var(--river-stone' } },
            'dune-sand': { label: 'Dune Sand', css: { color: 'var(--dune-sand' } },
            midnight: { label: 'Midnight', css: { color: 'var(--midnight' } },
            'graphite-smoke': { label: 'Graphite Smoke', css: { color: 'var(--graphite-smoke' } },
            'deep-wisdom-olive': {
              label: 'Deep Wisdom Olive',
              css: { color: 'var(--deep-wisdom-olive' },
            },
          },
          spacing: {
            condensed: { label: 'Condensed', css: { 'letter-spacing': '-0.02em' } },
            standard: { label: 'Standard', css: { 'letter-spacing': '0' } },
            'semi-spacious': { label: 'Semi Spacious', css: { 'letter-spacing': '0.02em' } },
            spacious: { label: 'Spacious', css: { 'letter-spacing': '0.1em' } },
          },
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
