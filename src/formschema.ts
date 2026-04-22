import { z } from "zod";

export const profileSchema = z.object({
  displayName: z.string().min(2, "Too short").max(50,"too long"),

  bio: z.string().max(200).optional(),

  customMessage: z.string().max(200).optional(),

  

  socialLinks: z.object({
    twitter: z
      .string()
      .url("Invalid URL")
      .optional()
      .or(z.literal("")),

    github: z
      .string()
      .url("Invalid URL")
      .optional()
      .or(z.literal("")),

    website: z
      .string()
      .url("Invalid URL")
      .optional()
      .or(z.literal("")),
  }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;