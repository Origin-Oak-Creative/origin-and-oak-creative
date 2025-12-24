import React from 'react';

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import type { ThemeField } from '@/fields/blockTheme';

import RichText from '@/components/RichText';

export const RichTextCard = ({
  theme,
  data,
}: {
  theme: ThemeField;
  data: DefaultTypedEditorState;
}) => {
  return (
    <div className={theme}>
      <RichText data={data} />
    </div>
  );
};
