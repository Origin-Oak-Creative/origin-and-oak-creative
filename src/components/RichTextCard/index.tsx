import React from 'react';

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import type { ThemeField } from '@/fields/blockTheme';

import RichText from '@/components/RichText';

import styles from './style.module.css';

export const RichTextCard = ({
  theme,
  data,
}: {
  theme: ThemeField;
  data: { heading?: DefaultTypedEditorState | null; content: DefaultTypedEditorState };
}) => {
  return (
    <div className={`${styles.card} ${theme}`}>
      {data.heading && <RichText data={data.heading} enableGutter={false} type="heading" />}
      <RichText data={data.content} type="content" />
    </div>
  );
};
