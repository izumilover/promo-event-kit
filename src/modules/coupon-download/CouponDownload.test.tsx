/**
 * @file CouponDownload.test.tsx
 * @description CouponDownload 유닛 테스트 — 발급 성공/에러 상태 전환 검증(fetch mock)
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CouponDownload } from "./CouponDownload";

describe("CouponDownload", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("발급 성공 시 버튼이 '발급 완료'로 바뀌고 비활성화된다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ status: "claimed" }) }),
    );

    const user = userEvent.setup();
    render(<CouponDownload coupons={[{ id: "c1", amount: 10000 }]} />);
    await user.click(screen.getByRole("button", { name: "다운로드" }));

    const claimedButton = await screen.findByRole("button", { name: "발급 완료" });
    expect(claimedButton).toBeDisabled();
  });

  it("네트워크 오류면 에러 문구를 보여주고 재시도할 수 있다(버튼 활성 유지)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const user = userEvent.setup();
    render(<CouponDownload coupons={[{ id: "c1", amount: 10000 }]} />);
    await user.click(screen.getByRole("button", { name: "다운로드" }));

    expect(await screen.findByText("잠시 후 다시 시도해주세요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다운로드" })).toBeEnabled();
  });

  it("coupons가 빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<CouponDownload coupons={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
