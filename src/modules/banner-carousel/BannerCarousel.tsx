/**
 * @file BannerCarousel.tsx
 * @description 자동 로테이션 배너 캐러셀 — 스펙: docs/specs/banner-carousel.md
 *   상호작용(자동재생/이전·다음/일시정지)이 있어 클라이언트 컴포넌트로 구현한다.
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-24
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage/ResponsiveImage";
import { Badge } from "@/components/ui/Badge/Badge";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { BannerCarouselProps } from "./schema";
import styles from "./BannerCarousel.module.css";

export function BannerCarousel({ slides, autoplayInterval }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const multiSlide = slides.length > 1;
  const shouldAutoplay = multiSlide && playing && !reducedMotion && !!autoplayInterval;

  useEffect(() => {
    if (!shouldAutoplay) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoplayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // index는 의도적으로 의존성에서 뺐다 — 넣으면 매 슬라이드 전환마다 타이머가 리셋돼
    // 간격이 어긋난다. setIndex는 updater 함수 형태라 index를 클로저로 참조하지 않는다.
  }, [shouldAutoplay, autoplayInterval, slides.length]);

  function goTo(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  const current = slides[index];

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription={multiSlide ? "carousel" : undefined}
    >
      <div aria-label={multiSlide ? `${index + 1}/${slides.length}` : undefined}>
        {current.badge && <Badge variant="danger">{current.badge}</Badge>}
        {current.href ? (
          <a href={current.href} className={styles.slideLink}>
            <ResponsiveImage
              pc={current.image.pc}
              mo={current.image.mo}
              alt={current.image.alt}
              priority={index === 0}
            />
          </a>
        ) : (
          <ResponsiveImage
            pc={current.image.pc}
            mo={current.image.mo}
            alt={current.image.alt}
            priority={index === 0}
          />
        )}
        <p className={styles.title}>{current.title}</p>
        {current.periodLabel && <p className={styles.period}>{current.periodLabel}</p>}
      </div>

      {multiSlide && (
        <div className={styles.controls}>
          <button type="button" onClick={() => goTo(index - 1)} aria-label="이전 슬라이드">
            ‹
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "자동재생 일시정지" : "자동재생 재개"}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="다음 슬라이드">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
