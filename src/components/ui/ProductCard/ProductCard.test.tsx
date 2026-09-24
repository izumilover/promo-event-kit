/**
 * @file ProductCard.test.tsx
 * @description ProductCard 유닛 테스트 — 링크 유무/가격 표시 여부 검증
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard } from "./ProductCard";

const image = { src: "/p.jpg", alt: "상품" };

describe("ProductCard", () => {
  it("href가 있으면 링크로 렌더링한다", () => {
    render(<ProductCard name="이어폰" price={89000} image={image} href="/p/1" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/p/1");
  });

  it("href가 없으면 링크를 렌더링하지 않는다", () => {
    render(<ProductCard name="이어폰" price={89000} image={image} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("showPrice가 false면 가격을 렌더링하지 않는다", () => {
    render(<ProductCard name="이어폰" price={89000} image={image} showPrice={false} />);
    expect(screen.queryByText(/89,000/)).not.toBeInTheDocument();
  });
});
