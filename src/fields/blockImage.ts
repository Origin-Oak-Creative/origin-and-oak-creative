import type { Field } from 'payload';

export const blockImageField: Field = {
  name: 'backgroundImage',
  label: 'Background Image',
  type: 'group',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'opacity',
      label: 'Opacity (Percentage)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 30,
      admin: {
        width: '50%',
      },
    },
  ],
};
