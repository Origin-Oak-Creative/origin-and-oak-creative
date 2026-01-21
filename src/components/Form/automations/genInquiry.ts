import { BasePayload } from 'payload';
import { isAutomationField, UnionField } from '../types';
import type { SubmissionValue } from '@payloadcms/plugin-form-builder/types';

const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

const isNumber = (val: unknown): val is number => {
  return typeof val === 'number';
};

export const handleGenInquiry = async (
  fields: UnionField,
  data: SubmissionValue[],
  payload: BasePayload,
) => {
  // Dubsado
  const formData = new URLSearchParams();

  try {
    if (!process.env.DUBSADO_FORM_ID)
      throw new ReferenceError('Dubsado Form ID is not defined or is null.');

    formData.append('form_id', process.env.DUBSADO_FORM_ID);
    fields.forEach((field) => {
      if (isAutomationField(field) && field.dubsadoKey) {
        const val = data.find((s) => s.field === field.name)?.value;
        if (val && (isString(val) || isNumber(val)))
          formData.append(field.dubsadoKey, val.toString());
      }
    });

    await fetch(
      `${process.env.DUBSADO_BASE_URL || 'https://portal.dubsado.com'}/public/form/submit/${process.env.DUBSADO_FORM_ID}`,
      {
        method: 'POST',
        body: formData.toString(),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    payload.logger.info('Dubsado sync complete');
  } catch (e) {
    payload.logger.error(e, 'Dubsado sync error');
  }
};
