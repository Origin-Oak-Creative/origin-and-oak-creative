'use client';
import React, { useMemo } from 'react';
import { SelectInput, useField, FieldLabel, useAllFormFields } from '@payloadcms/ui';
import { SelectField, StaticLabel } from 'payload';

const isString = (str: unknown): str is string => {
  return typeof str === 'string';
};

export const RedirectSelector: React.FC<SelectField & { path: string }> = ({
  path,
  label,
  required,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [fields] = useAllFormFields();
  const redirectRows = fields['automationSettings.conditionalRedirect'].rows;
  const redirects = redirectRows?.map((e) => e.lastRenderedPath);

  const options = useMemo(() => {
    const initOptions = [{ label: 'None', value: 'None' }];
    if (!redirects || !Array.isArray(redirects)) return initOptions;

    return initOptions.concat(
      redirects
        .filter((r) =>
          fields[`${r}.label`] && fields[`${r}.label`].value && isString(fields[`${r}.label`].value)
            ? true
            : false,
        )
        .map((r) => {
          return {
            label: fields[`${r}.label`].value as string,
            value: fields[`${r}.label`].value as string, // We store the label to match it later
          };
        }),
    );
  }, [fields, redirects]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <FieldLabel required={required} />
      <SelectInput
        label={label && typeof label !== 'function' ? (label as StaticLabel) : ''}
        path={path}
        name={path}
        options={options}
        value={value}
        hasMany={false}
        onChange={(selected) => {
          if (!selected) {
            setValue('None');
          } else if (!Array.isArray(selected)) {
            setValue(selected.value);
          }
        }}
        isClearable
      />
    </div>
  );
};
