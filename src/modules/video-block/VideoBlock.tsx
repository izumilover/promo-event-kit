/**
 * @file VideoBlock.tsx
 * @description 반응형 16:9 영상 임베드 — 스펙: docs/specs/video-block.md.
 *   상호작용이 없는 정적 iframe이라 서버 컴포넌트로 구현한다.
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import type { VideoBlockProps } from "./schema";
import styles from "./VideoBlock.module.css";

export function VideoBlock({ embedUrl, title }: VideoBlockProps) {
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
