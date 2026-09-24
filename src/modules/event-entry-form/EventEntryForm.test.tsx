/**
 * @file EventEntryForm.test.tsx
 * @description EventEntryForm 유닛 테스트 — 검증 에러, 제출 성공/중복 상태 전환 검증(fetch mock)
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EventEntryForm } from "./EventEntryForm";

const props = { eventId: "e1", privacyNotice: "개인정보 수집·이용에 동의합니다." };

describe("EventEntryForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("빈 값으로 제출하면 검증 에러를 보여준다(API 호출 안 함)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<EventEntryForm {...props} />);
    await user.click(screen.getByRole("button", { name: "응모하기" }));

    expect(await screen.findByText("이름을 입력해주세요")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("정상 제출하면 성공 메시지로 폼이 교체된다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ status: "submitted" }) }),
    );

    const user = userEvent.setup();
    render(<EventEntryForm {...props} />);
    await user.type(screen.getByLabelText("이름"), "홍길동");
    await user.type(screen.getByLabelText("연락처"), "010-1234-5678");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "응모하기" }));

    expect(await screen.findByText("응모가 완료되었습니다. 감사합니다!")).toBeInTheDocument();
  });

  it("중복 응모면 안내 문구를 보여주고 폼은 유지한다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: () => Promise.resolve({ status: "duplicate" }) }),
    );

    const user = userEvent.setup();
    render(<EventEntryForm {...props} />);
    await user.type(screen.getByLabelText("이름"), "홍길동");
    await user.type(screen.getByLabelText("연락처"), "010-1234-5678");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "응모하기" }));

    expect(await screen.findByText("이미 응모하셨습니다.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "응모하기" })).toBeInTheDocument();
  });
});
