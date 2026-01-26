import { z } from 'zod';

export const createHouseSchema = z.object({
  name: z.string().min(1, 'House name is required').max(255, 'House name is too long'),
  address_line1: z.string().max(255, 'Address line 1 is too long').optional().or(z.literal('')),
  address_line2: z.string().max(255, 'Address line 2 is too long').optional().or(z.literal('')),
  city: z.string().max(100, 'City name is too long').optional().or(z.literal('')),
  state: z.string().max(50, 'State name is too long').optional().or(z.literal('')),
  postcode: z.string().max(20, 'Postcode is too long').optional().or(z.literal('')),
  default_payment_due_days: z.coerce
    .number()
    .int('Payment due days must be a whole number')
    .min(1, 'Payment due days must be at least 1')
    .max(90, 'Payment due days cannot exceed 90'),
});

export type CreateHouseFormData = z.infer<typeof createHouseSchema>;
