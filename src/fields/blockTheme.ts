import type { Field } from 'payload';

export const blockThemeField: Field = {
  name: 'theme',
  type: 'select',
  defaultValue: 'softLinen',
  options: [
    { label: 'SoftLinen', value: 'softLinen' },
    { label: 'River Stone', value: 'riverStone' },
    { label: 'Midnight', value: 'midnight' },
  ],
  required: true,
};
