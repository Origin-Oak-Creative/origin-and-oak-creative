import { BasePayload } from 'payload';
import { isAutomationField, UnionField } from '../types';
import type { SubmissionValue } from '@payloadcms/plugin-form-builder/types';
import { Client, type CreatePageParameters } from '@notionhq/client';

const isString = (val: unknown): val is string => {
  return typeof val === 'string';
};

const isNumber = (val: unknown): val is number => {
  return typeof val === 'number';
};

const notion = new Client({ auth: process.env.NOTION_API_KEY });

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

  // Notion - REQUIRES INTEGRATION SETUP
  // const properties: CreatePageParameters['properties'] = {};

  // data.forEach((submissionItem) => {
  //   const fieldDef = fields.find((f) => isAutomationField(f) && f.name === submissionItem.field);
  //   if (!fieldDef || !isAutomationField(fieldDef)) return;
  //   if (fieldDef.notionKey) {
  //     const key = fieldDef.notionKey;
  //     const val = submissionItem.value;

  //     if (val) {
  //       if (key === 'Name' || key === 'Title') {
  //         properties[key] = { title: [{ text: { content: val.toString() } }] };
  //       } else if (fieldDef.blockType === 'email') {
  //         properties[key] = { email: val.toString() };
  //       } else if (fieldDef.blockType === 'number') {
  //         properties[key] = { number: Number(val) };
  //       } else {
  //         // Default to a simple Rich Text property in Notion
  //         properties[key] = { rich_text: [{ text: { content: val.toString() } }] };
  //       }
  //     }
  //   }
  // });

  // try {
  //   if (!process.env.NOTION_DATABASE_ID)
  //     throw new ReferenceError('Notion Database ID is not defined or is null.');

  //   await notion.pages.create({
  //     parent: { database_id: process.env.NOTION_DATABASE_ID },
  //     properties: properties,
  //   });

  //   payload.logger.info('Successfully created Notion lead entry');
  // } catch (e) {
  //   payload.logger.info(e, 'Notion sync error');
  // }
};
