import RichText from '@/components/RichText';
import React from 'react';

import { Width } from '../Width';
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

import styles from '../styles.module.css';

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  return (
    <Width width="100">{message && <RichText data={message} className={styles.message} />}</Width>
  );
};
