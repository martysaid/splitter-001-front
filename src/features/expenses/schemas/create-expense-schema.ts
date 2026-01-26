import { z } from 'zod';

export const createExpenseSchema = z
  .object({
    name: z.string().min(1, 'Expense name is required').max(255, 'Expense name is too long'),
    amount: z
      .union([z.coerce.number().positive('Amount must be greater than 0'), z.undefined()])
      .refine(val => val !== undefined && val > 0, {
        message: 'Amount must be greater than 0',
      })
      .refine(val => val === undefined || val <= 1000000, {
        message: 'Amount is too large',
      }),
    category: z.enum([
      'rent',
      'electricity',
      'gas',
      'water',
      'internet',
      'cleaning',
      'maintenance',
      'groceries',
      'other',
    ]),
    dueDateOption: z.enum(['7', '14', '21', '28']),
    splitType: z.enum(['equal', 'custom_percentage', 'custom_dollar']),
    memberAllocations: z.record(z.string(), z.coerce.number()).optional(),
  })
  .refine(
    data => {
      if (data.splitType !== 'custom_percentage') return true;
      if (!data.memberAllocations) return false;

      const values = Object.values(data.memberAllocations);
      const sum = values.reduce((acc, val) => acc + val, 0);

      return Math.abs(sum - 100) < 0.01;
    },
    {
      message: 'Percentages must add up to 100%',
      path: ['memberAllocations'],
    }
  )
  .refine(
    data => {
      if (data.splitType !== 'custom_dollar') return true;
      if (!data.memberAllocations || data.amount === undefined) return false;

      const values = Object.values(data.memberAllocations);
      const sum = values.reduce((acc, val) => acc + val, 0);

      return Math.abs(sum - data.amount) < 0.01;
    },
    {
      message: 'Split amounts must add up to the total expense amount',
      path: ['memberAllocations'],
    }
  );

export type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;
