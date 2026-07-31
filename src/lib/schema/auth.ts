import { z } from "zod";

export const authUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
  roleKey: z.string().min(1),
  permissions: z.array(z.string()).default([]),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const sessionSchema = z.object({
  user: authUserSchema,
  expiresAt: z.string().datetime().optional(),
});

export type Session = z.infer<typeof sessionSchema>;

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().default(true),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  roleKey: z.string().default("student"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const magicLinkRequestSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type MagicLinkRequestInput = z.infer<typeof magicLinkRequestSchema>;

export const magicLinkVerifySchema = z.object({
  token: z.string().min(1, "Missing magic link token."),
});

export type MagicLinkVerifyInput = z.infer<typeof magicLinkVerifySchema>;
