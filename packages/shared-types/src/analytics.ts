import { z } from "zod";

export const SystemStatsSchema = z.object({
  totalVideos: z.number().int().nonnegative(),
  totalApps: z.number().int().nonnegative(),
  totalGames: z.number().int().nonnegative(),
  totalGamePlays: z.number().int().nonnegative(),
  totalVideoViews: z.number().int().nonnegative(),
  totalAppClicks: z.number().int().nonnegative(),
  contactEmail: z.string().email().default("contact@playnest.zone"),
  updatedAt: z.string(),
});

export type SystemStats = z.infer<typeof SystemStatsSchema>;

export const TelemetryEventSchema = z.object({
  type: z.enum([
    "video_view",
    "app_click",
    "game_play_start",
    "game_play_complete",
    "sdk_score_submit",
  ]),
  targetId: z.string(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string(),
});

export type TelemetryEvent = z.infer<typeof TelemetryEventSchema>;
