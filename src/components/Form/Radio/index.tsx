import type { RadioField } from '@payloadcms/plugin-form-builder/types';
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';

import React from 'react';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Radio: React.FC<
  RadioField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width, options }) => {
  return (
    <Width width={width}>
      <fieldset className={styles.radio}>
        <legend className={styles.label}>
          {label}

          {required && <span className={styles.required}>*</span>}
        </legend>
        <div className={styles.radioGroup}>
          {options.map(({ label, value }, i) => {
            return (
              <label htmlFor={value} className={styles.label} key={i}>
                <input
                  type="radio"
                  value={value}
                  id={value}
                  defaultChecked={defaultValue == value}
                  {...register(name, { required })}
                />
                {label}
              </label>
            );
          })}
        </div>
      </fieldset>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
