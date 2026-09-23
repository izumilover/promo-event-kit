/**
 * @file HeroBanner.tsx
 * @description 기획전 최상단 히어로 배너 — 스펙: docs/specs/hero-banner.md
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { ResponsiveImage } from "@/components/ui/ResponsiveImage/ResponsiveImage";
import { Button } from "@/components/ui/Button/Button";
import type { HeroBannerProps } from "./schema";
import styles from "./HeroBanner.module.css";

/** 상호작용이 없는 정적 배너라 서버 컴포넌트로 구현한다 */
export function HeroBanner({ title, subtitle, periodLabel, image, cta }: HeroBannerProps) {
  return (
    <div className={styles.hero}>
      <ResponsiveImage pc={image.pc} mo={image.mo} alt={image.alt} priority />
      <div className={styles.overlay}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {periodLabel && <p className={styles.period}>{periodLabel}</p>}
        {cta && (
          <Button href={cta.href} variant="primary" size="lg">
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
