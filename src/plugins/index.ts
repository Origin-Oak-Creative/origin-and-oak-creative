import { formBuilderPlugin, fields as formFields } from '@payloadcms/plugin-form-builder';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { Block, BlocksField, Plugin, Field } from 'payload';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import MailerLite from '@mailerlite/mailerlite-nodejs';

import type { Page } from '@/payload-types';

import { getServerSideURL } from '@/utilities/getURL';
import { contentLexical } from '@/fields';
import { automationDispatcher } from '@/blocks/Form/hooks/automationDispatch';

const mailerlite = new MailerLite({ api_key: process.env.MAILERLITE_API_KEY || '' });

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Origin & Oak New Age Creative`
    : 'Origin & Oak New Age Creative';
};

const textField =
  typeof formFields.text === 'function' ? formFields.text() : (formFields.text as Block);
const textAreaField =
  typeof formFields.textarea === 'function'
    ? formFields.textarea()
    : (formFields.textarea as Block);
const selectField =
  typeof formFields.select === 'function' ? formFields.select() : (formFields.select as Block);
const radioField =
  typeof formFields.radio === 'function' ? formFields.radio() : (formFields.radio as Block);
const emailField =
  typeof formFields.email === 'function' ? formFields.email() : (formFields.email as Block);
const numberField =
  typeof formFields.number === 'function' ? formFields.number() : (formFields.number as Block);
const checkboxField =
  typeof formFields.checkbox === 'function'
    ? formFields.checkbox()
    : (formFields.checkbox as Block);

const automationField = (exitable = false): Field => {
  if (exitable)
    return {
      type: 'collapsible',
      label: 'Advanced Automations & Logic',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'earlyExitValue',
          type: 'text',
          label: 'Early Exit Value',
          admin: {
            description: 'If the user inputs this exact value, the form will submit early.',
          },
        },
        {
          name: 'conditionalRedirect',
          label: 'Conditional Redirect',
          type: 'group',
          fields: [
            {
              name: 'redirect',
              label: 'Redirect',
              type: 'text',
              admin: {
                components: {
                  Field: '@/components/RedirectSelector#RedirectSelector', // Path to your file
                },
                description:
                  'Choose from the "Conditional Redirects" defined at the bottom of the form.',
              },
            },
            {
              name: 'value',
              label: 'When Value Matches',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.redirect !== 'None',
              },
            },
          ],
        },
        {
          name: 'mailerLiteKey',
          type: 'select',
          label: 'MailerLite Property Name',
          admin: {
            description:
              'The exact name of the field to fill in MailerLite. Only used in MailerLite automation.',
          },
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Email', value: 'email' },
            { label: 'Name', value: 'name' },
            { label: 'Last Name', value: 'lastName' },
            { label: 'Company', value: 'company' },
            { label: 'Country', value: 'country' },
            { label: 'City', value: 'city' },
            { label: 'Phone', value: 'phone' },
            { label: 'State', value: 'state' },
            { label: 'Zip', value: 'zip' },
          ],
        },
        {
          name: 'dubsadoKey',
          type: 'text',
          label: 'Dubsado Attribute Key',
          admin: {
            description:
              'The internal mapping key for Dubsado leads. Only used for general inquiry automation.',
          },
        },
      ],
    };

  return {
    type: 'collapsible',
    label: 'Automations & Advanced Logic',
    admin: { initCollapsed: true },
    fields: [
      {
        name: 'mailerLiteKey',
        type: 'select',
        label: 'MailerLite Property Name',
        admin: {
          description:
            'The exact name of the field to fill in MailerLite. Only used in MailerLite automation.',
        },
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Email', value: 'email' },
          { label: 'Name', value: 'name' },
          { label: 'Last Name', value: 'lastName' },
          { label: 'Company', value: 'company' },
          { label: 'Country', value: 'country' },
          { label: 'City', value: 'city' },
          { label: 'Phone', value: 'phone' },
          { label: 'State', value: 'state' },
          { label: 'Zip', value: 'zip' },
        ],
      },
      {
        name: 'dubsadoKey',
        type: 'text',
        label: 'Dubsado Attribute Key',
        admin: {
          description:
            'The internal mapping key for Dubsado leads. Only used for general inquiry automation.',
        },
      },
    ],
  };
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      text: { ...textField, fields: [...textField.fields, automationField(false)] },
      textarea: { ...textAreaField, fields: [...textAreaField.fields, automationField(false)] },
      select: { ...selectField, fields: [...selectField.fields, automationField(true)] },
      radio: { ...radioField, fields: [...radioField.fields, automationField(true)] },
      email: { ...emailField, fields: [...emailField.fields, automationField(false)] },
      checkbox: { ...checkboxField, fields: [...checkboxField.fields, automationField(true)] },
      number: { ...numberField, fields: [...numberField.fields, automationField(false)] },
      state: true,
      country: true,
      message: true,
      date: false,
      payment: false,
    },
    redirectRelationships: ['pages'],
    formSubmissionOverrides: {
      hooks: {
        afterChange: [automationDispatcher],
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields
          .map((field) => {
            // 1. Existing Lexical support for confirmation
            if ('name' in field && field.name === 'confirmationMessage') {
              return { ...field, editor: contentLexical() };
            }

            // 2. Inject Mapping & Early Exit into every Form Field
            if ('name' in field && field.name === 'fields') {
              const blocksField = field as BlocksField;

              // Re-insert the Step Break block for the multi-step UI
              blocksField.blocks.push({
                slug: 'stepBreak',
                labels: { singular: 'Step Break', plural: 'Step Breaks' },
                fields: [{ name: 'stepTitle', type: 'text' }],
              });

              return blocksField;
            }

            return field;
          })
          .concat([
            {
              name: 'slackSettings',
              type: 'group',
              label: 'Slack Notifications',
              admin: { position: 'sidebar' },
              fields: [
                {
                  name: 'sendNotification',
                  type: 'checkbox',
                  label: 'Notify Sarah on Slack?',
                },
                {
                  name: 'customMessage',
                  type: 'textarea',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.sendNotification,
                    description: 'Message to Send',
                  },
                },
              ],
            },
            {
              name: 'automationSettings',
              type: 'group',
              label: 'Automation Settings',
              admin: { position: 'sidebar' },
              fields: [
                {
                  name: 'automation',
                  type: 'select',
                  defaultValue: 'none',
                  required: true,
                  options: [
                    { value: 'none', label: 'None' },
                    { value: 'inquiry', label: 'General Inquiry' },
                    { value: 'mailerLite', label: 'MailerLite Integration' },
                  ],
                },
                {
                  name: 'mailerLiteGroup',
                  type: 'text',
                  label: 'MailerLite Group',
                  admin: {
                    position: 'sidebar',
                    condition: (_, siblingData) => siblingData.automation == 'mailerLite',
                    components: {
                      Field: '@/components/MailerLiteGroupSelect#MailerLiteGroupSelect',
                    },
                  },
                },
                {
                  name: 'conditionalRedirect',
                  label: 'Conditional Redirects',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'value',
                      label: 'Redirect Destination',
                      type: 'group',
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
                              label: 'Custom URL',
                              value: 'custom',
                            },
                          ],
                        },
                        {
                          name: 'reference',
                          type: 'relationship',
                          admin: {
                            condition: (_, siblingData) => siblingData?.type === 'reference',
                          },
                          label: 'Document to link to',
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
                      ],
                    },
                  ],
                },
              ],
            },
          ]);
      },
      endpoints: [
        {
          path: '/mailerlite-groups',
          method: 'get',
          handler: async (req) => {
            if (!req.user) return new Response('Unauthorized', { status: 401 });

            try {
              const response = await mailerlite.groups.get({
                limit: 100,
                sort: 'name',
              });

              return Response.json(response.data.data);
            } catch (_error) {
              return Response.json({ error: 'Failed to fetch groups' }, { status: 500 });
            }
          },
        },
      ],
    },
  }),
];
