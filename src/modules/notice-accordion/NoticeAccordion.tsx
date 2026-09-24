/**
 * @file NoticeAccordion.tsx
 * @description 유의사항 아코디언 — 스펙: docs/specs/notice-accordion.md.
 *   펼침/접힘 토글 상태가 있어 클라이언트 컴포넌트로 구현한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useId, useState } from "react";
import type { NoticeAccordionProps } from "./schema";
import styles from "./NoticeAccordion.module.css";

export function NoticeAccordion({ items, defaultOpen = false }: NoticeAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  if (items.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((o) => !o)}
      >
        유의사항
        <span className={styles.chevron} data-open={open} aria-hidden="true">
          ⌄
        </span>
      </button>
      <ul id={contentId} className={styles.content} hidden={!open}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
