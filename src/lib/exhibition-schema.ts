/**
 * @file exhibition-schema.ts
 * @description 기획전 JSON의 "봉투(envelope)" 스키마 — 섹션 개별 props는 각 모듈의
 *   schema.ts가 검증하고, 여기서는 모든 기획전/섹션이 공통으로 갖는 형태만 검증한다.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { z } from "zod";

/** 모든 섹션이 공통으로 갖는 필드 — props의 실제 내용은 SectionRenderer가 registry로 검증한다 */
export const SectionEnvelopeSchema = z.object({
  type: z.string(),
  id: z.string(),
  props: z.unknown(),
  /** 노출 여부 — false면 period와 무관하게 항상 숨김. 기본 true */
  visible: z.boolean().optional(),
  /** 노출 기간 — 없으면 상시 노출 */
  period: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
  /** 로그 키 */
  tracking: z.string().optional(),
});

export type SectionEnvelope = z.infer<typeof SectionEnvelopeSchema>;

/** 기획전 JSON 파일(data/exhibitions/*.json) 전체 구조 */
export const ExhibitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  period: z.object({
    start: z.string(),
    end: z.string(),
  }),
  theme: z
    .object({
      accent: z.string().optional(),
    })
    .optional(),
  sections: z.array(SectionEnvelopeSchema),
});

export type Exhibition = z.infer<typeof ExhibitionSchema>;
