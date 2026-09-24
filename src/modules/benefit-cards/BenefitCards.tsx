/**
 * @file BenefitCards.tsx
 * @description 혜택 카드 그리드(정적) — 스펙: docs/specs/benefit-cards.md
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { CSSProperties } from "react";
import { resolveIcon } from "./icons";
import type { BenefitCardsProps } from "./schema";
import styles from "./BenefitCards.module.css";

/** items가 3개 이상이면 4열, 1~2개면 2열로 자동 배치한다 */
export function BenefitCards({ items }: BenefitCardsProps) {
  if (items.length === 0) return null;

  const columns = items.length >= 3 ? 4 : 2;
  const gridStyle = { "--columns": columns } as CSSProperties;

  return (
    <div className={styles.grid} style={gridStyle}>
      {items.map((item) => (
        <div className={styles.card} key={item.title}>
          <span className={styles.icon} aria-hidden="true">
            {resolveIcon(item.icon)}
          </span>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
