/**
 * @file ResponsiveImage.tsx
 * @description PC/모바일용 이미지를 다르게 보여주는 art-direction 이미지 컴포넌트
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import styles from "./ResponsiveImage.module.css";

export type ResponsiveImageProps = {
  /** 데스크톱(min-width: --bp-md 이상)에서 쓰는 이미지 */
  pc: string;
  /** 모바일(기본값, --bp-md 미만)에서 쓰는 이미지 */
  mo: string;
  alt: string;
  priority?: boolean;
};

/**
 * next/image는 art-direction(해상도에 따라 완전히 다른 이미지를 보여주는 것)을 지원하지 않아
 * 순수 <picture> + <img>로 구현한다. 브레이크포인트는 src/styles/tokens.css의 --bp-md와
 * 반드시 같은 값을 유지한다(CSS 변수를 미디어쿼리 조건에는 못 쓰기 때문에 숫자를 중복 관리).
 */
export function ResponsiveImage({ pc, mo, alt, priority = false }: ResponsiveImageProps) {
  return (
    <picture className={styles.picture}>
      <source media="(min-width: 768px)" srcSet={pc} />
      <img
        src={mo}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={styles.img}
      />
    </picture>
  );
}
