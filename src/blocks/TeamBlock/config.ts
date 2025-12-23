import type { Block } from 'payload';

export const Team: Block = {
  slug: 'team',
  interfaceName: 'Team Block',
  fields: [
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
  ],
};
