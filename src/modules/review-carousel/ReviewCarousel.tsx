/**
 * @file ReviewCarousel.tsx
 * @description 고객 후기(포토리뷰 포함) 가로 스크롤 캐러셀 — 스펙: docs/specs/review-carousel.md.
 *   ProductSlider와 동일하게 네이티브 스크롤(overflow-x + scroll-snap)이 조작의 본체이고,
 *   좌우 버튼은 마우스/터치 사용자를 위한 보조 컨트롤이라 클라이언트 컴포넌트가 필요하다.
 * @author kamiz
 * @created 2026-10-01
 * @modified 2026-10-01
 */
"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { renderStarGlyphs } from "./rating";
import type { ReviewCarouselProps } from "./schema";
import styles from "./ReviewCarousel.module.css";

const CARD_SCROLL_WIDTH = 280;

/** ISO 날짜 문자열(YYYY-MM-DD)을 "2026년 10월 1일" 형태로 변환한다 */
function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${year}년 ${month}월 ${day}일`;
}

export function ReviewCarousel({ reviews }: ReviewCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  if (reviews.length === 0) return null;

  /** 카드 한 장 너비만큼 좌우로 스크롤한다 */
  function scrollBy(direction: 1 | -1) {
    scrollRef.current?.scrollBy({
      left: direction * CARD_SCROLL_WIDTH,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.track} ref={scrollRef}>
        {reviews.map((review) => (
          <div className={styles.item} key={review.id}>
            {review.photo && (
              <div className={styles.photoWrap}>
                <Image
                  src={review.photo.src}
                  alt={review.photo.alt}
                  fill
                  className={styles.photo}
                  sizes="(min-width: 768px) 280px, 85vw"
                />
              </div>
            )}
            <p className={styles.author}>{review.authorName}</p>
            <p className={styles.rating} aria-label={`평점 ${review.rating}점, 5점 만점`}>
              <span aria-hidden="true">{renderStarGlyphs(review.rating)}</span>
            </p>
            <time className={styles.date} dateTime={review.createdAt}>
              {formatDate(review.createdAt)}
            </time>
            <p className={styles.content}>{review.content}</p>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => scrollBy(-1)} aria-label="이전 리뷰">
          ‹
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="다음 리뷰">
          ›
        </button>
      </div>
    </div>
  );
}
