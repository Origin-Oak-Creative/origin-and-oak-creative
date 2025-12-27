import type { Block, Field } from 'payload';

import { LucideIconPicker } from 'payload-lucide-picker-next';

export const Icon: Block = {
  slug: 'icon',
  interfaceName: 'Icon Inline Block',
  fields: [
    LucideIconPicker({
      name: 'icon',
      required: true,
    }) as unknown as Field,
    {
      name: 'color',
      label: 'Color Override',
      type: 'select',
      defaultValue: '#5e614c',
      required: true,
      options: [
        { label: 'Soft Linen', value: '#f2eee6' },
        { label: 'River Stone', value: '#d0c4b5' },
        { label: 'Dune Sand', value: '#e8d7c5' },
        { label: 'Midnight', value: '#2b3744' },
        { label: 'Graphite Smoke', value: '#3c3c3c' },
        { label: 'Deep Wisdom Olive', value: '#5e614c' },
      ],
    },
    {
      name: 'size',
      type: 'number',
      defaultValue: 24,
      required: true,
      admin: {
        step: 12,
      },
      min: 24,
      max: 72,
    },
  ],
};
