'use client';
import React, { useMemo } from 'react';
import { SelectInput, useFormFields, FieldLabel } from '@payloadcms/ui';
import { SelectField, StaticLabel } from 'payload';

export const RedirectSelector: React.FC<SelectField & { path: string }> = ({
  path,
  label,
  required,
}) => {
  // 1. Grab the "conditionalRedirect" array from the form state
  const redirects = useFormFields(([fields]) => fields['conditionalRedirect']?.value) as
    | Array<{ label: string; value: string }>
    | undefined;

  // 2. Format the redirects into options for the SelectInput
  const options = useMemo(() => {
    const initOptions = [{ label: 'None', value: 'None' }];
    if (!redirects || !Array.isArray(redirects)) return initOptions;

    return initOptions.concat(
      redirects
        .filter((r) => r.label) // Only show if they've typed a label
        .map((r) => ({
          label: r.label,
          value: r.label, // We store the label to match it later
        })),
    );
  }, [redirects]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <FieldLabel required={required} />
      <SelectInput
        label={label && typeof label !== 'function' ? (label as StaticLabel) : ''}
        path={path}
        name={path}
        options={options}
        isClearable
      />
    </div>
  );
};
