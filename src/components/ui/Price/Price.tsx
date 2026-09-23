/**
 * @file Price.tsx
 * @description 가격 표시 컴포넌트 — 정가가 있으면 할인율을 자동 계산하고 취소선으로 표시
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import styles from "./Price.module.css";

export type PriceProps = {
  /** 판매가 */
  value: number;
  /** 정가 (있으면 취소선 + 할인율 자동 계산) */
  originalValue?: number;
  currency?: string;
};

const formatter = new Intl.NumberFormat("ko-KR");

/** 정가 대비 할인율(%)을 계산한다. 정가가 0 이하거나 판매가보다 낮으면 0을 반환 */
function discountRate(value: number, originalValue: number) {
  if (originalValue <= 0 || value >= originalValue) return 0;
  return Math.round((1 - value / originalValue) * 100);
}

/** 판매가 + (있으면) 할인율·취소선 정가를 함께 렌더링한다 */
export function Price({ value, originalValue, currency = "원" }: PriceProps) {
  const rate = originalValue ? discountRate(value, originalValue) : 0;

  return (
    <span className={styles.price}>
      {rate > 0 && <span className={styles.rate}>{rate}%</span>}
      <span className={styles.value}>
        {formatter.format(value)}
        {currency}
      </span>
      {originalValue && originalValue > value && (
        <span className={styles.original}>
          {formatter.format(originalValue)}
          {currency}
        </span>
      )}
    </span>
  );
}
