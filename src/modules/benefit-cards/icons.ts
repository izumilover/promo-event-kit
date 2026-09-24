/**
 * @file icons.ts
 * @description BenefitCards용 최소 아이콘 세트 — 별도 아이콘 라이브러리를 새로 추가하지 않고
 *   (CLAUDE.md "새 라이브러리 임의 추가 금지") 유니코드 글리프로 최소 구현한다.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */

export const BENEFIT_ICONS: Record<string, string> = {
  cardDiscount: "💳",
  gift: "🎁",
  membership: "🏷️",
  shipping: "🚚",
  point: "⭐",
};

export const FALLBACK_ICON = "✔️";

/** 등록되지 않은 아이콘 키가 오면 fallback을 반환하고, 개발 모드에서만 경고한다 */
export function resolveIcon(key: string): string {
  const icon = BENEFIT_ICONS[key];
  if (!icon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[BenefitCards] 알 수 없는 icon 키 "${key}" — fallback 아이콘을 사용합니다.`);
    }
    return FALLBACK_ICON;
  }
  return icon;
}
