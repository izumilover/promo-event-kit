/**
 * @file schema.ts
 * @description RichText 모듈 props zod 스키마 — docs/specs/rich-text.md 기준.
 *   원시 HTML이 아니라 제한된 블록 타입만 받는다(설계 결정은 스펙 문서 참고).
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { z } from "zod";

const RichTextBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({
    type: z.literal("heading"),
    text: z.string().min(1),
    level: z.union([z.literal(2), z.literal(3)]).optional(),
  }),
  z.object({ type: z.literal("list"), items: z.array(z.string().min(1)) }),
]);

export const RichTextSchema = z.object({
  blocks: z.array(RichTextBlockSchema),
});

export type RichTextProps = z.infer<typeof RichTextSchema>;
export type RichTextBlock = z.infer<typeof RichTextBlockSchema>;
