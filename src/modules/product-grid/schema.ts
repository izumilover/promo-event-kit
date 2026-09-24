/**
 * @file schema.ts
 * @description ProductGrid 모듈 props zod 스키마 — docs/specs/product-grid.md 기준
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number(),
  originalPrice: z.number().optional(),
  image: z.object({
    src: z.string(),
    alt: z.string().min(1),
  }),
  href: z.string().optional(),
});

export const ProductGridSchema = z.object({
  products: z.array(ProductSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  showPrice: z.boolean().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductGridProps = z.infer<typeof ProductGridSchema>;
