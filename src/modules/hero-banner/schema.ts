/**
 * @file schema.ts
 * @description HeroBanner 모듈 props zod 스키마 — docs/specs/hero-banner.md 기준
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { z } from "zod";

export const HeroBannerSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  periodLabel: z.string().optional(),
  image: z.object({
    pc: z.string(),
    mo: z.string(),
    alt: z.string().min(1),
  }),
  cta: z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
    })
    .optional(),
});

export type HeroBannerProps = z.infer<typeof HeroBannerSchema>;
