/**
 * @file CountdownTimer.test.tsx
 * @description CountdownTimer 유닛 테스트 — 카운트다운 표시, 종료 상태, 1초 경과 갱신 검증
 * @author kamiz
 * @created 2026-09-24
 * @modified 2026-09-24
 */
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CountdownTimer } from "./CountdownTimer";

describe("CountdownTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("남은 시간을 HH:MM:SS로 표시한다", () => {
    const endAt = new Date("2026-01-01T01:00:05Z").toISOString();
    render(<CountdownTimer endAt={endAt} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByText("01:00:05")).toBeInTheDocument();
  });

  it("이미 지난 시각이면 종료 문구를 보여준다", () => {
    const endAt = new Date("2025-12-31T00:00:00Z").toISOString();
    render(<CountdownTimer endAt={endAt} endedLabel="종료된 이벤트입니다" />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByText("종료된 이벤트입니다")).toBeInTheDocument();
  });

  it("1초가 지나면 남은 시간이 줄어든다", () => {
    const endAt = new Date("2026-01-01T00:00:10Z").toISOString();
    render(<CountdownTimer endAt={endAt} />);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(screen.getByText("00:00:10")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("00:00:09")).toBeInTheDocument();
  });
});
