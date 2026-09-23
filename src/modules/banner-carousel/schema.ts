/**
 * @file schema.ts
 * @description BannerCarousel 모듈 props zod 스키마 — docs/specs/banner-carousel.md 기준
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { z } from "zod";

const BannerCarouselSlideSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  periodLabel: z.string().optional(),
  badge: z.string().optional(),
  href: z.string().optional(),
  image: z.object({
    pc: z.string(),
    mo: z.string(),
    alt: z.string().min(1),
  }),
});

export const BannerCarouselSchema = z.object({
  slides: z.array(BannerCarouselSlideSchema).min(1),
  /** 자동재생 간격(ms). 최소 2000ms — 너무 빠른 전환은 접근성상 권장되지 않는다 */
  autoplayInterval: z.number().min(2000).optional(),
});

export type BannerCarouselProps = z.infer<typeof BannerCarouselSchema>;
export type BannerCarouselSlide = z.infer<typeof BannerCarouselSlideSchema>;
