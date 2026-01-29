import { Field } from 'payload';

export const linkField: Field = {
  name: 'link',
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            width: '50%',
          },
          defaultValue: 'reference',
          required: true,
          options: [
            {
              label: 'Internal link',
              value: 'reference',
            },
            {
              label: 'PDF document',
              value: 'pdf',
            },
            {
              label: 'Custom URL',
              value: 'custom',
            },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: {
            style: {
              alignSelf: 'flex-end',
            },
            width: '50%',
          },
          label: 'Open in new tab',
        },
      ],
    },
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Page to link to',
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
    {
      name: 'pdf',
      type: 'upload',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'pdf',
      },
      label: 'PDF to link to',
      relationTo: 'pdf-documents',
      required: true,
    },
  ],
};
