'use client';

import React, { useEffect, useState } from 'react';
import { useField, SelectInput, FieldLabel } from '@payloadcms/ui';

interface MailerLiteGroup {
  id: string;
  name: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export const MailerLiteGroupSelect: React.FC<{ path: string }> = ({ path }) => {
  // Access the field's value and the function to update it
  const { value, setValue } = useField<string>({ path });
  const [groups, setGroups] = useState<MailerLiteGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Payload collection endpoints are prefixed with /api/{collection-slug}
        const response = await fetch('/api/forms/mailerlite-groups');
        if (!response.ok) throw new Error('Failed to fetch groups');

        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError('Could not load MailerLite groups.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Map the MailerLite data into the format Payload's SelectInput expects
  const options: SelectOption[] = groups.map((group) => ({
    label: group.name,
    value: group.id,
  }));

  return (
    <div style={{ marginBottom: '20px' }}>
      <FieldLabel htmlFor={path} label="MailerLite Groups" required />
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(option) => setValue(option instanceof Array ? option[0].value : option.value)}
        style={{ width: '100%' }}
      />
      {loading && <p>Fetching groups from MailerLite...</p>}
      {error && (
        <p
          style={{
            padding: '1rem',
            backgroundColor: '#B31509',
            color: 'white',
            borderRadius: '4px',
            marginBottom: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
