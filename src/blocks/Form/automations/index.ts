import type { Form, FormSubmission } from '@/payload-types';
import type { BasePayload } from 'payload';

import { handleSlack } from './slackNotification';
import { handleGenInquiry } from './genInquiry';

export async function runFormAutomations(
  form: Form,
  submission: FormSubmission,
  payload: BasePayload,
) {
  const { automationSettings, slackSettings, fields } = form;
  const submissionData = submission.submissionData || [];

  if (automationSettings?.automation === 'inquiry' && fields) {
    await handleGenInquiry(fields, submissionData, payload);
  }

  if (slackSettings && slackSettings.sendNotification) {
    await handleSlack(slackSettings.customMessage, submissionData, payload);
  }
}
