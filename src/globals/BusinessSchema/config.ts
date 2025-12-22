import type { GlobalConfig } from 'payload'

import { revalidateSchema } from './hooks/revalidateSchema'

export const BusinessSchema: GlobalConfig = {
  slug: 'schema',
  admin: {
    group: 'SEO & Settings',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'businessType',
              type: 'select',
              defaultValue: 'ProfessionalService',
              options: ['ProfessionalService', 'LocalBusiness', 'Corporation'],
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Square logo for the business.' },
              required: true,
            },
            { name: 'phone', type: 'text', required: true },
          ],
        },
        {
          label: 'Location',
          fields: [
            { name: 'street', type: 'text', required: true },
            { name: 'city', type: 'text', required: true },
            { name: 'state', type: 'text', required: true },
            { name: 'zip', type: 'text', required: true },
            {
              name: 'geolocation',
              type: 'point',
              label: 'Business Coordinates',
              admin: {
                description: 'Input the exact Longitude and Latitude for Google Maps placement.',
              },
            },
          ],
        },
        {
          label: 'Miscellaneous',
          fields: [
            {
              name: 'priceRange',
              type: 'select',
              options: ['$', '$$', '$$$', '$$$$'],
              defaultValue: '$$',
            },
            {
              name: 'openingHours',
              type: 'array',
              fields: [
                {
                  name: 'days',
                  type: 'text',
                  admin: { placeholder: 'Mo,Tu,We,Th,Fr' },
                  required: true,
                },
                { name: 'opens', type: 'text', admin: { placeholder: '09:00' }, required: true },
                { name: 'closes', type: 'text', admin: { placeholder: '17:00' }, required: true },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              fields: [{ name: 'url', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterChange: [revalidateSchema],
  },
}
