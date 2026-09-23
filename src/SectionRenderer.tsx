/**
 * @file SectionRenderer.tsx
 * @description 기획전 JSON의 sections[]를 순서대로 registry에서 조회해 렌더링한다.
 *   알 수 없는 type이나 props 검증 실패는 페이지 전체를 깨지 않고 해당 섹션만 건너뛴다
 *   (CLAUDE.md 설계 원칙 — 페이지 전체가 깨지면 안 됨).
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { Section } from "@/components/ui/Section/Section";
import { moduleRegistry } from "@/registry";
import type { SectionEnvelope } from "@/lib/exhibition-schema";

export type SectionRendererProps = {
  sections: SectionEnvelope[];
};

/** period.start/end(ISO 날짜 문자열) 안에 오늘(서버 요청 시각)이 포함되는지 확인한다 */
function isWithinPeriod(period: SectionEnvelope["period"]): boolean {
  if (!period) return true;
  const now = Date.now();
  return now >= new Date(period.start).getTime() && now <= new Date(period.end).getTime();
}

/** 개발 모드에서만 콘솔 경고를 남긴다 — 프로덕션 로그를 어지럽히지 않는다 */
function devWarn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[SectionRenderer] ${message}`);
  }
}

/** sections[] 배열을 받아 registry 조회 → props 검증 → 렌더링까지 한 번에 처리한다 */
export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        if (section.visible === false) return null;
        if (!isWithinPeriod(section.period)) return null;

        const entry = moduleRegistry[section.type];
        if (!entry) {
          devWarn(`알 수 없는 type "${section.type}" (id: ${section.id}) — 섹션을 건너뜁니다.`);
          return null;
        }

        const parsed = entry.schema.safeParse(section.props);
        if (!parsed.success) {
          devWarn(
            `"${section.type}"(id: ${section.id}) props 검증 실패 — 섹션을 건너뜁니다.\n${parsed.error.message}`,
          );
          return null;
        }

        const Component = entry.component;
        return (
          <Section key={section.id} id={section.id}>
            <Component {...parsed.data} />
          </Section>
        );
      })}
    </>
  );
}
