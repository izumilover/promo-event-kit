/**
 * @file schema.ts
 * @description CouponDownload 모듈 props zod 스키마 — docs/specs/coupon-download.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

const CouponSchema = z.object({
  id: z.string(),
  amount: z.number(),
  minPrice: z.number().optional(),
  endAt: z.string().optional(),
});

export const CouponDownloadSchema = z.object({
  coupons: z.array(CouponSchema),
});

export type CouponDownloadProps = z.infer<typeof CouponDownloadSchema>;
export type Coupon = z.infer<typeof CouponSchema>;
