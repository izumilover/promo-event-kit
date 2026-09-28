/**
 * @file schema.ts
 * @description ImageMap 모듈 props zod 스키마 — docs/specs/image-map.md 기준
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { z } from "zod";

const ImageMapAreaSchema = z.object({
  coords: z.string().min(1),
  href: z.string().min(1),
  alt: z.string().min(1),
});

export const ImageMapSchema = z.object({
  image: z.object({
    src: z.string().min(1),
    width: z.number().positive(),
    height: z.number().positive(),
    alt: z.string(),
  }),
  areas: z.array(ImageMapAreaSchema),
});

export type ImageMapProps = z.infer<typeof ImageMapSchema>;
export type ImageMapArea = z.infer<typeof ImageMapAreaSchema>;
