import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  AUTH_SECRET: z.string().min(16),
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().optional(),
  DATABASE_URL: z.string().url(),
  ADAPTER_MODE: z.enum(["mock", "live"]).default("mock"),
  GITHUB_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional()
});

export const env = schema.parse(process.env);