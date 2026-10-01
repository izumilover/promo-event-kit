/**
 * @file schema.ts
 * @description ReviewCarousel 모듈 props zod 스키마 — docs/specs/review-carousel.md 기준
 * @author kamiz
 * @created 2026-10-01
 * @modified 2026-10-01
 */
import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.string(),
  authorName: z.string().min(1),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  content: z.string().min(1),
  /** 포토리뷰 — 없으면 텍스트 전용 카드로 렌더링. 장식용이 아니라 실제 콘텐츠라 alt는 필수 */
  photo: z
    .object({
      src: z.string(),
      alt: z.string().min(1),
    })
    .optional(),
  /** ISO 날짜 문자열(YYYY-MM-DD) */
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export const ReviewCarouselSchema = z.object({
  reviews: z.array(ReviewSchema),
});

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewCarouselProps = z.infer<typeof ReviewCarouselSchema>;
