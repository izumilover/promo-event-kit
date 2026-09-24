/**
 * @file ProductCard.tsx
 * @description 상품 카드 — ProductGrid/ProductSlider가 공유하는 공통 UI.
 *   스펙: docs/specs/product-grid.md
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import Image from "next/image";
import { Price } from "@/components/ui/Price/Price";
import styles from "./ProductCard.module.css";

export type ProductCardProps = {
  name: string;
  price: number;
  originalPrice?: number;
  image: { src: string; alt: string };
  href?: string;
  /** false면 가격 영역 자체를 렌더링하지 않는다 */
  showPrice?: boolean;
};

/** href가 있으면 카드 전체를 링크로, 없으면 정적 카드로 렌더링한다 */
export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  href,
  showPrice = true,
}: ProductCardProps) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={styles.image}
          sizes="(min-width: 768px) 25vw, 50vw"
        />
      </div>
      <p className={styles.name}>{name}</p>
      {showPrice && <Price value={price} originalValue={originalPrice} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={styles.card}>
        {content}
      </a>
    );
  }

  return <div className={styles.card}>{content}</div>;
}
