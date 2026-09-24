/**
 * @file schema.ts
 * @description NoticeAccordion 모듈 props zod 스키마 — docs/specs/notice-accordion.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

export const NoticeAccordionSchema = z.object({
  items: z.array(z.string().min(1)),
  defaultOpen: z.boolean().optional(),
});

export type NoticeAccordionProps = z.infer<typeof NoticeAccordionSchema>;
