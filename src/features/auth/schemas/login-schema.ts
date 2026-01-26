import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
