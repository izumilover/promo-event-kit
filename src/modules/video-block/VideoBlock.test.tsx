/**
 * @file VideoBlock.test.tsx
 * @description VideoBlock 유닛 테스트 — iframe title/src 렌더링 검증
 * @author kamiz
 * @created 2026-09-28
 * @modified 2026-09-28
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoBlock } from "./VideoBlock";

describe("VideoBlock", () => {
  it("title과 src를 가진 iframe을 렌더링한다", () => {
    render(<VideoBlock embedUrl="https://www.youtube.com/embed/abc123" title="제품 소개 영상" />);
    const iframe = screen.getByTitle("제품 소개 영상");
    expect(iframe.tagName).toBe("IFRAME");
    expect(iframe).toHaveAttribute("src", "https://www.youtube.com/embed/abc123");
  });
});
