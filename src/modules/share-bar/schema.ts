/**
 * @file schema.ts
 * @description ShareBar 모듈 props zod 스키마 — docs/specs/share-bar.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

export const ShareBarSchema = z.object({
  channels: z.array(z.enum(["kakao", "facebook", "url"])),
});

export type ShareBarProps = z.infer<typeof ShareBarSchema>;
