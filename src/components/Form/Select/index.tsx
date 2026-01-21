import type { SelectField } from '@payloadcms/plugin-form-builder/types';
import type { UseFormRegister, FieldErrorsImpl, FieldValues } from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Select: React.FC<
  SelectField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, register, errors, label, options, required, width, defaultValue }) => {
  return (
    <Width width={width}>
      <label htmlFor={name} className={styles.label}>
        {label}

        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.select}>
        <select defaultValue={defaultValue} id={name} {...register(name, { required })}>
          {options.map(({ label, value }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
