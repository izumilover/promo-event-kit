/**
 * @file schema.ts
 * @description BenefitCards 모듈 props zod 스키마 — docs/specs/benefit-cards.md 기준
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { z } from "zod";

const BenefitCardSchema = z.object({
  icon: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const BenefitCardsSchema = z.object({
  items: z.array(BenefitCardSchema),
});

export type BenefitCardsProps = z.infer<typeof BenefitCardsSchema>;
export type BenefitCard = z.infer<typeof BenefitCardSchema>;
