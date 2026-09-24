/**
 * @file ProductSlider.tsx
 * @description 상품 가로 스크롤 슬라이더 — 스펙: docs/specs/product-grid.md.
 *   네이티브 스크롤(overflow-x + scroll-snap)로 구현해 키보드/터치 조작이 기본으로 된다.
 *   이전/다음 버튼은 마우스 사용자 편의용이라 클라이언트 컴포넌트가 필요하다.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type { ProductSliderProps } from "./schema";
import styles from "./ProductSlider.module.css";

const CARD_SCROLL_WIDTH = 200;

export function ProductSlider({ products, showPrice = true }: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  if (products.length === 0) return null;

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
        {products.map((product) => (
          <div className={styles.item} key={product.id}>
            <ProductCard
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              href={product.href}
              showPrice={showPrice}
            />
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => scrollBy(-1)} aria-label="이전 상품">
          ‹
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="다음 상품">
          ›
        </button>
      </div>
    </div>
  );
}
