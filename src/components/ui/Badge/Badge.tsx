/**
 * @file Badge.tsx
 * @description 작은 라벨 칩(예: "마감임박", "최대 30%") — 기획전/이벤트 모듈 전반에서 재사용
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type Variant = "default" | "accent" | "danger";

export type BadgeProps = {
  variant?: Variant;
  children: ReactNode;
};

/** variant에 맞는 색상으로 라벨 칩을 렌더링한다 */
export function Badge({ variant = "default", children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
