import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
