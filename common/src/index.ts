import { z } from 'zod';

export const signupInput = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const siginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createBlogInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const updateBlogInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof siginInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
