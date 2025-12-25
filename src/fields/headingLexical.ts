import { Icon } from '@/inlineBlocks/Icon/config';
import {
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  AlignFeature,
  BlocksFeature,
  TextStateFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  type HeadingFeatureProps,
} from '@payloadcms/richtext-lexical';

export const headingLexical = (headingSizes: HeadingFeatureProps['enabledHeadingSizes']) =>
  lexicalEditor({
    features: () => {
      return [
        BoldFeature(),
        ItalicFeature(),
        HeadingFeature({ enabledHeadingSizes: headingSizes }),
        AlignFeature(),
        BlocksFeature({ inlineBlocks: [Icon] }),
        TextStateFeature({
          state: {
            style: {
              'heading-extra-large': {
                label: 'Extra Large Heading',
                css: { 'font-family': 'var(--analogue)', 'font-size': '80px' },
              },
              'heading-large': {
                label: 'Large Heading',
                css: { 'font-family': 'var(--analogue)', 'font-size': '64px' },
              },
              'heading-medium': {
                label: 'Medium Heading',
                css: { 'font-family': 'var(--analogue)', 'font-size': '48px' },
              },
              'heading-small': {
                label: 'Small Heading',
                css: { 'font-family': 'var(--analogue)', 'font-size': '48px' },
              },
              'subheading-large': {
                label: 'Large Subheading',
                css: { 'font-family': 'var(--lato)', 'font-size': '24px' },
              },
              'subheading-regular': {
                label: 'Regular Subheading',
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
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ];
    },
  });
