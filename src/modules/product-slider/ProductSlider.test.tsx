/**
 * @file ProductSlider.test.tsx
 * @description ProductSlider 유닛 테스트 — 렌더링, 빈 데이터, 이전/다음 버튼 존재 검증
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductSlider } from "./ProductSlider";

const image = { src: "/p.jpg", alt: "상품" };

describe("ProductSlider", () => {
  it("상품 목록과 이전/다음 버튼을 렌더링한다", () => {
    render(
      <ProductSlider
        products={[
          { id: "p1", name: "이어폰", price: 89000, image },
          { id: "p2", name: "스피커", price: 39000, image },
        ]}
      />,
    );
    expect(screen.getByText("이어폰")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이전 상품" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음 상품" })).toBeInTheDocument();
  });

  it("products가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ProductSlider products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
