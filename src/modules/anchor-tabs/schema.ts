/**
 * @file schema.ts
 * @description AnchorTabs 모듈 props zod 스키마 — docs/specs/anchor-tabs.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

const AnchorTabItemSchema = z.object({
  label: z.string().min(1),
  target: z.string().min(1),
});

export const AnchorTabsSchema = z.object({
  items: z.array(AnchorTabItemSchema),
  sticky: z.boolean().optional(),
});

export type AnchorTabsProps = z.infer<typeof AnchorTabsSchema>;
export type AnchorTabItem = z.infer<typeof AnchorTabItemSchema>;
