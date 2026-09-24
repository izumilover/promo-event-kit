/**
 * @file NoticeAccordion.test.tsx
 * @description NoticeAccordion 유닛 테스트 — 토글 동작, aria-expanded 검증
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NoticeAccordion } from "./NoticeAccordion";

const items = ["유의사항 1", "유의사항 2"];

describe("NoticeAccordion", () => {
  it("기본값은 닫힌 상태다(aria-expanded=false, 콘텐츠 hidden)", () => {
    render(<NoticeAccordion items={items} />);
    const trigger = screen.getByRole("button", { name: /유의사항/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("유의사항 1")).not.toBeVisible();
  });

  it("클릭하면 펼쳐진다", async () => {
    const user = userEvent.setup();
    render(<NoticeAccordion items={items} />);
    await user.click(screen.getByRole("button", { name: /유의사항/ }));
    expect(screen.getByRole("button", { name: /유의사항/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("유의사항 1")).toBeVisible();
  });

  it("items가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<NoticeAccordion items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
