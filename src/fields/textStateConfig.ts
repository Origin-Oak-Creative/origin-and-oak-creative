export const TEXT_STATE_CONFIGS = {
  hero: {
    style: {
      'heading-large': {
        label: 'Large Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '100px' },
      },
      'heading-medium': {
        label: 'Medium Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '72px' },
      },
      'heading-small': {
        label: 'Small Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '64px' },
      },
      'subheading-regular': {
        label: 'Regular Subheading',
        css: { 'font-family': 'var(--lato)', 'font-size': '24px' },
      },
      'subheading-small': {
        label: 'Small Subheading',
        css: { 'font-family': 'var(--lato)', 'font-size': '20px' },
      },
      paragraph: {
        label: 'Paragraph',
        css: { 'font-family': 'var(--lato)', 'font-size': '20px' },
      },
    },
    color: {
      'soft-linen': { label: 'Soft Linen', css: { color: 'var(--soft-linen)' } },
      'river-stone': { label: 'River Stone', css: { color: 'var(--river-stone)' } },
      'dune-sand': { label: 'Dune Sand', css: { color: 'var(--dune-sand)' } },
      midnight: { label: 'Midnight', css: { color: 'var(--midnight)' } },
      'graphite-smoke': { label: 'Graphite Smoke', css: { color: 'var(--graphite-smoke)' } },
      'deep-wisdom-olive': {
        label: 'Deep Wisdom Olive',
        css: { color: 'var(--deep-wisdom-olive)' },
      },
    },
    spacing: {
      condensed: { label: 'Condensed', css: { 'letter-spacing': '-0.02em' } },
      standard: { label: 'Standard', css: { 'letter-spacing': '0' } },
      'semi-spacious': { label: 'Semi Spacious', css: { 'letter-spacing': '0.02em' } },
      spacious: { label: 'Spacious', css: { 'letter-spacing': '0.1em' } },
    },
  },
  heading: {
    style: {
      'heading-extra-large': {
        label: 'Extra Large Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '80px' },
      },
      'heading-large': {
        label: 'Large Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '64px' },
      },
      'heading-medium': {
        label: 'Medium Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '48px' },
      },
      'heading-small': {
        label: 'Small Heading',
        css: { 'font-family': 'var(--analogue)', 'font-size': '48px' },
      },
      'subheading-large': {
        label: 'Large Subheading',
        css: { 'font-family': 'var(--lato)', 'font-size': '24px' },
      },
      'subheading-regular': {
        label: 'Regular Subheading',
        css: { 'font-family': 'var(--lato)', 'font-size': '20px' },
      },
    },
    color: {
      'soft-linen': { label: 'Soft Linen', css: { color: 'var(--soft-linen)' } },
      'river-stone': { label: 'River Stone', css: { color: 'var(--river-stone)' } },
      'dune-sand': { label: 'Dune Sand', css: { color: 'var(--dune-sand)' } },
      midnight: { label: 'Midnight', css: { color: 'var(--midnight)' } },
      'graphite-smoke': {
        label: 'Graphite Smoke',
        css: { color: 'var(--graphite-smoke)' },
      },
      'deep-wisdom-olive': {
        label: 'Deep Wisdom Olive',
        css: { color: 'var(--deep-wisdom-olive)' },
      },
    },
    spacing: {
      condensed: { label: 'Condensed', css: { 'letter-spacing': '-0.02em' } },
      standard: { label: 'Standard', css: { 'letter-spacing': '0' } },
      'semi-spacious': { label: 'Semi Spacious', css: { 'letter-spacing': '0.02em' } },
      spacious: { label: 'Spacious', css: { 'letter-spacing': '0.1em' } },
    },
  },
  content: {
    size: {
      large: {
        label: 'Large',
        css: { 'font-size': '20px' },
      },
      medium: {
        label: 'Medium',
        css: { 'font-size': '18px' },
      },
      small: {
        label: 'Medium Heading',
        css: { 'font-size': '16px' },
      },
    },
    spacing: {
      condensed: { label: 'Condensed', css: { 'letter-spacing': '-0.02em' } },
      standard: { label: 'Standard', css: { 'letter-spacing': '0' } },
      spacious: { label: 'Spacious', css: { 'letter-spacing': '0.02em' } },
    },
  },
} as const;

export type ConfigType = keyof typeof TEXT_STATE_CONFIGS;
export interface StyleDefinition {
  readonly label?: string;
  readonly css: Record<string, string>;
}

export const getTextStateConfig = (type: ConfigType) => {
  const config = TEXT_STATE_CONFIGS[type];

  switch (type) {
    case 'hero':
    case 'heading':
      return {
        style: 'style' in config ? config.style : {},
        color: 'color' in config ? config.color : undefined,
        spacing: 'spacing' in config ? config.spacing : undefined,
      };
    case 'content':
      return {
        size: 'size' in config ? config.size : undefined,
        spacing: 'spacing' in config ? config.spacing : undefined,
      };
    default:
      return {};
  }
};
