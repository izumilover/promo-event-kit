/**
 * @file schema.ts
 * @description ProductSlider 모듈 props zod 스키마 — docs/specs/product-grid.md 기준
 *   (Product 타입은 product-grid와 동일 — 별도 모듈이지만 같은 데이터 모양을 쓴다)
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";
import { ProductSchema } from "@/modules/product-grid/schema";

export const ProductSliderSchema = z.object({
  products: z.array(ProductSchema),
  showPrice: z.boolean().optional(),
});

export type ProductSliderProps = z.infer<typeof ProductSliderSchema>;
