import { Field } from 'payload';

export const linkStyle: Field = {
  type: 'row',
  fields: [
    {
      name: 'appearance',
      type: 'select',
      admin: {
        width: '50%',
      },
      required: true,
      defaultValue: 'plain',
      options: [
        { label: 'Plain', value: 'plain' },
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' },
        { label: 'Circle', value: 'circle' },
      ],
    },
    {
      name: 'direction',
      label: 'Animation Direction',
      type: 'radio',
      admin: {
        layout: 'horizontal',
        width: '50%',
        style: { alignSelf: 'flexEnd' },
        condition: (_, siblingData) => siblingData.appearance === 'circle',
      },
      defaultValue: 'left',
      required: true,
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
};
