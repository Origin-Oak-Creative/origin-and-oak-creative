'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import styles from '../styles.module.css';

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <div className={styles.error}>
      {(errors[name]?.message as string) || 'This field is required'}
    </div>
  );
};
