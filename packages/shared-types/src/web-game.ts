import { z } from "zod";

export const GameOrientationSchema = z.enum(["portrait", "landscape", "any"]);
export type GameOrientation = z.infer<typeof GameOrientationSchema>;

export const GameEngineTypeSchema = z.enum([
  "phaser",
  "canvas",
  "html5",
  "threejs",
  "custom",
]);
export type GameEngineType = z.infer<typeof GameEngineTypeSchema>;

export const WebGameSchema = z.object({
  id: z.string(),
  slug: z.string().min(1, "Slug game không được để trống"),
  title: z.string().min(1, "Tên game không được để trống"),
  description: z.string().optional().default(""),
  thumbnailUrl: z.string().url("URL Thumbnail không hợp lệ"),
  bannerUrl: z.string().url("URL Banner không hợp lệ").optional(),
  gameUrl: z.string().min(1, "Game URL hoặc path không được để trống"),
  orientation: GameOrientationSchema.default("portrait"),
  engine: GameEngineTypeSchema.default("phaser"),
  developer: z.string().default("PlayNest Studio"),
  version: z.string().default("1.0.0"),
  sdkVersion: z.string().default("1.0.0"),
  sdkIntegrated: z.boolean().refine((val) => val === true, {
    message: "Game bắt buộc phải tích hợp PlayNest Game SDK (@playnest/game-sdk) mới được phép submit!",
  }),
  playsCount: z.number().int().nonnegative().default(0),
  rating: z.number().min(0).max(5).default(5.0),
  featured: z.boolean().default(false),
  status: z.enum(["active", "beta", "disabled"]).default("active"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type WebGame = z.infer<typeof WebGameSchema>;

export const CreateWebGameSchema = WebGameSchema.omit({
  id: true,
  playsCount: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateWebGameInput = z.infer<typeof CreateWebGameSchema>;
