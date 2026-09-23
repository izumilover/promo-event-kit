/**
 * @file Button.test.tsx
 * @description Button 컴포넌트 유닛 테스트 — 버튼/링크 렌더링, disabled 처리 검증
 * @author kamiz
 * @created 2026-09-23
 * @modified 2026-09-23
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("children을 button으로 렌더링한다", () => {
    render(<Button>구매하기</Button>);
    expect(screen.getByRole("button", { name: "구매하기" })).toBeInTheDocument();
  });

  it("href가 있으면 링크(a)로 렌더링한다", () => {
    render(<Button href="/exhibitions/sample">기획전 보기</Button>);
    const link = screen.getByRole("link", { name: "기획전 보기" });
    expect(link).toHaveAttribute("href", "/exhibitions/sample");
  });

  it("disabled면 클릭 핸들러가 호출되지 않는다", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        품절
      </Button>,
    );
    const button = screen.getByRole("button", { name: "품절" });
    expect(button).toBeDisabled();
  });
});
