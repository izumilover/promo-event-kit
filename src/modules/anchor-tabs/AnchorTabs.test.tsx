/**
 * @file AnchorTabs.test.tsx
 * @description AnchorTabs 유닛 테스트 — 렌더링, 클릭 시 scrollIntoView 호출, 대상 없는
 *   target 클릭 시 무동작 검증. 실제 스크롤 위치 기반 하이라이트는 jsdom 한계로 e2e가 담당.
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AnchorTabs } from "./AnchorTabs";

const items = [
  { label: "쿠폰", target: "coupon" },
  { label: "상품", target: "products" },
];

describe("AnchorTabs", () => {
  it("탭을 role=tab으로 렌더링한다", () => {
    render(<AnchorTabs items={items} />);
    expect(screen.getByRole("tab", { name: "쿠폰" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "상품" })).toBeInTheDocument();
  });

  it("대상 섹션이 있으면 클릭 시 scrollIntoView를 호출한다", async () => {
    const section = document.createElement("div");
    section.id = "coupon";
    document.body.appendChild(section);
    const scrollIntoView = vi.fn();
    section.scrollIntoView = scrollIntoView;

    const user = userEvent.setup();
    render(<AnchorTabs items={items} />);
    await user.click(screen.getByRole("tab", { name: "쿠폰" }));

    expect(scrollIntoView).toHaveBeenCalled();
    document.body.removeChild(section);
  });

  it("대상 섹션이 없으면 클릭해도 에러 없이 무동작한다", async () => {
    const user = userEvent.setup();
    render(<AnchorTabs items={items} />);
    await expect(user.click(screen.getByRole("tab", { name: "상품" }))).resolves.not.toThrow();
  });

  it("items가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<AnchorTabs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
