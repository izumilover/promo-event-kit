/**
 * @file schema.ts
 * @description EventEntryForm 모듈 props zod 스키마 — docs/specs/event-entry-form.md 기준.
 *   여기 스키마는 "섹션 설정값" 검증용이고, 실제 폼 입력(이름/연락처) 검증 스키마는
 *   EventEntryForm.tsx 안에 별도로 둔다 — 서로 다른 관심사라 섞지 않는다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { z } from "zod";

export const EventEntryFormSchema = z.object({
  eventId: z.string().min(1),
  privacyNotice: z.string().min(1),
});

export type EventEntryFormProps = z.infer<typeof EventEntryFormSchema>;
