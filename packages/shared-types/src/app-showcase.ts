import { z } from "zod";

export const AppPlatformSchema = z.enum(["android", "ios", "both"]);
export type AppPlatform = z.infer<typeof AppPlatformSchema>;

export const AppCategorySchema = z.enum([
  "puzzle",
  "casual",
  "action",
  "utility",
  "entertainment",
  "social",
]);
export type AppCategory = z.infer<typeof AppCategorySchema>;

export const AppStoreShowcaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Tên ứng dụng không được để trống"),
  tagline: z.string().optional().default(""),
  description: z.string().optional().default(""),
  developer: z.string().default("PlayNest Studio"),
  category: AppCategorySchema.default("casual"),
  iconUrl: z.string().url("URL Icon không hợp lệ"),
  bannerUrl: z.string().url("URL Banner không hợp lệ").optional(),
  screenshots: z.array(z.string()).default([]),
  playStoreUrl: z.string().url().optional().or(z.literal("")),
  appStoreUrl: z.string().url().optional().or(z.literal("")),
  rating: z.number().min(0).max(5).default(4.8),
  downloadsCount: z.number().int().nonnegative().default(0),
  clickCount: z.number().int().nonnegative().default(0),
  featured: z.boolean().default(false),
  status: z.enum(["published", "draft", "archived"]).default("published"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AppStoreShowcase = z.infer<typeof AppStoreShowcaseSchema>;

export const CreateAppShowcaseSchema = AppStoreShowcaseSchema.omit({
  id: true,
  clickCount: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAppShowcaseInput = z.infer<typeof CreateAppShowcaseSchema>;
