import { z } from "zod";

/** Generic pagination envelope returned by list endpoints. */
export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable().optional(),
    total: z.number().optional(),
  });

export const apiErrorBodySchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
  }),
});

export type ApiErrorBody = z.infer<typeof apiErrorBodySchema>;

export {
  authUserSchema,
  sessionSchema,
  signInSchema,
  signUpSchema,
  magicLinkRequestSchema,
  magicLinkVerifySchema,
} from "./auth";
export type {
  AuthUser,
  Session,
  SignInInput,
  SignUpInput,
  MagicLinkRequestInput,
  MagicLinkVerifyInput,
} from "./auth";
