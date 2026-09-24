/**
 * @file AnchorTabs.tsx
 * @description 섹션 이동 탭 — 스펙: docs/specs/anchor-tabs.md.
 *   IntersectionObserver로 스크롤 위치에 따라 현재 탭을 하이라이트하고, 클릭 시 해당
 *   섹션으로 스크롤한다. 상호작용이 있어 클라이언트 컴포넌트로 구현한다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { AnchorTabsProps } from "./schema";
import styles from "./AnchorTabs.module.css";

export function AnchorTabs({ items, sticky = true }: AnchorTabsProps) {
  const [active, setActive] = useState(items[0]?.target);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.target))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // 뷰포트 상단 20%~하단 70% 사이에 걸리는 섹션을 "현재 보고 있는" 섹션으로 간주한다
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  /** target id를 가진 섹션이 실제로 없으면(검증 실패로 건너뛴 경우 등) 아무것도 하지 않는다 */
  function handleClick(target: string) {
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    setActive(target);
  }

  if (items.length === 0) return null;

  return (
    <div className={`${styles.tabs} ${sticky ? styles.sticky : ""}`} role="tablist">
      {items.map((item) => (
        <button
          key={item.target}
          type="button"
          role="tab"
          aria-selected={active === item.target}
          className={`${styles.tab} ${active === item.target ? styles.active : ""}`}
          onClick={() => handleClick(item.target)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
