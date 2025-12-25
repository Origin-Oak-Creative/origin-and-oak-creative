import type { Block, Field } from 'payload';

import { headingLexical, contentLexical } from '@/fields';

const TeamFields: Field[] = [
  { name: 'heading', type: 'richText', editor: headingLexical(['h2', 'h3', 'h4']) },
  { name: 'content', type: 'richText', editor: contentLexical() },
  {
    name: 'relationTo',
    type: 'select',
    defaultValue: 'team-members',
    label: 'Collections To Show',
    required: true,
    options: [
      {
        label: 'Team Members',
        value: 'team-members',
      },
    ],
  },
];

export const Team: Block = {
  slug: 'team',
  interfaceName: 'Team Block',
  fields: TeamFields,
};
