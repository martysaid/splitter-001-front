export const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'NSW' },
  { value: 'VIC', label: 'VIC' },
  { value: 'QLD', label: 'QLD' },
  { value: 'WA', label: 'WA' },
  { value: 'SA', label: 'SA' },
  { value: 'TAS', label: 'TAS' },
  { value: 'ACT', label: 'ACT' },
  { value: 'NT', label: 'NT' },
] as const;

export const PAYMENT_DUE_DAYS_OPTIONS = [
  { value: 7, label: '7 days' },
  { value: 14, label: '14 days' },
  { value: 21, label: '21 days' },
  { value: 28, label: '28 days' },
] as const;

export const DEFAULT_PAYMENT_DUE_DAYS = 7;
