import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
export type SignInBody = z.infer<typeof signInSchema>;
export type RefreshBody = z.infer<typeof refreshSchema>;
