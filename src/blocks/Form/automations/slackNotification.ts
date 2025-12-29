import type { SubmissionValue } from '@payloadcms/plugin-form-builder/types';
import { BasePayload } from 'payload';

export const handleSlack = async (
  customMessage: string | null | undefined,
  data: SubmissionValue[],
  payload: BasePayload,
) => {
  const message = {
    text: customMessage || 'New Lead Received!',
    attachments: [
      {
        fields: data.map((d) => ({ title: d.field, value: d.value, short: true })),
      },
    ],
  };

  try {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      body: JSON.stringify(message),
    });
    payload.logger.info('Slack notification sent!');
  } catch (e) {
    payload.logger.error(e, 'Slack notification error');
  }
};
