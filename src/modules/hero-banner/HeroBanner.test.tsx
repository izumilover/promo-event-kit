/**
 * @file HeroBanner.test.tsx
 * @description HeroBanner 유닛 테스트 — CTA 유무 분기 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBanner } from "./HeroBanner";

const image = { pc: "/pc.jpg", mo: "/mo.jpg", alt: "가을 특가" };

describe("HeroBanner", () => {
  it("title과 CTA를 렌더링한다", () => {
    render(
      <HeroBanner
        title="가을 특가전"
        image={image}
        cta={{ label: "보러가기", href: "/exhibitions/sample" }}
      />,
    );
    expect(screen.getByRole("heading", { name: "가을 특가전" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "보러가기" })).toHaveAttribute(
      "href",
      "/exhibitions/sample",
    );
  });

  it("cta가 없으면 버튼을 렌더링하지 않는다", () => {
    render(<HeroBanner title="쿠폰만" image={image} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
