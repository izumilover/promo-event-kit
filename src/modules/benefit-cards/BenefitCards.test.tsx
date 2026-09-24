/**
 * @file BenefitCards.test.tsx
 * @description BenefitCards 유닛 테스트 — 렌더링, 빈 데이터, 알 수 없는 아이콘 폴백 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BenefitCards } from "./BenefitCards";

describe("BenefitCards", () => {
  it("혜택 카드를 제목/설명과 함께 렌더링한다", () => {
    render(
      <BenefitCards
        items={[{ icon: "gift", title: "사은품", description: "10만원 이상 구매 시 증정" }]}
      />,
    );
    expect(screen.getByText("사은품")).toBeInTheDocument();
    expect(screen.getByText("10만원 이상 구매 시 증정")).toBeInTheDocument();
  });

  it("items가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<BenefitCards items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("알 수 없는 아이콘 키는 개발 모드 경고와 함께 폴백 아이콘을 쓴다", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<BenefitCards items={[{ icon: "unknown-icon", title: "혜택", description: "설명" }]} />);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("unknown-icon"));
    warnSpy.mockRestore();
  });
});
