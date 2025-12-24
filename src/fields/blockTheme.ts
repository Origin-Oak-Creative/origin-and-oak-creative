import type { Field } from 'payload';

export type ThemeField = 'softLinen' | 'riverStone' | 'midnight';

export const blockThemeField: Field = {
  name: 'theme',
  type: 'select',
  defaultValue: 'softLinen',
  options: [
    { label: 'Soft Linen', value: 'softLinen' },
    { label: 'River Stone', value: 'riverStone' },
    { label: 'Midnight', value: 'midnight' },
  ],
  required: true,
};
