export const EXPENSE_CATEGORIES = [
  { value: 'rent', label: 'Rent' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'gas', label: 'Gas' },
  { value: 'water', label: 'Water' },
  { value: 'internet', label: 'Internet' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'other', label: 'Other' },
] as const;

export const DUE_DATE_OPTIONS = [
  { value: '7', label: 'Due in 7 days' },
  { value: '14', label: 'Due in 14 days' },
  { value: '21', label: 'Due in 21 days' },
  { value: '28', label: 'Due in 28 days' },
] as const;

export const SPLIT_TYPES = [
  { value: 'equal', label: 'Equal split' },
  { value: 'custom_percentage', label: 'Custom % split' },
  { value: 'custom_dollar', label: 'Custom $ split' },
] as const;
