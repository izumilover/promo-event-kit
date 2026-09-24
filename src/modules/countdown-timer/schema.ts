/**
 * @file schema.ts
 * @description CountdownTimer 모듈 props zod 스키마 — docs/specs/countdown-timer.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

export const CountdownTimerSchema = z.object({
  endAt: z.string(),
  endedLabel: z.string().optional(),
});

export type CountdownTimerProps = z.infer<typeof CountdownTimerSchema>;
