/**
 * @file rating.ts
 * @description 별점을 ★/☆ 유니코드 글리프로 표현하는 헬퍼. 아이콘 라이브러리를 새로 추가하지
 *   않기 위해(CLAUDE.md "새 라이브러리 임의 추가 금지") benefit-cards/icons.ts와 동일한
 *   유니코드 글리프 패턴을 따른다. 시각 글리프는 장식이고, 실제 정보는 컴포넌트에서
 *   aria-label로 별도 제공한다.
 * @author kamiz
 * @created 2026-10-01
 * @modified 2026-10-01
 */

const FULL_STAR = "★";
const EMPTY_STAR = "☆";

/** rating(1~5)을 채움/빈 별 5개로 이루어진 문자열로 변환한다 */
export function renderStarGlyphs(rating: number): string {
  return Array.from({ length: 5 }, (_, i) => (i < rating ? FULL_STAR : EMPTY_STAR)).join("");
}
