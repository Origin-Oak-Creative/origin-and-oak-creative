import MailerLite from '@mailerlite/mailerlite-nodejs';
import { BasePayload } from 'payload';
import { isAutomationField, UnionField } from '../types';
import type { SubmissionValue } from '@payloadcms/plugin-form-builder/types';

const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

const mailerlite = new MailerLite({ api_key: process.env.MAILERLITE_API_KEY || '' });

export const handleMailerLite = async (
  fields: UnionField,
  data: SubmissionValue[],
  payload: BasePayload,
  group: string,
) => {
  try {
    const mappedFields: Record<string, string> = {};
    console.log(fields);
    fields.forEach((field) => {
      console.log(isAutomationField(field));
      if (isAutomationField(field) && field.mailerLiteKey && field.mailerLiteKey !== 'none') {
        const val = data.find((s) => s.field === field.name)?.value;
        if (val && isString(val)) mappedFields[field.mailerLiteKey] = val;
      }
    });

    if (!mappedFields['email']) {
      payload.logger.error('MailerLite Hook: No email field found in submission.');
    } else {
      const res = await mailerlite.subscribers.createOrUpdate({
        email: mappedFields['email'],
        fields: {
          name: mappedFields['name'] ? mappedFields['name'] : '',
          last_name: mappedFields['lastName'] ? mappedFields['lastName'] : '',
          company: mappedFields['company'] ? mappedFields['company'] : '',
          country: mappedFields['country'] ? mappedFields['country'] : '',
          city: mappedFields['city'] ? mappedFields['city'] : '',
          phone: mappedFields['phone'] ? mappedFields['phone'] : '',
          state: mappedFields['state'] ? mappedFields['state'] : '',
          z_i_p: mappedFields['zip'] ? mappedFields['zip'] : '',
        },
        status: 'active',
      });

      const id = res.data.data.id;

      await mailerlite.groups.assignSubscriber(id, group);
      payload.logger.info(
        `Successfully added ${mappedFields['email']} to MailerLite group ${group}`,
      );
    }
  } catch (e) {
    payload.logger.error(e, 'MailerLite Hook Error');
  }
};
