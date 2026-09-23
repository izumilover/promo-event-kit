/**
 * @file registry.ts
 * @description 모듈 레지스트리 — JSON section의 `type` 문자열을 실제 컴포넌트 + props 검증
 *   스키마에 연결한다. 새 모듈을 추가할 때 이 파일에 한 줄 등록하는 것으로 SectionRenderer가
 *   그 모듈을 바로 렌더링할 수 있게 된다(CLAUDE.md "모듈 추가 절차" 6단계).
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { ComponentType } from "react";
import type { ZodType } from "zod";

export type ModuleRegistryEntry<TProps = unknown> = {
  component: ComponentType<TProps>;
  schema: ZodType<TProps>;
};

/**
 * type → { component, schema } 매핑. B/C/D 브랜치가 각자 담당 모듈을 여기 등록한다.
 * 아직 등록된 모듈이 없다 — foundation 단계에서는 빈 레지스트리로 파이프라인만 검증한다.
 *
 * 모듈마다 props 타입이 다르므로(HeroBannerProps, ProductGridProps, ...) 한 레코드 안에
 * 여러 구체 타입을 담아야 한다 — TypeScript로는 표현할 방법이 없어 여기서만 any를 허용한다.
 * 실제 타입 안전성은 등록 시점(각 모듈의 schema.ts)과 SectionRenderer의 zod 런타임 검증이 보장한다.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 위 주석 참고, 이 파일에서만 허용
export const moduleRegistry: Record<string, ModuleRegistryEntry<any>> = {};
