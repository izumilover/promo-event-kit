/**
 * @file Section.tsx
 * @description 모듈 공통 래퍼 — 상하 여백/배경/앵커 id를 담당한다(모듈 내부 여백 금지 원칙의 짝)
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import type { ReactNode } from "react";
import styles from "./Section.module.css";

export type SectionProps = {
  /** 앵커 이동(AnchorTabs)에 쓰이는 id */
  id: string;
  background?: "none" | "subtle";
  children: ReactNode;
};

/**
 * 모듈 간 간격·배경을 전담하는 래퍼. 모듈 컴포넌트 내부에는 바깥 여백을 넣지 않는다 —
 * 이 컴포넌트가 유일하게 상하 여백/배경을 결정한다.
 */
export function Section({ id, background = "none", children }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${styles[background]}`}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
