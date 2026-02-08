'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useField } from '@payloadcms/ui';
import { LucideProps } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { dynamicIconImports } from 'lucide-react/dynamic';
import type { LucideIconPickerType } from './config';

type IconName = keyof typeof dynamicIconImports;

// Custom hook for debouncing
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Define proper props type for the component
type IconSelectFieldProps = {
  path: string;
  field: {
    label: string;
  };
};

interface IconProps extends LucideProps {
  name: string;
}

const Icon = React.memo(({ name, ...props }: IconProps) => {
  return <DynamicIcon name={name as IconName} {...props} />;
});

Icon.displayName = 'Icon';

// Maximum number of icons to show per page
const ICONS_PER_PAGE = 60;

const DEFAULT_ICON_CONFIG = {
  name: '',
};

export const IconSelectField: React.FC<IconSelectFieldProps> = (props) => {
  const { path, field } = props;

  const label = field.label;

  const { value = DEFAULT_ICON_CONFIG, setValue } = useField<LucideIconPickerType>({ path });

  const [fieldIsFocused, setFieldIsFocused] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Debounce search for better performance
  const debouncedSearch = useDebounce(search, 300);

  // Memoize all icons
  const allIcons = useMemo(() => [...Object.keys(dynamicIconImports)].sort(), []);

  // Filter icons based on debounced search
  const filteredIcons = useMemo(() => {
    if (!debouncedSearch) return allIcons;

    return allIcons.filter((name) => name.toLowerCase().includes(debouncedSearch.toLowerCase()));
  }, [debouncedSearch, allIcons]);

  const totalPages = Math.ceil(filteredIcons.length / ICONS_PER_PAGE);

  // Get the current page of icons
  const paginatedIcons = useMemo(() => {
    return filteredIcons.slice(page * ICONS_PER_PAGE, (page + 1) * ICONS_PER_PAGE);
  }, [filteredIcons, page]);

  // No explicit preloading needed with DynamicIcon
  useEffect(() => {}, []);

  // Reset page when search changes
  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  // Handle icon selection
  const handleIconSelect = useCallback(
    (iconName: string) => {
      setValue({
        ...value,
        name: iconName,
      });
      setFieldIsFocused(false);
      setSearch('');
    },
    [setValue, value],
  );

  // // Handle configuration changes
  // const handleConfigChange = useCallback(
  //   (field: keyof LucideIconPickerType, newValue: any) => {
  //     setValue({
  //       ...value,
  //       [field]: newValue,
  //     });
  //   },
  //   [setValue, value],
  // );

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalElement = document.querySelector('.icon-picker-modal');
      const fieldElement = document.querySelector('.icon-select-field');

      if (
        fieldIsFocused &&
        modalElement &&
        fieldElement &&
        !modalElement.contains(event.target as Node) &&
        !fieldElement.contains(event.target as Node)
      ) {
        setFieldIsFocused(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fieldIsFocused]);

  // Handle reset to defaults
  const handleResetToDefaults = useCallback(() => {
    setValue({
      name: value.name, // Preserve the selected icon
    });
    setShowResetConfirm(false);
  }, [setValue, value.name]);

  return (
    <div
      style={{
        width: '100%',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      }}
    >
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '6px',
          color: 'var(--theme-elevation-800)',
          fontSize: '12px',
          fontWeight: 500,
        }}
      >
        <Icon name="palette" size={14} style={{ color: 'var(--theme-elevation-500)' }} />
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            width: '40px',
            minWidth: '40px',
            backgroundColor: 'var(--theme-elevation-50, #f3f3f3)',
            border: '1px solid var(--theme-elevation-150, #e1e1e1)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out',
          }}
          onClick={() => setFieldIsFocused(true)}
          tabIndex={0}
          role="button"
          aria-label="Open icon selector"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFieldIsFocused(true);
            }
          }}
        >
          {value.name ? (
            <Icon
              name={value.name as string}
              size={24}
              color={'currentColor'}
              strokeWidth={2}
              absoluteStrokeWidth={false}
              style={{ color: 'var(--theme-text, #333)' }}
            />
          ) : (
            <span
              style={{
                color: 'var(--theme-elevation-400, #a6a6a6)',
                fontSize: '12px',
              }}
            >
              Icon
            </span>
          )}
        </div>

        <input
          type="text"
          style={{
            flex: 1,
            height: '40px',
            border: '1px solid var(--theme-elevation-150, #e1e1e1)',
            borderRadius: '4px',
            padding: '0 10px',
            backgroundColor: 'var(--theme-input-bg, #fff)',
            color: 'var(--theme-text, #333)',
            cursor: 'pointer',
          }}
          value={
            value.name
              ? value.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
              : 'Select an icon...'
          }
          readOnly
          onClick={() => setFieldIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setFieldIsFocused(true);
            }
          }}
          aria-haspopup="true"
        />

        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            width: '40px',
            minWidth: '40px',
            backgroundColor: 'var(--theme-elevation-50, #f3f3f3)',
            border: '1px solid var(--theme-elevation-150, #e1e1e1)',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.1s ease-in-out',
            color: 'var(--theme-elevation-800, #525252)',
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowConfig(!showConfig);
          }}
          aria-label="Configure icon"
        >
          <Icon name="settings" size={20} />
        </button>

        {showConfig && (
          <div
            style={{
              position: 'absolute',
              top: '45px',
              right: 0,
              width: '300px',
              backgroundColor: 'var(--theme-bg, #fff)',
              border: '1px solid var(--theme-elevation-150, #e1e1e1)',
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid var(--theme-elevation-100, #f0f0f0)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>Icon Configuration</h3>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'var(--theme-elevation-500, #919191)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  className="icon-config-panel__reset"
                  onClick={() => setShowResetConfirm(true)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    color: 'var(--theme-elevation-800, #525252)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease-in-out',
                  }}
                >
                  <Icon name="rotate-ccw" size={14} />
                  Restore Defaults
                </button>
                <button
                  type="button"
                  className="icon-config-panel__confirm"
                  onClick={handleResetToDefaults}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'var(--theme-text, #333)',
                    color: 'var(--theme-bg, #fff)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease-in-out',
                  }}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {showResetConfirm && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'var(--theme-bg, #fff)',
                borderRadius: '6px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid var(--theme-elevation-100, #f0f0f0)',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--theme-text, #333)',
                  }}
                >
                  Reset Configuration
                </h3>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--theme-elevation-500, #919191)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                  }}
                >
                  <Icon name="x" size={16} />
                </button>
              </div>
              <div
                style={{
                  padding: '16px',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: 'var(--theme-text, #333)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  Are you sure you want to restore default configuration?
                </p>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--theme-elevation-600, #666)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                  }}
                >
                  This will reset size, color, stroke width, and absolute stroke settings to their
                  default values. The selected icon will be preserved.
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  padding: '16px',
                  borderTop: '1px solid var(--theme-elevation-100, #f0f0f0)',
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: '8px 16px',
                    background: 'var(--theme-elevation-50, #f3f3f3)',
                    border: '1px solid var(--theme-elevation-150, #e1e1e1)',
                    borderRadius: '4px',
                    color: 'var(--theme-text, #333)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease-in-out',
                  }}
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={{
                    padding: '8px 16px',
                    background: 'var(--theme-error-600, #dc2626)',
                    border: '1px solid var(--theme-error-700, #b91c1c)',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease-in-out',
                  }}
                  onClick={handleResetToDefaults}
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

        {fieldIsFocused && (
          <div
            style={{
              position: 'absolute',
              top: '45px',
              left: 0,
              width: '100%',
              maxWidth: '580px',
              backgroundColor: 'var(--theme-bg, #fff)',
              border: '1px solid var(--theme-elevation-150, #e1e1e1)',
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              zIndex: 10,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            aria-label="Icon Picker"
            role="dialog"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid var(--theme-elevation-100, #f0f0f0)',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--theme-text, #333)',
                }}
              >
                Select an Icon
              </h2>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'var(--theme-elevation-500, #919191)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldIsFocused(false);
                  setSearch('');
                }}
                aria-label="Close dialog"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--theme-elevation-100, #f0f0f0)',
              }}
            >
              <input
                type="search"
                placeholder={hoveredIcon || 'Search icons...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  height: '36px',
                  padding: '0 12px',
                  border: '1px solid var(--theme-elevation-150, #e1e1e1)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--theme-input-bg, #fff)',
                }}
                autoFocus
              />
            </div>

            <div
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                color: 'var(--theme-elevation-500, #919191)',
                borderBottom: '1px solid var(--theme-elevation-100, #f0f0f0)',
              }}
            >
              Showing {paginatedIcons.length} of {filteredIcons.length} icons
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '8px',
                padding: '16px',
                maxHeight: '320px',
                overflowY: 'auto',
              }}
            >
              {paginatedIcons.length > 0 ? (
                paginatedIcons.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px 4px',
                      background:
                        value.name === iconName ? 'var(--theme-elevation-100, #f0f0f0)' : 'none',
                      border: `1px solid ${
                        value.name === iconName
                          ? 'var(--theme-elevation-300, #c1c1c1)'
                          : 'var(--theme-elevation-100, #f0f0f0)'
                      }`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.1s ease-in-out',
                      position: 'relative',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleIconSelect(iconName);
                    }}
                    onMouseOver={() => setHoveredIcon(iconName)}
                    onMouseOut={() => setHoveredIcon(null)}
                    title={iconName
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    aria-label={iconName.replace(/-/g, ' ')}
                  >
                    {value.name === iconName && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--theme-success, #4caf50)',
                        }}
                      />
                    )}
                    <Icon
                      name={iconName as string}
                      size={24}
                      color={'currentColor'}
                      strokeWidth={2}
                      absoluteStrokeWidth={false}
                    />
                    <span
                      style={{
                        fontSize: '10px',
                        color: 'var(--theme-elevation-800, #525252)',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}
                    >
                      {iconName.replace(/-/g, ' ')}
                    </span>
                  </button>
                ))
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px',
                    color: 'var(--theme-elevation-500, #919191)',
                    fontStyle: 'italic',
                  }}
                >
                  No icons found matching {debouncedSearch}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderTop: '1px solid var(--theme-elevation-100, #f0f0f0)',
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.max(0, p - 1));
                  }}
                  disabled={page === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--theme-elevation-50, #f3f3f3)',
                    border: '1px solid var(--theme-elevation-150, #e1e1e1)',
                    borderRadius: '4px',
                    color: 'var(--theme-text, #333)',
                    fontSize: '14px',
                    cursor: page === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.1s ease-in-out',
                    opacity: page === 0 ? 0.5 : 1,
                  }}
                  aria-label="Previous page"
                >
                  <Icon name="chevron-left" size={16} />
                  Previous
                </button>

                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--theme-elevation-600, #666)',
                  }}
                >
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage((p) => Math.min(totalPages - 1, p + 1));
                  }}
                  disabled={page === totalPages - 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--theme-elevation-50, #f3f3f3)',
                    border: '1px solid var(--theme-elevation-150, #e1e1e1)',
                    borderRadius: '4px',
                    color: 'var(--theme-text, #333)',
                    fontSize: '14px',
                    cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.1s ease-in-out',
                    opacity: page === totalPages - 1 ? 0.5 : 1,
                  }}
                  aria-label="Next page"
                >
                  Next
                  <Icon name="chevron-right" size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelectField;
