import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().url('VITE_API_URL must be a valid URL'),
  VITE_TEST_SLOW_API: z
    .string()
    .optional()
    .transform(val => val === 'true'),
});

const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  VITE_TEST_SLOW_API: import.meta.env.VITE_TEST_SLOW_API,
});

export default env;
