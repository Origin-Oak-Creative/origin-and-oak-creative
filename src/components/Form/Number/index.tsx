'use client';

import type { TextField } from '@payloadcms/plugin-form-builder/types';
import type { FieldErrorsImpl, Control } from 'react-hook-form';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useController } from 'react-hook-form';

import { Error } from '../Error';
import { Width } from '../Width';

import styles from '../styles.module.css';

export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    control: Control;
  }
> = ({ name, defaultValue, errors, label, required, width, control }) => {
  const {
    field: { onChange, value, ref },
  } = useController({
    name,
    control,
    defaultValue,
  });

  // Helper to ensure we are always working with a number
  const currentNumber = typeof value === 'number' ? value : parseFloat(value) || 0;

  const handleIncrement = () => {
    onChange(currentNumber + 1);
  };

  const handleDecrement = () => {
    onChange(currentNumber - 1);
  };

  return (
    <Width width={width}>
      <label htmlFor={name} className={styles.label}>
        {label}

        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.number}>
        <input
          id={name}
          type="number"
          ref={ref}
          value={currentNumber}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
        <div className={styles.spins}>
          <button type="button" onClick={handleIncrement} aria-label="Increase value">
            <ChevronUp />
          </button>
          <button type="button" onClick={handleDecrement} aria-label="Decrease value">
            <ChevronDown />
          </button>
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
