/**
 * @file RichText.tsx
 * @description 자유 서식 텍스트 블록 — 스펙: docs/specs/rich-text.md.
 *   원시 HTML을 받지 않고 제한된 블록 타입만 안전하게 JSX로 변환한다.
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import type { RichTextBlock, RichTextProps } from "./schema";
import styles from "./RichText.module.css";

/** 블록 하나를 실제 시맨틱 엘리먼트로 변환한다 */
function renderBlock(block: RichTextBlock, index: number) {
  switch (block.type) {
    case "heading": {
      const Heading = block.level === 2 ? "h2" : "h3";
      return (
        <Heading key={index} className={styles.heading}>
          {block.text}
        </Heading>
      );
    }
    case "list":
      return (
        <ul key={index} className={styles.list}>
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    case "paragraph":
      return (
        <p key={index} className={styles.paragraph}>
          {block.text}
        </p>
      );
  }
}

export function RichText({ blocks }: RichTextProps) {
  if (blocks.length === 0) return null;

  return <div className={styles.wrapper}>{blocks.map(renderBlock)}</div>;
}
