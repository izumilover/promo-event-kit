/**
 * @file ImageMap.tsx
 * @description 클릭 가능한 핫스팟이 있는 이미지 — 스펙: docs/specs/image-map.md.
 *   네이티브 <map>/<area>를 쓰므로 JS 없이 서버 컴포넌트로 구현 가능하다.
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { useId } from "react";
import type { ImageMapProps } from "./schema";
import styles from "./ImageMap.module.css";

export function ImageMap({ image, areas }: ImageMapProps) {
  // 페이지에 ImageMap이 여러 개 있어도 <map name="..">이 서로 안 겹치게 인스턴스별 고유 id를 쓴다
  const mapName = `image-map-${useId()}`;

  return (
    <div className={styles.wrapper}>
      {/* next/image는 usemap을 공식 지원하지 않고, 이 모듈은 원본 픽셀 좌표가 정확해야
          하므로(스펙의 width/height 설명 참고) 순수 <img>를 쓴다. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- 위 주석 참고 */}
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={areas.length > 0 ? "" : image.alt}
        useMap={`#${mapName}`}
        className={styles.image}
      />
      <map name={mapName}>
        {areas.map((area) => (
          <area
            key={area.coords}
            shape="rect"
            coords={area.coords}
            href={area.href}
            alt={area.alt}
          />
        ))}
      </map>
    </div>
  );
}
