/**
 * @file schema.ts
 * @description VideoBlock 모듈 props zod 스키마 — docs/specs/video-block.md 기준
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { z } from "zod";

export const VideoBlockSchema = z.object({
  embedUrl: z.string().min(1),
  title: z.string().min(1),
});

export type VideoBlockProps = z.infer<typeof VideoBlockSchema>;
