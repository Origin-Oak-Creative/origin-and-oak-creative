import type { TextField } from '@payloadcms/plugin-form-builder/types';
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    rows?: number;
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  return (
    <Width width={width}>
      <label htmlFor={name} className={styles.label}>
        {label}

        {required && <span className={styles.required}>*</span>}
      </label>

      <textarea
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: required })}
        className={styles.textarea}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
};
