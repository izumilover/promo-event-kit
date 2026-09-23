/**
 * @file ResponsiveImage.test.tsx
 * @description ResponsiveImage 컴포넌트 유닛 테스트
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResponsiveImage } from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("alt 텍스트와 함께 렌더링된다", () => {
    render(<ResponsiveImage pc="/pc.jpg" mo="/mo.jpg" alt="가을 특가" />);
    const img = screen.getByRole("img", { name: "가을 특가" });
    expect(img).toHaveAttribute("src", "/mo.jpg");
  });
});
