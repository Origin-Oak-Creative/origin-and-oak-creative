import { Field } from 'payload';

// Define the icon configuration type
export interface LucideIconPickerType {
  name: string;
}

// Define the icon data type
export type LucideIconData = {
  name: string;
};

// Define the overrides type
export type LucideIconPickerOverrides = Partial<{
  name: string;
  label: string;
  required: boolean;
  defaultValue: Partial<LucideIconData>;
  interfaceName: string;
}>;

export const LucideIconPicker = (overrides: LucideIconPickerOverrides = {}): Field => {
  return {
    type: 'json' as const,
    name: overrides.name || 'LucideIconPicker',
    label: overrides.label || 'Lucide Icon Picker',
    defaultValue: overrides.defaultValue || {
      name: '',
    },
    admin: {
      components: {
        Field: {
          path: '@/fields/iconPicker/Component#IconSelectField',
        },
      },
    },
    required: overrides.required || false,
  };
};

export default LucideIconPicker;
