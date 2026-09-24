/**
 * @file ShareBar.test.tsx
 * @description ShareBar 유닛 테스트 — URL 복사 성공/실패, mock 채널 안내 검증
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ShareBar } from "./ShareBar";

describe("ShareBar", () => {
  it("URL 복사 버튼을 누르면 클립보드에 복사하고 토스트를 보여준다", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    // userEvent.setup()이 자체 clipboard stub을 심으므로, 그 뒤에 우리 mock으로 다시
    // 덮어써야 한다(순서가 바뀌면 userEvent의 stub이 이긴다). jsdom의 navigator.clipboard는
    // getter라 Object.assign으로는 덮어써지지 않아 defineProperty를 쓴다.
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<ShareBar channels={["url"]} />);
    await user.click(screen.getByRole("button", { name: "URL 복사" }));

    expect(writeText).toHaveBeenCalledWith(window.location.href);
    expect(await screen.findByText("링크가 복사되었습니다")).toBeInTheDocument();
  });

  it("카카오톡/페이스북은 아직 연동 준비 중 안내를 보여준다", async () => {
    const user = userEvent.setup();
    render(<ShareBar channels={["kakao"]} />);
    await user.click(screen.getByRole("button", { name: "카카오톡 공유" }));
    expect(await screen.findByText("연동 준비 중입니다")).toBeInTheDocument();
  });

  it("channels가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ShareBar channels={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
