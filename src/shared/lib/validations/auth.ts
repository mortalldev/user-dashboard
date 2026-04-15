import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email required').email('Invalid email'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
