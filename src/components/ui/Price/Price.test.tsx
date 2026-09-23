/**
 * @file Price.test.tsx
 * @description Price 컴포넌트 유닛 테스트 — 할인율 계산 로직 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Price } from "./Price";

describe("Price", () => {
  it("정가 없이 판매가만 표시한다", () => {
    render(<Price value={129000} />);
    expect(screen.getByText("129,000원")).toBeInTheDocument();
  });

  it("정가가 있으면 할인율과 취소선 정가를 함께 표시한다", () => {
    render(<Price value={89000} originalValue={129000} />);
    expect(screen.getByText("89,000원")).toBeInTheDocument();
    expect(screen.getByText("129,000원")).toBeInTheDocument();
    expect(screen.getByText("31%")).toBeInTheDocument();
  });

  it("정가가 판매가보다 낮거나 같으면 할인율을 표시하지 않는다", () => {
    render(<Price value={129000} originalValue={100000} />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
