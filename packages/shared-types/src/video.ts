import { z } from "zod";

export const VideoPlatformSchema = z.enum(["youtube", "tiktok", "facebook"]);
export type VideoPlatform = z.infer<typeof VideoPlatformSchema>;

export const VideoCategorySchema = z.enum([
  "gaming",
  "funny",
  "music",
  "review",
  "tutorial",
  "general",
]);
export type VideoCategory = z.infer<typeof VideoCategorySchema>;

export const SocialVideoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Tiêu đề video không được để trống"),
  description: z.string().optional().default(""),
  platform: VideoPlatformSchema,
  url: z.string().url("URL video không hợp lệ"),
  embedUrl: z.string(),
  thumbnailUrl: z.string().url("URL thumbnail không hợp lệ"),
  authorName: z.string().optional().default("PlayNest Studio"),
  viewsCount: z.number().int().nonnegative().default(0),
  likesCount: z.number().int().nonnegative().default(0),
  category: VideoCategorySchema.default("gaming"),
  featured: z.boolean().default(false),
  status: z.enum(["active", "draft", "hidden"]).default("active"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SocialVideo = z.infer<typeof SocialVideoSchema>;

export const CreateSocialVideoSchema = SocialVideoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateSocialVideoInput = z.infer<typeof CreateSocialVideoSchema>;
