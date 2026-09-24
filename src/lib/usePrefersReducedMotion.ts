/**
 * @file usePrefersReducedMotion.ts
 * @description OS/브라우저의 "동작 줄이기" 접근성 설정을 읽는 공용 훅.
 *   BannerCarousel(자동재생), ProductSlider/AnchorTabs(smooth scroll)가 함께 쓴다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useEffect, useState } from "react";

/** 초기값은 lazy initializer로 동기 계산 — effect 안에서 setState를 바로 호출하지 않는다 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
