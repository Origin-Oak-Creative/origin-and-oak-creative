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
import type { StateValues } from 'node_modules/@payloadcms/richtext-lexical/dist/features/textState/feature.server';

import { getTextStateConfig } from './textStateConfig';

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
            ...(getTextStateConfig('heading') as { [stateKey: string]: StateValues }),
          },
        }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ];
    },
  });
