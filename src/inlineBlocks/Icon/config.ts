import type { Block, Field } from 'payload';

import { LucideIconPicker } from 'payload-lucide-picker-next';

export const Icon: Block = {
  slug: 'hero',
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
      options: [
        { label: 'Soft Linen', value: 'soft-linen' },
        { label: 'River Stone', value: 'river-stone' },
        { label: 'Dune Sand', value: 'dune-sand' },
        { label: 'Midnight', value: 'midnight' },
        { label: 'Graphite Smoke', value: 'graphite-smoke' },
        { label: 'Deep Wisdom Olive', value: 'deep-wisdom-olive' },
      ],
    },
  ],
};
