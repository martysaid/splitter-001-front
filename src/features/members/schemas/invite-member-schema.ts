import { z } from 'zod';

export const inviteMemberSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  move_in_date: z
    .string()
    .min(1, 'Move-in date is required')
    .refine(value => !Number.isNaN(Date.parse(value)), {
      message: 'Please enter a valid date',
    }),
});

export type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;
