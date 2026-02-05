import { BasePayload } from 'payload';

import type { SubmissionValue } from '@payloadcms/plugin-form-builder/types';

import { isAutomationField, UnionField } from '../types';

const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

type FieldItem = {
  id: string;
  type: 'question' | 'date' | 'leadSource';
  [k: string]: string | number | boolean | undefined | null;
  value?: string;
};

export const handleGenInquiry = async (
  fields: UnionField,
  data: SubmissionValue[],
  payload: BasePayload,
  id: string | number,
) => {
  const FORM_ID = process.env.DUBSADO_FORM_ID;
  const USER_ID = process.env.DUBSADO_USER_ID;
  const BASE_URL = process.env.DUBSADO_BASE_URL || 'https://portal.dubsado.com';

  try {
    if (!FORM_ID) throw new ReferenceError('Dubsado Form ID is not defined or is null.');
    if (!USER_ID) throw new ReferenceError('Dubsado User ID is not defined or is null.');

    const FORM_URL = `${BASE_URL}/api/forms/u/${FORM_ID}?isOnScheduler=false&ignoreCache=false`;
    const FORM_SUBMIT_URL = `${BASE_URL}/api/forms/Capture/${FORM_ID}`;
    const PUBLIC_URL = `${BASE_URL}/public/form/view/${FORM_ID}`;

    const initResponse = await fetch(FORM_URL, {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Connection: 'close',
      },
    });
    if (!initResponse.ok) {
      throw new Error('Init Fetch Failed');
    }

    const formObj = await initResponse.json();

    let matchCount = 0;
    formObj.data = formObj.data.map((fieldItem: FieldItem) => {
      const payloadField = fields.find((f) => {
        if (isAutomationField(f)) return f.dubsadoKey === fieldItem.id;
        else return false;
      });

      if (payloadField && isAutomationField(payloadField)) {
        const submittedValue = data.find(
          (s: SubmissionValue) => s.field === payloadField.name,
        )?.value;

        if (isString(submittedValue)) {
          matchCount++;
          if (fieldItem.type === 'date') {
            const dateObj = new Date(`${submittedValue}T10:00:00.000Z`);
            return {
              ...fieldItem,
              value: dateObj.getTime(),
              date: dateObj.toISOString(),
            };
          }
          return { ...fieldItem, value: submittedValue };
        }
      }
      return fieldItem;
    });

    payload.logger.info(`Mapped ${matchCount} fields to Dubsado schema`);

    if (matchCount === 0) {
      throw new Error('Mapping failed: No matching fields found between Payload and Dubsado JSON.');
    }

    const finalPayload = {
      form: {
        ...formObj,
        completed: true,
        completedDate: new Date().toISOString(),
      },
      inProgress: false,
    };

    const res = await fetch(FORM_SUBMIT_URL, {
      method: 'PUT',
      body: JSON.stringify(finalPayload),
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Connection: 'close',
        'X-Requested-With': 'XMLHttpRequest',
        Origin: BASE_URL,
        Referer: PUBLIC_URL,
      },
    });

    if (!res.ok) {
      throw new Error('Submission Failed');
    }

    await payload.update({
      collection: 'form-submissions',
      id,
      data: {
        dubsadoSyncStatus: 'success',
      },
    });
    payload.logger.info('Dubsado sync complete');
  } catch (e) {
    await payload.update({
      collection: 'form-submissions',
      id,
      data: {
        dubsadoSyncStatus: 'failed',
      },
    });
    payload.logger.error(e, 'Dubsado sync error');
  }
};
