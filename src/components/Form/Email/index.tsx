import type { EmailField } from '@payloadcms/plugin-form-builder/types';
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <label htmlFor={name} className={styles.label}>
        {label}

        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
        className={styles.input}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
};
