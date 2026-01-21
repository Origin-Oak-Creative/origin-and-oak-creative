import type { CheckboxField } from '@payloadcms/plugin-form-builder/types';
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          defaultChecked={defaultValue}
          id={name}
          {...register(name, { required })}
        />
        <label htmlFor={name} className={styles.label}>
          {label}

          {required && <span className={styles.required}>*</span>}
        </label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
