import type { Field } from 'payload';

import { headingLexical } from './headingLexical';
import { contentLexical } from './contentLexical';

export const cardField: Field = {
  name: 'card',
  type: 'group',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      editor: headingLexical(['h3', 'h4', 'h5', 'h6']),
    },
    {
      name: 'content',
      type: 'richText',
      editor: contentLexical(),
      required: true,
    },
  ],
  required: true,
};
