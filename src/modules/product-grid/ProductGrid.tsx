/**
 * @file ProductGrid.tsx
 * @description 상품 그리드 모듈(정적) — 스펙: docs/specs/product-grid.md
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import type { CSSProperties } from "react";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import type { ProductGridProps } from "./schema";
import styles from "./ProductGrid.module.css";

/** 768px 미만은 2열 고정, 이상은 columns(기본 4) */
export function ProductGrid({ products, columns = 4, showPrice = true }: ProductGridProps) {
  if (products.length === 0) return null;

  const gridStyle = { "--pg-columns": columns } as CSSProperties;

  return (
    <div className={styles.grid} style={gridStyle}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image}
          href={product.href}
          showPrice={showPrice}
        />
      ))}
    </div>
  );
}
